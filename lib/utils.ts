import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { supabase } from './supabase';
import { oldestDate } from './constants';
import { PDReport } from '@/components/ReportCard';
import { locationCoords } from './locationCoords';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export async function getReportObjs(
    startDate: Date,
    numDays: number
): Promise<PDReport[]> {
    const formatStartDate = startDate
        .toISOString()
        .split('T')[0]
        .replaceAll('-', '/');
    let endDate = new Date(startDate);
    const oldDate = new Date(oldestDate);
    endDate.setDate(endDate.getDate() - (numDays - 1));
    if (numDays != -1) {
        if (endDate < oldDate) {
            endDate = new Date(oldDate);
        }
    } else {
        endDate = new Date(oldDate);
    }

    const formatEndDate = endDate
        .toISOString()
        .split('T')[0]
        .replaceAll('-', '/');

    const { data } = await supabase
        .from('incidents')
        .select('category, location, date, time, summary, disposition, id')
        .gte('date', formatEndDate)
        .lte('date', formatStartDate);

    const CAMPUS_LAT_MIN = 32.872123;
    const CAMPUS_LAT_MAX = 32.890794;
    const CAMPUS_LNG_MIN = -117.244530;
    const CAMPUS_LNG_MAX = -117.231449;
    const CENTER_LAT = 32.880511;
    const CENTER_LNG = -117.240378;

    const filteredData = data!.map(
        ({ summary, time, date, disposition, location, category, id }) => {
            const coords = locationCoords[location ?? ''] ?? null;
            const lat = coords?.lat ?? 32.8801;
            const lng = coords?.lng ?? -117.2340;

            const onCampus: 'On Campus' | 'Off Campus' =
                lat >= CAMPUS_LAT_MIN &&
                lat <= CAMPUS_LAT_MAX &&
                lng >= CAMPUS_LNG_MIN &&
                lng <= CAMPUS_LNG_MAX ? 'On Campus' : 'Off Campus';

            const deltaLat = lat - CENTER_LAT;
            const deltaLng = lng - CENTER_LNG;
            const cardinalDirection: 'North' | 'South' | 'East' | 'West' =
                Math.abs(deltaLat) >= Math.abs(deltaLng)
                    ? deltaLat >= 0 ? 'North' : 'South'
                    : deltaLng >= 0 ? 'East' : 'West';
            const direction: 'North Side' | 'South Side' | 'East Side' | 'West Side' =
                `${cardinalDirection} Side`;

            return {
                id,
                summary: summary ?? 'None',
                disposition: disposition ?? 'None given',
                location: location ?? 'None given',
                category: category ?? 'None given',
                time: time ?? '00:00:00',
                date: date ?? '1970/01/01',
                lat,
                lng,
                onCampus,
                direction,
            };
        }
    );

    console.log(`Most Recent ${formatStartDate}`);
    return filteredData;
}

export function sortReports(
    sortState: string,
    reportArr: PDReport[]
): PDReport[] {
    type StampedReport = PDReport & {
        tStamp: number;
    };
    if (!reportArr || reportArr.length === 0) return [];

    const stampedArr = reportArr.map((reportObj) => ({
        ...reportObj,
        tStamp: new Date(
            `${reportObj.date.replace(/\//g, '-')}T${reportObj.time ?? '00:00:00'}`
        ).getTime(),
    }));
    const logicObj = {
        descending: (a: StampedReport, b: StampedReport) => b.tStamp - a.tStamp,
        ascending: (a: StampedReport, b: StampedReport) => a.tStamp - b.tStamp,
        length: (a: StampedReport, b: StampedReport) =>
            b.summary.length - a.summary.length,
    };
    stampedArr.sort(logicObj[sortState as keyof typeof logicObj]);
    return stampedArr.map(({ tStamp, ...originalObj }) => originalObj);
}

export function formatReports(reportArr: PDReport[]): PDReport[] {
    return reportArr.map((report) => ({
        ...report,
        date:
            report.date !== '1970/01/01'
                ? new Date(report.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                  })
                : 'N/A',
        time:
            report.time !== '00:00:00'
                ? new Intl.DateTimeFormat('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                  }).format(new Date(`1970-01-01T${report.time}`))
                : 'N/A',
    }));
}

export function filterReports(
    search: string,
    reportArr: PDReport[]
): PDReport[] {
    const filteredData =
        search === '' || reportArr.length == 0
            ? reportArr
            : reportArr.filter(
                  (report) =>
                      report.category
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                      report.location
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                      report.disposition
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                      report.summary
                          .toLowerCase()
                          .includes(search.toLowerCase())
              );
    return filteredData;
}

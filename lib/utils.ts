import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { supabase } from "./supabase"
import { oldestDate } from "./constants"
import { PDReport } from "@/components/ReportCard"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getReportObjs(startDate: Date, numDays: number) : Promise<PDReport[]> {
 
    const formatStartDate = startDate.toISOString().split('T')[0].replaceAll("-", "/");
    let endDate = new Date(startDate);
    const oldDate = new Date(oldestDate)
    endDate.setDate(endDate.getDate() - (numDays - 1))
    if (numDays != -1) {
        if (endDate < oldDate) {
            endDate = new Date(oldDate)
        }
    }
    else {
      endDate = new Date(oldDate)
    }
    
    const formatEndDate = endDate.toISOString().split('T')[0].replaceAll("-", "/");
  
    const { data } = await supabase
    .from('incidents')
    .select('category, location, date, time, summary, disposition')
    .gte('date', formatEndDate)
    .lte('date', formatStartDate);

    const filteredData = data!.map(({summary, time, date, disposition, location, category}) => ({
        summary: summary ?? "None", 
        disposition: disposition ?? "None given",
        location: location ?? "None given",
        category: category ?? "None given",
        time: time ?? "00:00:00", 
        date: date ?? "1970/01/01",
    }))

    console.log(`Most Recent ${formatStartDate}`)
    return filteredData
}



export function sortReports(sortState: string, reportArr: PDReport[]) : PDReport[] {
    type StampedReport = PDReport & {
        tStamp: number
    }
    if (!reportArr || reportArr.length === 0) return [];

    const stampedArr = reportArr.map((reportObj)=>(
        {
            ...reportObj,
            tStamp: new Date(`${reportObj.date.replace(/\//g, '-')}T${reportObj.time ?? '00:00:00'}`).getTime()
        }
    ))
    const logicObj = {
        descending: (a: StampedReport, b: StampedReport) => b.tStamp - a.tStamp,
        ascending: (a: StampedReport, b: StampedReport) => a.tStamp - b.tStamp,
        length: (a: StampedReport, b: StampedReport) => b.summary.length - a.summary.length
    }
    stampedArr.sort(logicObj[sortState as keyof typeof logicObj])
    return stampedArr.map(({tStamp, ...originalObj}) => (originalObj))
}

export function filterReports(search: string, reportArr: PDReport[]) : PDReport[] {
    const filteredData = (search === "" || reportArr.length == 0) ? (
        reportArr
    ) : (
        reportArr.filter((report) => 
            report.category.toLowerCase().includes(search.toLowerCase()) ||
            report.location.toLowerCase().includes(search.toLowerCase()) ||
            report.disposition.toLowerCase().includes(search.toLowerCase()) ||
            report.summary.toLowerCase().includes(search.toLowerCase())
        )
    )
    return filteredData
}

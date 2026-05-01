'use client';

import Menu from './Menu';
import ReportGrid from './ReportGrid';
import { useState, useEffect, useMemo } from 'react';
import { getReportObjs, sortReports, filterReports } from '@/lib/utils';
import { PDReport } from './ReportCard';
import { MeridianWrapper, MeridianOverview, MeridianItem, ViewOptions, FetchedAttributeValueType } from 'meridian-ui';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { odi } from '@/lib/odi';


export default function ContentArea({ rdate }: { rdate: string }) {
    const [date, setDate] = useState<Date>(new Date(rdate));
    const [seeNumDays, setSeeNumDays] = useState<number>(1);
    const [reportArr, setReportArr] = useState<PDReport[]>([]);
    const [sortState, setSortState] = useState<string>('descending');
    const [searchState, setSearchState] = useState<string>('');

    // Runs after initial load in as well as after reloads when date or days are changed
    useEffect(() => {
        async function setData() {
            const data = await getReportObjs(date, seeNumDays);
            setReportArr(data ?? []);
        }
        setData();
    }, [date, seeNumDays]);

    const filteredArr = useMemo<PDReport[]>(() => {
        return filterReports(searchState, reportArr);
    }, [searchState, reportArr]);

    const sortedArr = useMemo<PDReport[]>(() => {
        return sortReports(sortState, filteredArr);
    }, [sortState, filteredArr]);

    const numEntries = sortedArr.length;

    return (
        <div className="flex h-full w-full flex-row justify-center gap-2.5 overflow-hidden px-2.5">
            {/* Left: Menu column */}
            <div className="no-scrollbar flex max-h-300 max-w-75.75 min-w-52.25 basis-1/5 flex-col overflow-y-auto pt-5 pb-5">
                <Menu
                    dateState={date}
                    setDate={setDate}
                    setDays={setSeeNumDays}
                    rdate={rdate}
                    setSortState={setSortState}
                    numEntries={numEntries}
                    searchState={searchState}
                    setSearch={setSearchState}
                />
            </div>

            {/* Right: Report grid */}
            <div className="min-w-0 basis-4/5 overflow-y-auto pt-5 pb-5">
                {reportArr.length == 0 ? (
                    <p>Loading</p>
                ) : sortedArr.length == 0 ? (
                    <p>No reports found</p>
                ) : (

                    // <ReportGrid reportArr={sortedArr} />

                    <MeridianWrapper odi={odi} data={sortedArr}>                        
                        <MeridianOverview/>
                    </MeridianWrapper>
                        
                )}
            </div>
        </div>
    );
}

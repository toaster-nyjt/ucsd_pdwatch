'use client'

import Menu from './Menu'
import ReportGrid from './ReportGrid'
import { useState, useEffect, useMemo } from 'react'
import { getReportObjs, sortReports, filterReports } from '@/lib/utils'
import { PDReport } from './ReportCard'


export default function ContentArea({rdate} : {rdate: string}) {
    
    /* POPULATE ISLAND STATES */
    const [date, setDate] = useState<Date>(new Date(rdate)) // Sets the default date to the most recently available
    const [seeNumDays, setSeeNumDays] = useState<number>(1) 
    const [reportArr, setReportArr] = useState<PDReport[]>([])
    const [sortState, setSortState] = useState<string>("descending")
    const [searchState, setSearchState] = useState<string>("")

    // Runs after initial load in as well as after reloads when date or days are changed
    useEffect(() => {
        async function setData() {
            const data = await getReportObjs(date, seeNumDays)
            setReportArr(data ?? [])
        }
        setData()
    }, [date, seeNumDays]);
    
    const filteredArr = useMemo<PDReport[]>(()=>{
        return filterReports(searchState, reportArr)
    }, [searchState, reportArr])

    const sortedArr = useMemo<PDReport[]>(()=>{
        return sortReports(sortState, filteredArr)
    }, [sortState, filteredArr])

    const numEntries = sortedArr.length;

    return (
        <div className="flex justify-center flex-row gap-2.5 px-2.5 w-full h-full overflow-hidden">

            {/* Left: Menu column */}
            <div className="flex flex-col basis-1/5 min-w-52.25 max-w-75.75 max-h-300 overflow-y-auto pt-5 pb-5 no-scrollbar">
                <Menu dateState={date} setDate={setDate} setDays={setSeeNumDays}
                rdate={rdate} setSortState={setSortState} numEntries={numEntries} 
                searchState={searchState} setSearch={setSearchState}/>
            </div>

            {/* Right: Report grid */}
            <div className="basis-4/5 min-w-0 overflow-y-auto pt-5 pb-5">
                {
                    (reportArr.length == 0) ? (
                        <p>Loading</p>
                    ) : (sortedArr.length == 0) ? (
                        <p>No reports found</p>
                    ) : (
                        <ReportGrid reportArr={sortedArr}/>
                    )
                }
            </div>

        </div>
    )
}
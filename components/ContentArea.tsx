'use client';

import Menu from './Menu';
import ReportGrid from './ReportGrid';
import { useState, useEffect, useMemo } from 'react';
import { getReportObjs, sortReports, filterReports } from '@/lib/utils';
import { PDReport } from './ReportCard';
import { MeridianWrapper, MeridianOverview, MeridianItem, ViewOptions, FetchedAttributeValueType } from 'meridian-ui';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { odi } from '@/lib/odi';

const styledMap = {
    type: 'map',
    view: (options: ViewOptions) => {
        console.log('[styledMap] items:', options.items.length);
        console.log('[styledMap] first item internalAttributes:', JSON.stringify(options.items[0]?.internalAttributes));
        console.log('[styledMap] apiKey:', process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY);
        const coords = options.items.map(item => {
            const latAttr = item.internalAttributes?.find(
                a => a && 'path' in a && (a as FetchedAttributeValueType).path === '.lat'
            ) as FetchedAttributeValueType | undefined;
            const lngAttr = item.internalAttributes?.find(
                a => a && 'path' in a && (a as FetchedAttributeValueType).path === '.lng'
            ) as FetchedAttributeValueType | undefined;
            const lat = parseFloat(String(latAttr?.value ?? '0'));
            const lng = parseFloat(String(lngAttr?.value ?? '0'));
            return lat && lng ? { lat, lng } : null;
        });

        console.log('[styledMap] coords sample:', coords.slice(0, 3));
        const validCoords = coords.filter(Boolean) as { lat: number; lng: number }[];
        console.log('[styledMap] validCoords:', validCoords.length, '/', coords.length);
        if (validCoords.length === 0) return <p>No positions found</p>;

        const avgLat = validCoords.reduce((s, p) => s + p.lat, 0) / validCoords.length;
        const avgLng = validCoords.reduce((s, p) => s + p.lng, 0) / validCoords.length;

        const detailToOpen = options.overview.detailViews?.find(
            d => typeof d === 'object' && (d as any).openFrom?.includes('item')
        );

        return (
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ?? ''}>
                <Map
                    mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID ?? 'DEMO_MAP_ID'}
                    style={{ width: '100%', height: '90vh' }}
                    defaultCenter={{ lat: avgLat, lng: avgLng }}
                    defaultZoom={14}
                >
                    {options.items.map((item, index) => {
                        const pos = coords[index];
                        if (!pos) return null;
                        return (
                            <AdvancedMarker key={`${item.itemId}-${index}`} position={pos}>
                                <div className={`w-fit max-w-[500px] bg-white border border-gray-400 rounded-2xl shadow-md ${detailToOpen ? 'hover:scale-110 active:scale-100 transition' : ''}`}>
                                    <MeridianItem item={item} options={options} index={index} itemView={options.overview.itemView} />
                                </div>
                            </AdvancedMarker>
                        );
                    })}
                </Map>
            </APIProvider>
        );
    },
    defaultSpec: { itemView: { type: 'pin' } },
};

const styledGrid = {
    type: 'grid',
    view: (options: ViewOptions) => (
        <div className="overview-basic-grid">
            <div
                className={`overview-basic-container ${options.overview.className ?? ''}`}
                style={options.overview.style}
            >
                {options.items.map((item, index) => (
                    <div key={index} className="overview-basic-item">
                        <MeridianItem options={options} item={item} itemView={options.overview.itemView} index={index} className={options.overview.itemClassName} style={options.overview.itemStyle} />
                    </div>
                ))}
            </div>
        </div>
    ),
    defaultSpec: { itemView: { type: 'vertical' } },
};

const customOverviewTypes = [styledMap, styledGrid];

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

                    <MeridianWrapper odi={odi} data={sortedArr}
                        customOverviewTypes={customOverviewTypes}
                        onOpenDetailNewPage={()=>{}}
                        onOpenOverviewNewPage={()=>{}}
                    >                        
                        
                        <MeridianOverview/>
                    </MeridianWrapper>
                        
                )}
            </div>
        </div>
    );
}

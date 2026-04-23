'use client'

import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function ViewIsland({setSortState, searchState, setSearch} 
    : {setSortState : (arg0 : string) => void, searchState : string, 
        setSearch : (arg0 : string) => void}) {
    const [activeLayout, setActiveLayout] = useState<'card' | 'timeline' | 'map'>('card')

    return (
        <div
            className="w-full rounded-[16px] flex flex-col gap-2 px-px py-3"
            style={{
                background: 'var(--color-rubber)',
                boxShadow: '0 4px 4px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.7)',
            }}
        >
            {/* Sort By row */}
            <div className="flex items-center justify-between px-3">
                <span className="text-black text-[14px]">Sort By</span>
                <Select defaultValue="descending" onValueChange={(val) => {setSortState(val)}}>
                    <SelectTrigger className="border-none shadow-none bg-transparent text-black/50 text-[14px] w-fit focus:ring-0 p-0">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="descending">Time Descend</SelectItem>
                        <SelectItem value="ascending">Time Ascend</SelectItem>
                        <SelectItem value="length">Length</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Separator */}
            <div className="h-px bg-black/10 mx-3" />

            {/* Search bar */}
            <div className="mx-3">
                <input
                    type="text"
                    placeholder="Search..."
                    value={`${searchState}`}
                    onChange={(e) => (setSearch(e.target.value))}
                    className="w-full rounded-[8px] px-3 py-1.5 text-[13px] bg-white/30 placeholder:text-black/40 text-black outline-none focus:ring-1 focus:ring-white/50"
                />
            </div>

            {/* Separator */}
            <div className="h-px bg-black/10 mx-3" />

            {/* Layout section */}
            <div className="flex flex-col gap-2 px-6.25 py-1.25">

                {/* Layout title */}
                <span className="text-black text-[14px] text-center">Layout</span>

                {/* Card View button */}
                <button
                    onClick={() => setActiveLayout('card')}
                    className={`flex items-center justify-between px-4.5 py-1.75 rounded-[10px] transition-all ${
                        activeLayout === 'card'
                            ? 'bg-white shadow-md'
                            : 'bg-transparent hover:bg-black/10'
                    }`}
                >
                    <span className={`text-[14px] ${activeLayout === 'card' ? 'text-black' : 'text-black/50'}`}>Cards</span>
                    {/* PASTE CARD VIEW SVG HERE */}
                    <svg className={activeLayout === 'card' ? '' : 'opacity-50'} width="40" height="30" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.8889 13.4444H2.44444C1.79614 13.4444 1.17438 13.1869 0.715961 12.7285C0.257539 12.2701 0 11.6483 0 11V2.44444C0 1.79614 0.257539 1.17438 0.715961 0.715961C1.17438 0.257539 1.79614 0 2.44444 0H15.8889C16.5372 0 17.1589 0.257539 17.6174 0.715961C18.0758 1.17438 18.3333 1.79614 18.3333 2.44444V11C18.3333 11.6483 18.0758 12.2701 17.6174 12.7285C17.1589 13.1869 16.5372 13.4444 15.8889 13.4444ZM2.44444 2.44444V11H15.8889V2.44444H2.44444Z" fill="black"/>
                        <path d="M36.6667 13.4444H23.2222C22.5739 13.4444 21.9522 13.1869 21.4937 12.7285C21.0353 12.2701 20.7778 11.6483 20.7778 11V2.44444C20.7778 1.79614 21.0353 1.17438 21.4937 0.715961C21.9522 0.257539 22.5739 0 23.2222 0H36.6667C37.315 0 37.9367 0.257539 38.3952 0.715961C38.8536 1.17438 39.1111 1.79614 39.1111 2.44444V11C39.1111 11.6483 38.8536 12.2701 38.3952 12.7285C37.9367 13.1869 37.315 13.4444 36.6667 13.4444ZM23.2222 2.44444V11H36.6667V2.44444H23.2222Z" fill="black"/>
                        <path d="M15.8889 29.3334H2.44444C1.79614 29.3334 1.17438 29.0758 0.715961 28.6174C0.257539 28.159 0 27.5372 0 26.8889V18.3334C0 17.6851 0.257539 17.0633 0.715961 16.6049C1.17438 16.1465 1.79614 15.8889 2.44444 15.8889H15.8889C16.5372 15.8889 17.1589 16.1465 17.6174 16.6049C18.0758 17.0633 18.3333 17.6851 18.3333 18.3334V26.8889C18.3333 27.5372 18.0758 28.159 17.6174 28.6174C17.1589 29.0758 16.5372 29.3334 15.8889 29.3334ZM2.44444 18.3334V26.8889H15.8889V18.3334H2.44444Z" fill="black"/>
                        <path d="M36.6667 29.3334H23.2222C22.5739 29.3334 21.9522 29.0758 21.4937 28.6174C21.0353 28.159 20.7778 27.5372 20.7778 26.8889V18.3334C20.7778 17.6851 21.0353 17.0633 21.4937 16.6049C21.9522 16.1465 22.5739 15.8889 23.2222 15.8889H36.6667C37.315 15.8889 37.9367 16.1465 38.3952 16.6049C38.8536 17.0633 39.1111 17.6851 39.1111 18.3334V26.8889C39.1111 27.5372 38.8536 28.159 38.3952 28.6174C37.9367 29.0758 37.315 29.3334 36.6667 29.3334ZM23.2222 18.3334V26.8889H36.6667V18.3334H23.2222Z" fill="black"/>
                    </svg>

                </button>

                {/* Timeline View button */}
                <button
                    onClick={() => setActiveLayout('timeline')}
                    className={`flex items-center justify-between px-4.5 py-1.75 rounded-[10px] transition-all ${
                        activeLayout === 'timeline'
                            ? 'bg-white shadow-md'
                            : 'bg-transparent hover:bg-black/10'
                    }`}
                >
                    <span className={`text-[14px] ${activeLayout === 'timeline' ? 'text-black' : 'text-black/50'}`}>Timeline</span>
                    {/* PASTE TIMELINE VIEW SVG HERE */}
                    <svg className={activeLayout === 'timeline' ? '' : 'opacity-50'} width="41" height="37" viewBox="0 0 41 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.1667 22C22.3423 22 24.469 21.3549 26.2779 20.1462C28.0869 18.9375 29.4968 17.2195 30.3293 15.2095C31.1619 13.1995 31.3797 10.9878 30.9553 8.85401C30.5309 6.72022 29.4832 4.76021 27.9448 3.22183C26.4065 1.68345 24.4465 0.635804 22.3127 0.211367C20.1789 -0.213071 17.9671 0.00476615 15.9572 0.83733C13.9472 1.66989 12.2292 3.07979 11.0205 4.88873C9.81181 6.69767 9.16667 8.82441 9.16667 11C9.16667 13.9174 10.3256 16.7153 12.3885 18.7782C14.4514 20.8411 17.2493 22 20.1667 22ZM20.1667 3.30001C21.6896 3.30001 23.1783 3.7516 24.4446 4.59769C25.7108 5.44378 26.6977 6.64635 27.2805 8.05334C27.8633 9.46033 28.0158 11.0085 27.7187 12.5022C27.4216 13.9959 26.6883 15.3679 25.6114 16.4447C24.5345 17.5216 23.1625 18.2549 21.6689 18.5521C20.1752 18.8492 18.627 18.6967 17.22 18.1139C15.813 17.5311 14.6104 16.5442 13.7644 15.2779C12.9183 14.0116 12.4667 12.5229 12.4667 11C12.4667 8.95784 13.2779 6.99931 14.7219 5.55528C16.166 4.11125 18.1245 3.30001 20.1667 3.30001ZM24.9517 9.53334H21.6333V5.50001H18.7V12.4667H24.9517V9.53334ZM34.8333 33V27.5H31.1667V33H22V27.5H18.3333V33H9.16667V27.5H5.5V33H0V36.6667H40.3333V33H34.8333Z" fill="black"/>
                    </svg>

                </button>

                {/* Map View button */}
                <button
                    onClick={() => setActiveLayout('map')}
                    className={`flex items-center justify-between pl-4.5 pr-6 py-1.75 rounded-[10px] transition-all ${
                        activeLayout === 'map'
                            ? 'bg-white shadow-md'
                            : 'bg-transparent hover:bg-black/10'
                    }`}
                >
                    <span className={`text-[14px] ${activeLayout === 'map' ? 'text-black' : 'text-black/50'}`}>Map</span>
                    <svg className={activeLayout === 'map' ? '' : 'opacity-50'} width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.625 0C19.2927 0 15.75 3.54272 15.75 7.875C15.75 9.17725 16.2524 10.5051 16.8984 11.9766C17.5444 13.448 18.3596 15.0066 19.1953 16.4473C20.8667 19.3286 22.5586 21.7383 22.5586 21.7383L23.625 23.2969L24.6914 21.7383C24.6914 21.7383 26.3833 19.3286 28.0547 16.4473C28.8904 15.0066 29.7056 13.448 30.3516 11.9766C30.9976 10.5051 31.5 9.17725 31.5 7.875C31.5 3.54272 27.9573 0 23.625 0ZM10.459 2.54297L0 7.01367V32.1973L10.541 27.6445L21.041 31.582L31.5 27.1113V15.668C30.6643 17.2727 29.7363 18.8108 28.875 20.1797V25.3887L22.3125 28.1777V26.0449L20.3848 23.2559C20.1797 22.9585 19.9387 22.6047 19.6875 22.2305V28.3008L11.8125 25.3477V5.82422L13.248 6.35742C13.3762 5.47046 13.6069 4.61426 13.9453 3.81445L10.459 2.54297ZM23.625 2.625C26.5371 2.625 28.875 4.96289 28.875 7.875C28.875 8.38257 28.5571 9.58228 27.9727 10.9102C27.3882 12.238 26.5627 13.7454 25.7578 15.1348C24.6863 16.9805 24.2249 17.6367 23.625 18.5391C23.0251 17.6367 22.5637 16.9805 21.4922 15.1348C20.6873 13.7454 19.8618 12.238 19.2773 10.9102C18.6929 9.58228 18.375 8.38257 18.375 7.875C18.375 4.96289 20.7129 2.625 23.625 2.625ZM9.1875 5.90625V25.3887L2.625 28.1777V8.73633L9.1875 5.90625ZM23.625 5.90625C22.5381 5.90625 21.6562 6.78809 21.6562 7.875C21.6562 8.96191 22.5381 9.84375 23.625 9.84375C24.7119 9.84375 25.5938 8.96191 25.5938 7.875C25.5938 6.78809 24.7119 5.90625 23.625 5.90625Z" fill="black"/>
                    </svg>

                </button>

            </div>
        </div>
    )
}
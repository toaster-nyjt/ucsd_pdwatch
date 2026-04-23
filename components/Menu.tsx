import PopulateIsland from './PopulateIsland';
import ViewIsland from './ViewIsland';

export default function Menu({
    dateState,
    setDate,
    setDays,
    rdate,
    setSortState,
    numEntries,
    searchState,
    setSearch,
}: {
    dateState: Date;
    setDate: (arg0: Date) => void;
    setDays: (arg0: number) => void;
    rdate: string;
    setSortState: (arg0: string) => void;
    numEntries: number;
    searchState: string;
    setSearch: (arg0: string) => void;
}) {
    return (
        <div
            className="flex flex-col justify-between gap-4 rounded-[21px] px-4.75 pt-10 pb-10"
            style={{
                boxShadow:
                    '0 4px 4px rgba(0,0,0,0.25), inset 0 4px 4px 7px rgba(255,255,255,0.25)',
                backdropFilter: 'blur(10px)',
                background: 'rgba(152, 193, 217, 0.20)',
            }}
        >
            {/* Title section */}
            <div className="flex flex-col items-center gap-px">
                {/* Now showing */}
                <span className="monofett-regular text-[20px] text-white">
                    now showing
                </span>

                {/* Count */}
                <span className="text-[30px] leading-none font-bold text-[#2B4648]">
                    {numEntries}
                </span>

                {/* Entries */}
                <span className="font-mono text-[20px] text-white">
                    entries
                </span>
            </div>
            <PopulateIsland
                dateState={dateState}
                setDate={setDate}
                setDays={setDays}
                rdate={rdate}
            />
            <ViewIsland
                setSortState={setSortState}
                searchState={searchState}
                setSearch={setSearch}
            />
        </div>
    );
}

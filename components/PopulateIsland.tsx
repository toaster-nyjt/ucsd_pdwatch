import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { oldestDate } from '@/lib/constants';

export default function PopulateIsland({
    dateState,
    setDate,
    setDays,
    rdate,
}: {
    dateState: Date;
    setDate: (arg0: Date) => void;
    setDays: (arg0: number) => void;
    rdate: string;
}) {
    return (
        <div
            className="w-full overflow-hidden rounded-[7px] ring-2 ring-white/80"
            style={{ background: '#C6E0FF' }}
        >
            {/* See row */}
            <div className="flex items-center justify-between px-px py-1.75">
                <span className="px-2 text-[14px] text-black">See</span>
                <Select
                    defaultValue="1"
                    onValueChange={(val) => {
                        setDays(Number(val));
                    }}
                >
                    <SelectTrigger className="w-fit border-none bg-transparent text-[14px] text-black/50 shadow-none focus:ring-0">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">Previous Day</SelectItem>
                        <SelectItem value="7">Previous Week</SelectItem>
                        {/* <SelectItem value="30">Previous Month</SelectItem> */}
                        {/* <SelectItem value="-1">All Time</SelectItem> */}
                    </SelectContent>
                </Select>
            </div>

            {/* Divider */}
            <div className="mx-2 h-px bg-black/10" />

            {/* From row */}
            <div className="flex items-center justify-between px-px py-1.75">
                <span className="px-2 text-[14px] text-black">From</span>
                <Popover>
                    <PopoverTrigger className="flex items-center gap-1 pr-2 text-[14px] text-black/50">
                        {/* Displays date in the From calendar box*/}
                        {dateState.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                        })}
                        <span className="text-black/30">›</span>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                        <Calendar
                            mode="single"
                            required
                            selected={dateState} // Selected date is the date state var
                            onSelect={setDate} // onSelect calls setDate with the new date, changing the state var
                            disabled={{
                                before: new Date(oldestDate),
                                after: new Date(rdate),
                            }} // Sets a time range
                            autoFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}

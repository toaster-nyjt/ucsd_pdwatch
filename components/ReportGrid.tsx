import PDReportCard from './ReportCard';
import { PDReport } from './ReportCard';

export default function ReportGrid({reportArr} : {reportArr : PDReport[]}) {
    return (
        <div 
            className='flex flex-wrap justify-center gap-x-2.5 gap-y-1.25 rounded-[35px] py-4 px-2 drop-shadow-2xl'
            style={{
                boxShadow: '0 4px 4px rgba(0,0,0,0.25), inset 0 4px 4px 7px rgba(255,255,255,0.25)',
                backdropFilter: 'blur(10px)',
                background: 'rgba(152, 193, 217, 0.42)',
            }}
        >
            {reportArr.map((reportObj, i) => ( // Change to reportArr eventually
                <PDReportCard key={i} report={reportObj}/>
            ))}
        </div>
    )
}
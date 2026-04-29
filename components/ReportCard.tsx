type PDReport = {
    id: string;
    category: string;
    location: string;
    date: string;
    time: string;
    summary: string;
    disposition: string;
    lat: number;
    lng: number;
};

export type { PDReport };

export default function PDReportCard({ report }: { report: PDReport }) {
    return (
        <div
            className="rounded-[31px]"
            style={{ boxShadow: '0 2px 4px 3px rgba(0,0,0,0.25)' }}
        >
            <div className="flex h-64.75 w-52.25 flex-col overflow-hidden rounded-[31px] text-black ring-[1px] ring-white/80">
                {/* Top Section */}
                <div className="bg-dark-powder flex h-27.5 flex-col justify-center gap-0 pt-2.75 pl-3.75 text-[10px]">
                    {/* Category */}
                    <div className="flex items-center gap-2">
                        <svg
                            className="shrink-0"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8.09044 13.59C7.40153 13.5306 6.70431 13.5002 6 13.5002H5.25C2.76472 13.5002 0.75 11.4855 0.75 9.00021C0.75 6.51493 2.76472 4.50021 5.25 4.50021H6C6.70431 4.50021 7.40153 4.46987 8.09044 4.41043M8.09044 13.59C8.34329 14.5517 8.67372 15.4819 9.07463 16.3736C9.32209 16.924 9.13422 17.583 8.6116 17.8847L7.95529 18.2636C7.4039 18.582 6.6956 18.3808 6.42841 17.8029C5.8018 16.4475 5.31541 15.0141 4.98786 13.5212M8.09044 13.59C7.70517 12.1247 7.5 10.5864 7.5 9.00021C7.5 7.414 7.70518 5.87571 8.09044 4.41043M8.09044 13.59C11.25 13.8626 14.2345 14.7474 16.9247 16.1251M8.09044 4.41043C11.25 4.13782 14.2345 3.25304 16.9247 1.8753M16.9247 1.8753C16.807 1.49616 16.6802 1.12104 16.5444 0.750214M16.9247 1.8753C17.4597 3.59849 17.8057 5.40484 17.9386 7.27013M16.9247 16.1251C16.807 16.5043 16.6802 16.8794 16.5444 17.2502M16.9247 16.1251C17.4597 14.4019 17.8057 12.5956 17.9386 10.7303M17.9386 7.27013C18.4344 7.68285 18.75 8.30468 18.75 9.00021C18.75 9.69575 18.4344 10.3176 17.9386 10.7303M17.9386 7.27013C17.9793 7.84152 18 8.41845 18 9.00021C18 9.58197 17.9793 10.1589 17.9386 10.7303"
                                stroke="#0F172A"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span className="line-clamp-2 flex-1 pr-2 text-right font-extrabold">
                            {report.category}
                        </span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 pl-0.5">
                        <svg
                            className="min-w-4.25 shrink-0"
                            width="17"
                            height="21"
                            viewBox="0 0 17 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M11.25 8.25C11.25 9.90685 9.90685 11.25 8.25 11.25C6.59315 11.25 5.25 9.90685 5.25 8.25C5.25 6.59315 6.59315 5.25 8.25 5.25C9.90685 5.25 11.25 6.59315 11.25 8.25Z"
                                stroke="#0F172A"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M15.75 8.25C15.75 15.3921 8.25 19.5 8.25 19.5C8.25 19.5 0.75 15.3921 0.75 8.25C0.75 4.10786 4.10786 0.75 8.25 0.75C12.3921 0.75 15.75 4.10786 15.75 8.25Z"
                                stroke="#0F172A"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span className="line-clamp-2 flex-1 pr-2 text-right">
                            {report.location}
                        </span>
                    </div>

                    {/* Time */}
                    <div className="flex items-center gap-2">
                        <svg
                            className="shrink-0"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M9.75 3.75V9.75H14.25M18.75 9.75C18.75 14.7206 14.7206 18.75 9.75 18.75C4.77944 18.75 0.75 14.7206 0.75 9.75C0.75 4.77944 4.77944 0.75 9.75 0.75C14.7206 0.75 18.75 4.77944 18.75 9.75Z"
                                stroke="#0F172A"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span className="flex-1 pr-2 text-right">
                            {report.time != '00:00:00'
                                ? new Intl.DateTimeFormat('en-US', {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                      hour12: true,
                                  }).format(
                                      new Date(`1970-01-01T${report.time}`)
                                  )
                                : 'N/A'}
                        </span>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-2">
                        <svg
                            className="shrink-0"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M4.5 0.75V3M15 0.75V3M0.75 16.5V5.25C0.75 4.00736 1.75736 3 3 3H16.5C17.7426 3 18.75 4.00736 18.75 5.25V16.5M0.75 16.5C0.75 17.7426 1.75736 18.75 3 18.75H16.5C17.7426 18.75 18.75 17.7426 18.75 16.5M0.75 16.5V9C0.75 7.75736 1.75736 6.75 3 6.75H16.5C17.7426 6.75 18.75 7.75736 18.75 9V16.5"
                                stroke="#0F172A"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span className="flex-1 pr-2 text-right">
                            {report.date != '1970/01/01'
                                ? new Date(
                                      report.date.replaceAll('-', '/')
                                  ).toDateString()
                                : 'N/A'}
                        </span>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="bg-light-powder flex flex-1 flex-col justify-around pb-2 pl-2 text-[10px]">
                    {/* Summary */}
                    <div className="text flex items-start gap-2 pl-2.25">
                        <svg
                            className="shrink-0"
                            width="17"
                            height="20"
                            viewBox="0 0 17 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M1.40712 0.0416508C0.899723 0.159451 0.408522 0.573452 0.164922 1.08085L0.0147225 1.39745L0.00252252 9.67945C-0.00567748 15.2251 0.00652254 18.0263 0.0349225 18.1563C0.148523 18.6921 0.550522 19.1835 1.08232 19.4351L1.39492 19.5853L7.91092 19.5975C12.2589 19.6057 14.4917 19.5935 14.6217 19.5651C15.2753 19.4271 15.8761 18.8343 16.0265 18.1807C16.0549 18.0629 16.0711 16.0817 16.0711 12.5619C16.0711 7.32885 16.0671 7.11365 15.9939 6.95945C15.8965 6.75645 9.24672 0.102451 9.07612 0.0376508C8.93392 -0.0151492 1.63052 -0.0111492 1.40712 0.0416508ZM7.74852 3.84565C7.74852 6.71185 7.75252 6.74845 7.97992 7.14225C8.15852 7.44665 8.48732 7.73905 8.83252 7.90545L9.14912 8.05565L12.0031 8.06785L14.8531 8.08005V13.0695C14.8531 16.8533 14.8409 18.0833 14.8043 18.1645C14.6987 18.3999 15.1007 18.3877 8.03272 18.3877C0.964723 18.3877 1.36652 18.3999 1.26112 18.1645C1.18392 18.0021 1.19212 1.56005 1.26932 1.42205C1.38712 1.21085 1.29372 1.21905 4.63492 1.21505H7.74872V3.84565H7.74852ZM11.7677 6.84985C9.06392 6.85805 9.09232 6.86205 9.00712 6.63065C8.98272 6.56965 8.96652 5.52645 8.96652 4.04465V1.56005L11.6053 4.19885L14.2441 6.83765L11.7677 6.84985Z"
                                fill="black"
                            />
                            <path
                                d="M4.01352 10.6742V11.2832H8.03272H12.0519V10.6742V10.0652H8.03272H4.01352V10.6742Z"
                                fill="black"
                            />
                            <path
                                d="M4.01352 13.3131V13.9221H8.03272H12.0519V13.3131V12.7041H8.03272H4.01352V13.3131Z"
                                fill="black"
                            />
                            <path
                                d="M4.01352 15.8707V16.4797H5.92172H7.82972V15.8707V15.2617H5.92172H4.01352V15.8707Z"
                                fill="black"
                            />
                        </svg>
                        <p className="line-clamp-7 min-w-0 flex-1 pr-2 text-right">
                            {report.summary}
                        </p>
                    </div>

                    {/* Disposition */}
                    <div className="text flex items-start gap-2 pl-2">
                        <svg
                            className="shrink-0"
                            width="23"
                            height="21"
                            viewBox="0 0 23 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M11.0398 12.7397C13.7883 12.7397 16.0906 11.8059 16.2297 10.5858L14.936 6.96095C14.6324 7.8361 12.9522 8.4571 11.0398 8.4571C9.12733 8.4571 7.44718 7.8361 7.14358 6.96095L5.85098 10.5858C5.99013 11.8059 8.29128 12.7397 11.0398 12.7397ZM11.0398 5.02895C12.3324 5.02895 13.5318 4.62875 13.8837 4.0066C13.3996 2.6473 12.9844 1.48005 12.7211 0.7452C12.5463 0.25415 11.7539 0 11.0398 0C10.3256 0 9.53328 0.25415 9.35848 0.7452L8.19583 4.0066C8.54773 4.62875 9.74833 5.02895 11.0398 5.02895ZM21.1368 13.8759L16.8185 12.1348L17.3165 13.5229C17.2912 14.9937 14.4369 16.1667 11.0398 16.1667C7.64383 16.1667 4.78723 14.9949 4.76308 13.5229L5.26103 12.1348L0.94278 13.8759C-0.26817 14.3635 -0.31992 15.2663 0.83008 15.8815L8.95138 20.2366C10.0991 20.8518 11.9793 20.8518 13.1282 20.2366L21.2506 15.8815C22.3995 15.2663 22.3477 14.3635 21.1368 13.8759Z"
                                fill="black"
                            />
                        </svg>
                        <p className="line-clamp-2 min-w-0 flex-1 pr-2 text-right">
                            {report.disposition}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

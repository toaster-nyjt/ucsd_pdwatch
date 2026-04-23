import Link from 'next/link';

export default function Header() {
    return (
        <div
            className="bg-rubber relative flex h-[12vh] w-full items-center justify-between rounded-b-[15px] px-8 py-6 drop-shadow-2xl"
            style={{
                boxShadow:
                    '0 4px 4px rgba(0,0,0,0.25), inset 0 4px 4px 7px rgba(255,255,255,0.25)',
            }}
        >
            {/* Left: Title */}
            <Link href="/">
                <span
                    className="cursor-pointer text-[40px] text-black/60 transition-colors hover:text-white/60"
                    style={{ fontFamily: 'Monofett, monospace' }}
                >
                    UCSD PD Watch
                </span>
            </Link>

            {/* Right: Nav links */}
            <div className="flex gap-8">
                <Link href="/">
                    <span
                        className="cursor-pointer text-[25px] text-black/60 transition-colors hover:text-white/60"
                        style={{ fontFamily: 'Monofett, monospace' }}
                    >
                        Home
                    </span>
                </Link>
                <Link href="/">
                    <span
                        className="cursor-pointer text-[25px] text-black/60 transition-colors hover:text-white/60"
                        style={{ fontFamily: 'Monofett, monospace' }}
                    >
                        About
                    </span>
                </Link>
            </div>

            {/* Bottom center triangle */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
                <svg
                    width="24"
                    height="13"
                    viewBox="0 0 24 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g filter="url(#filter0_i_17_693)">
                        <path
                            d="M10.888 12.1843L0.269306 1.56567C0.140887 1.43757 0.0533574 1.27426 0.0177936 1.0964C-0.0177703 0.918538 0.000230275 0.734124 0.0695183 0.566498C0.138806 0.398872 0.256266 0.25557 0.407032 0.154728C0.557797 0.0538865 0.73509 3.85273e-05 0.916472 0H22.1575C22.3389 3.85273e-05 22.5162 0.0538865 22.6669 0.154728C22.8177 0.25557 22.9351 0.398872 23.0044 0.566498C23.0737 0.734124 23.0917 0.918538 23.0562 1.0964C23.0206 1.27426 22.9331 1.43757 22.8046 1.56567L12.1841 12.1843C12.0122 12.3562 11.7791 12.4527 11.5361 12.4527C11.293 12.4527 11.0599 12.3562 10.888 12.1843Z"
                            fill="#BCAB79"
                            fillOpacity="0.2"
                        />
                    </g>
                    <defs>
                        <filter
                            id="filter0_i_17_693"
                            x="0"
                            y="0"
                            width="25.274"
                            height="14.6527"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                        >
                            <feFlood
                                floodOpacity="0"
                                result="BackgroundImageFix"
                            />
                            <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="BackgroundImageFix"
                                result="shape"
                            />
                            <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset dx="5" dy="4" />
                            <feGaussianBlur stdDeviation="1.1" />
                            <feComposite
                                in2="hardAlpha"
                                operator="arithmetic"
                                k2="-1"
                                k3="1"
                            />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                            />
                            <feBlend
                                mode="normal"
                                in2="shape"
                                result="effect1_innerShadow_17_693"
                            />
                        </filter>
                    </defs>
                </svg>
            </div>
        </div>
    );
}

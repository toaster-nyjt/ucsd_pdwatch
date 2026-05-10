import type { Metadata } from 'next';
import { Monofett, Exo_2 } from 'next/font/google';
import './globals.css';

const monofett = Monofett({
    weight: '400',
    variable: '--font-monofett',
    subsets: ['latin'],
});

const exo = Exo_2({
    variable: '--font-exo',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    metadataBase: new URL('https://pdwatch.example.com'),
    title: {
        default: 'PDWatch',
        template: '%s | PDWatch',
    },
    description: 'Search and explore UCSD Police Department incident reports.',
    openGraph: {
        siteName: 'PDWatch',
        type: 'website',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${monofett.variable} ${exo.variable} h-full antialiased`}
        >
            <head></head>
            <body className="flex min-h-full flex-col">{children}</body>
        </html>
    );
}

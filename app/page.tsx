import { Metadata } from 'next';
import Header from '@/components/Header';
import ContentArea from '@/components/ContentArea';
import { getMostRecentDate } from '@/lib/constants';

export const metadata: Metadata = {
    title: 'Incident Reports',
    description: 'Browse, search, and filter UCSD PD incident reports by date, type, and location.',
    openGraph: {
        title: 'UCSD PD Incident Reports | PDWatch',
        description: 'Browse, search, and filter UCSD PD incident reports by date, type, and location.',
    },
}

export default async function Page() {
    const date = await getMostRecentDate();

    return (
        <main className="flex h-screen flex-col overflow-hidden">
            <Header />
            <div className="min-h-0 flex-1 overflow-hidden">
                <ContentArea rdate={date} />
            </div>
        </main>
    );
}

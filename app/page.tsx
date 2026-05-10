import Header from '@/components/Header';
import ContentArea from '@/components/ContentArea';
import { getMostRecentDate } from '@/lib/constants';

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

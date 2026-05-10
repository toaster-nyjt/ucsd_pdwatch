import Header from '@/components/Header';
import { getMostRecentDate } from '@/lib/constants';

export default async function AboutPage() {
    const date = await getMostRecentDate();

    return (
        <main> 
            <Header />
            <div className="flex flex-col h-full w-full justify-center items-center p-30 text-white text-xl">
                <span>Hello!</span>
                <p>
                    This is the tentative UCSD PD tracker page for user testing on Malleable ODIs. 
                    This page was last updated on    
                    {" " + date}
                </p>
            </div>
        </main>
    );
}
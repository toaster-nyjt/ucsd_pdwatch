import Header from '@/components/Header'
import ContentArea from '@/components/ContentArea'
import { getMostRecentDate } from '@/lib/constants'

export default async function Page() {
    const date = await getMostRecentDate()

    return (
        <main className="h-screen overflow-hidden flex flex-col">
            <Header />
            <div className="flex-1 min-h-0 overflow-hidden">
              <ContentArea rdate={date}/>
            </div>
        </main>
    )
}
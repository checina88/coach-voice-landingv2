import Navbar from "@/components/coach/Navbar";
import BookForm from "@/components/coach/BookForm";

export const metadata = {
    title: "Take Action — Coach Voice",
    description: "Book a call with the Coach Voice team to explore how coaching communication analysis can support your organization.",
};

export default function TakeActionPage() {
    return (
        <main className="w-full min-h-screen relative flex flex-col">
            <Navbar />
            <section className="flex-1 flex items-center justify-center px-6 py-32 md:py-40">
                <div className="w-full max-w-2xl">
                    <BookForm />
                </div>
            </section>
        </main>
    );
}

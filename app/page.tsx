import Navbar from "@/components/coach/Navbar";
import Hero from "@/components/coach/Hero";
import SlowDown from "@/components/coach/SlowDown";
import Understand from "@/components/coach/Understand";
import FeedbackDomains from "@/components/coach/FeedbackDomains";
import SDTDomains from "@/components/coach/SDTDomains";
import Trust from "@/components/coach/Trust";
import Footer from "@/components/coach/Footer";

export default function Home() {
  return (
    <main className="w-full min-h-screen relative flex flex-col">
      <Navbar />
      <Hero />
      <SlowDown />
      <Understand />
      <FeedbackDomains />
      <SDTDomains />
      <Trust />
      <Footer />
    </main>
  );
}

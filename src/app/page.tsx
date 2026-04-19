import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import RecentWork from "@/components/RecentWork";
import LatestWriting from "@/components/LatestWriting";
import Collaborate from "@/components/Collaborate";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="max-w-5xl mx-auto px-6 pt-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <Hero />
            <RecentWork />
            <LatestWriting />
          </div>
          <div className="lg:col-span-4">
            <Collaborate />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

import Navbar from "@/components/layout/Navbar";
import CosmicBackground from "@/components/ui/CosmicBackground";
import HeroSphere from "@/components/3d/HeroSphere";
import Hero from "@/components/sections/Hero";
import Scrollytelling from "@/components/sections/Scrollytelling";

export default function HomeV2() {
    return (
        <main className="min-h-screen relative w-full overflow-hidden text-white selection:bg-alokai-green selection:text-black">
            <Navbar />
            <CosmicBackground />

            {/* 3D Background Layer */}
            {/* Note: HeroSphere needs to be fixed position for this layout */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <HeroSphere />
            </div>

            {/* Main Content Layer */}
            <div className="relative z-10 w-full">
                <Hero />
                <Scrollytelling />
            </div>
        </main>
    );
}

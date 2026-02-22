import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Solutions from "@/components/sections/Solutions";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Solutions />
        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

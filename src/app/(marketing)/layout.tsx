import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import FloatingDock from "@/components/layout/FloatingDock";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16 overflow-x-hidden">{children}</main>
      <Footer />
      <FloatingDock />
      <WhatsAppButton />
    </>
  );
}

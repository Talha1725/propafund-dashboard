import Footer from "@/components/common/footer";
import PromoBanner from "@/components/common/promo-banner";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full overflow-hidden">
      <PromoBanner />
      {children}
      <Footer />
    </div>
  );
}

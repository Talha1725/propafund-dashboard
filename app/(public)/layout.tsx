import Container from "@/components/common/container";
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Container>
        <Navbar />
      </Container>
      {children}
      <Footer />
    </div>
  );
}

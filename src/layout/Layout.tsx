import Footer from './Footer';
import Header from './Header';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />

      <main className="pt-20 max-w-4xl mx-auto px-4 space-y-6">{children}</main>

      <Footer />
    </>
  );
}

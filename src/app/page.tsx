import Header from "@/components/Header";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Education from "@/components/Education";
import AboutMe from "@/components/AboutMe";

export default function Home() {
  return (
    <>
      <Header />

      <main className="pt-20 max-w-4xl mx-auto px-4 space-y-6">
        <AboutMe />

        <Experience />

        <Education />
      </main>
      <Footer />
    </>
  );
}

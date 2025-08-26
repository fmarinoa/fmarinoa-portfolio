import Layout from '@/layout/Layout';
import AboutMe from '@/sections/AboutMe';
import Education from '@/sections/Education';
import Experience from '@/sections/Experience';
import Projects from '@/sections/Projects';

export default function Home() {
  return (
    <Layout>
      <AboutMe />
      <Experience />
      <Projects />
      <Education />
    </Layout>
  );
}

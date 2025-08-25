import AboutMe from '@/sections/AboutMe';
import Education from '@/sections/Education';
import Experience from '@/sections/Experience';

import Layout from './layout/Layout';

export default function Home() {
  return (
    <Layout>
      <AboutMe />
      <Experience />
      <Education />
    </Layout>
  );
}

import Head from "next/head";
import ProjBlock from "../components/ProjBlock";
const Projects = () => {
  return (
    <>
      <Head>
        <title>Projects -- Narra&apos;s Blog</title>
      </Head>
      <h1 className="indexheading mb-10">Projects</h1>

      <div>
        <ProjBlock
          imgSrc="/calendar.png"
          name="Simple Calender App"
          description="  I used React hooks and context API to build this small but functional Calendar, use localstorage to store the events, and you can filter all the events by color."
        />
      </div>
    </>
  );
};
export default Projects;

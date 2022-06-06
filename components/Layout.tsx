import Navbar from "./Navbar";
import Head from "next/head";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Head>
      <meta name="description" content="UZAN blog" />
    </Head>
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* <main className="flex flex-col  px-20 md:px-44 lg:px-64 xl:px-80 2xl:px-96"> */}
      <main className="flex flex-col  w-[70%] max-w-3xl mx-auto mt-20">
        {children}
      </main>
    </div>
  </>
);

export default Layout;

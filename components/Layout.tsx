import Navbar from "./Navbar";
import Head from "next/head";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <meta name="description" content="Narra's blog" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
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
};

export default Layout;

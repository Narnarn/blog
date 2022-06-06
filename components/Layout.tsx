import Navbar from "./Navbar";
import Head from "next/head";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Head>
      <meta name="description" content="UZAN blog" />
    </Head>
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="max-w-4xl  font-Inter  text-gray-700">{children}</main>
    </div>
  </>
);

export default Layout;

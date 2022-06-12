import Link from "next/link";
import { FcGlobe, FcMenu } from "react-icons/fc";
import { Menu, Transition } from "@headlessui/react";
import { VscChevronDown } from "react-icons/vsc";
import { useTheme } from "next-themes";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { useState, useEffect } from "react";

const MyLink = (props: { href: string; children: React.ReactNode }) => {
  const { href, children, ...rest } = props;
  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  );
};

const navigations = [
  {
    name: "Posts",
    link: "/posts",
  },
  {
    name: "Tags",
    link: "/tags",
  },
  {
    name: "Projects",
    link: "/projects",
  },
];

const Navbar = () => {
  // const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  return (
    <>
      <nav className="sticky top-0 z-6  border-b border-gray-300 bg-[#fffaf5] bg-opacity-70 backdrop-filter backdrop-blur-lg font-Montserrat">
        <div className="flex px-8 justify-between md:justify-around pt-4  pb-2 text-gray-600 ">
          <Link href="/">
            <a className="text-lg font-bold min-w-max mr-4">
              {/* <FcGlobe className="inline mr-1 -mt-1 hover:animate-spin" /> */}
              Space
            </a>
          </Link>

          <div className="hidden md:flex justify-center md:justify-end  mt-1">
            {navigations.map((n) => (
              <Link href={n.link} key={n.link}>
                <a className="navitem">{n.name}</a>
              </Link>
            ))}

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="inline ml-4 "
            >
              {theme == "dark" && <MdOutlineLightMode size={20} />}
              {theme == "light" && <MdOutlineDarkMode size={20} />}
            </button>
          </div>

          <div className="inline-block md:hidden pt-1">
            <Menu as="div" className="relative inline-block mr-4">
              <Menu.Button>
                {({ open }) => (
                  <>
                    <FcMenu
                      className={`${open ? "hidden" : "block"}`}
                      size={20}
                    />
                    <VscChevronDown
                      className={`${open ? "block" : "hidden"}`}
                    />
                  </>
                )}
              </Menu.Button>

              {/* Use the Transition component. */}
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Menu.Items className="absolute right-0 grid grid-rows-3 bg-[#fffaf5]/70 backdrop-filter backdrop-blur-lg shadow-md px-2 py-1 border-[1px] border-gray-300 text-gray-700 divide-y divide-gray-300 divide-dashed ">
                  {navigations.map((n) => (
                    <Menu.Item key={n.link}>
                      <MyLink href={n.link}>
                        <div>{n.name}</div>
                      </MyLink>
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className=""
            >
              {theme == "dark" && <MdOutlineLightMode size={20} />}
              {theme == "light" && <MdOutlineDarkMode size={20} />}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

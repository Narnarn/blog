import Link from "next/link";
import { FcGlobe, FcMenu } from "react-icons/fc";
import { Menu, Transition } from "@headlessui/react";
import { VscChevronDown } from "react-icons/vsc";

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
    name: "Projects",
    link: "/projects",
  },
  {
    name: "Tags",
    link: "/tags",
  },
  {
    name: "Entertainment",
    link: "/entertainment",
  },
];

const Navbar = () => {
  return (
    <>
      <nav className="sticky top-0 z-6 px-12 md:px-40 border-b border-gray-300 bg-[#fffaf5] bg-opacity-70 backdrop-filter backdrop-blur-lg font-Montserrat">
        <div className="flex justify-between md:justify-around pt-4  pb-2 text-gray-600 ">
          <Link href="/">
            <a className="text-lg font-bold min-w-max mr-4">
              <FcGlobe className="inline mr-1 -mt-1 hover:animate-spin" />
              UZAN - My Space
            </a>
          </Link>

          <div className="hidden md:flex justify-center md:justify-end  mt-1">
            {navigations.map((n) => (
              <Link href={n.link} key={n.link}>
                <a className="navitem">{n.name}</a>
              </Link>
            ))}
          </div>
          <div className="block md:hidden pt-1">
            <Menu as="div" className="relative">
              <Menu.Button>
                {({ open }) => (
                  <>
                    <FcMenu className={`${open ? "hidden" : "block"}`} />
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
                <Menu.Items className="absolute right-0 grid grid-rows-4 bg-[#D3E4CD]/30 backdrop-blur-md shadow-md px-2 py-1 border-[1px] border-gray-300 text-gray-700 divide-y divide-gray-300 divide-dashed ">
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
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

import { Dropdown, Navbar } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { School } from "../interfaces";
import { JurusanService } from "../services";

const navigation = [
  { name: "Beranda", href: "/", children: [] },
  {
    name: "Informasi",
    href: "informasi",
    children: [
      { name: "Visi dan Misi", href: "/informasi/visi-misi" },
      { name: "Fasilitas", href: "/informasi/fasilitas" },
      { name: "Galeri", href: "/informasi/galeri" },
    ],
  },
  {
    name: "Konten",
    href: "/konten",
    children: [
      { name: "Berita", href: "/konten/berita" },
      { name: "Acara", href: "/konten/acara" },
    ],
  },
  { name: "Ekstrakurikuler (Ekskul)", href: "/ekstrakurikuler", children: [] },
  {
    name: "Jurusan",
    href: "/jurusan",
    children: [],
  },
  { name: "Study Tracer", href: "/study-tracer", children: [] },
  { name: "Tentang Sekolah", href: "/tentang-sekolah", children: [] },
];

export const Header = () => {
  const location = useLocation();

  const [schoolConfig] = useState<School>(JSON.parse(localStorage.getItem("school_config")!))
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(()=>{
    getJurusan()
    async function getJurusan() {
      setLoading(true)
      try {
        const response = await JurusanService().all()
        navigation.map(function(nav){
          if(nav.name == "Jurusan") {
            const children: { name: string; href: string; }[] = []
            response.data.map(jurs=>{
              children.push({ name: jurs.name, href: "/jurusan/"+jurs.id })
            })
            nav.children = children
          }
          return nav
        })
      } catch (error) {
        console.error(error)      
      }
      setLoading(false)
    }
  }, [])

  return loading ? <></> :  (
    <Navbar fluid rounded className="sticky top-0 z-20 shadow" theme={{root:{rounded:{on:""}}, link: {active:{on:"bg-[#1E7DC1] text-white dark:text-white md:bg-transparent md:text-[#1E7DC1]", off:"border-b border-gray-100 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-[#1E7DC1] md:dark:hover:bg-transparent md:dark:hover:text-white"}}}}>
      <Navbar.Brand href="/">
        <img
          src={schoolConfig.logo.url}
          className="mr-3 h-6 sm:h-9"
          alt="Logo"
        />
        <span className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-slate-100">
          {schoolConfig.name}
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />

      <Navbar.Collapse>
        {navigation.map((item) => {
          if (item.children.length) {
            return (
              <Dropdown
                key={item.name}
                inline
                placement="bottom"
                label={
                  <span className={"w-full text-start block py-2 pl-3 pr-4 md:p-0 border-b border-gray-100 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-slate-100 md:border-0 md:hover:bg-transparent md:hover:text-[#1E7DC1] md:dark:hover:bg-transparent md:dark:hover:text-slate-100" + (location.pathname.includes(item.href) ? ' text-[#1E7DC1]' : ' text-gray-700')}>
                    {item.name}
                  </span>
                }
              >
                {item.children.map((child) => (
                  <Link to={child.href} key={child.name}>
                    <Dropdown.Item>
                      {child.name}
                    </Dropdown.Item>
                  </Link>
                ))}
              </Dropdown>
            );
          } else {
            return (
              <Link to={item.href} key={item.name}>
                <Navbar.Link as={"p"} active={location.pathname==item.href}>
                  {item.name}
                </Navbar.Link>
              </Link>
            );
          }
        })}
      </Navbar.Collapse>
    </Navbar>
  );
};

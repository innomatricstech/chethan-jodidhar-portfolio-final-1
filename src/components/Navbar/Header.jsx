import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { FaAlignRight } from "react-icons/fa6";
import { FaTimes, FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const Header = () => {
  const menuItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "/chethan-jodidhar/about-us",
    },
    
    {
      name: "Projects",
      link: "/chethan-jodidhar/projects",
    },
    {
      name: "Gallery",
      link: "/chethan-jodidhar/gallery",
    },
    {
      name: "Contact",
      link: "/chethan-jodidhar/contact",
    },
  ];

  const [toggle, setToggle] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const toggleServices = () => setServicesOpen(!servicesOpen);

  const toggleMenu = () => {
    setToggle((prevState) => !prevState);
  };

  return (
    <main>
      {/* Desktop Header */}

      <header className="container mx-auto hidden md:block lg:block">
        <section className="flex items-center justify-between">
          {/* Logo */}
          <figure>
            <img src={logo} className="w-28 p-3" alt="chetan_cinemas_logo" />
          </figure>

          {/* Navigation Menu */}
          <nav>
            <ul className="flex gap-10 uppercase">
              {menuItems.map((item, index) => {
                return (
                  <Link to={item.link} key={index}>
                    <li
                      key={index}
                      className="cursor-pointer text-lg font-normal"
                    >
                      {item.name}
                    </li>
                  </Link>
                );
              })}
            </ul>
          </nav>
        </section>
      </header>

      {/* Mobile Menu  */}
      <header className="container mx-auto block md:hidden lg:hidden relative">
        <section className="flex items-center justify-between">
          {/* Logo */}
          <div>
            <figure>
              <img src={logo} className="w-28" alt="chetan_cinemas_logo" />
            </figure>
          </div>

          <div className="flex items-center justify-center">
            {toggle ? (
              <>
                <FaTimes
                  className="text-4xl absolute right-3"
                  onClick={toggleMenu}
                />

                {/* Navigation menu */}
                <div
                  className={`absolute top-[100%] right-0 w-full z-50 bg-black transition-all duration-500 ease-in-out ${
                    toggle
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-10"
                  }`}
                >
                  <nav>
                    <ul className="py-20 flex flex-col gap-10 uppercase items-center justify-center text-white">
                      {menuItems.map((item, index) => {
                        return (
                          <Link to={item.link} key={index}>
                            <li
                              key={index}
                              className="cursor-pointer text-lg font-normal"
                              onClick={toggleMenu}
                            >
                              {item.name}
                            </li>
                          </Link>
                        );
                      })}
                      <div className="flex gap-5">
                        <FaFacebook className="text-4xl bg-[#eb2beb] p-[5px] rounded-lg" />
                        <FaInstagram className="text-4xl bg-[#eb2beb] p-[5px] rounded-lg" />
                        <FaYoutube className="text-4xl bg-[#eb2beb] p-[5px] rounded-lg" />
                      </div>
                    </ul>
                  </nav>
                </div>
              </>
            ) : (
              <>
                <FaAlignRight
                  className="text-4xl absolute right-3"
                  onClick={toggleMenu}
                />
              </>
            )}
          </div>
        </section>
      </header>
    </main>
  );
};

export default Header;

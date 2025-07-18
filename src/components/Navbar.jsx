import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useWindowScroll } from "react-use";
import gsap from "gsap";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { motion } from "framer-motion";


const mobileMenuVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: { x: "0%", opacity: 1 },
    transition: {
        duration: 0.3,
        ease: "easeOut",
    },
};

const navItems = ["Home", "Features", "Story", "About", "Contact"];

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navContainerRef = useRef(null);
    const menuRef = useRef(null);

    const { y: currentScrollY } = useWindowScroll();

    const [isNavVisible, setIsNavVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        if (currentScrollY === 0) {
            // Topmost position: show navbar without floating-nav
            setIsNavVisible(true);
            navContainerRef.current.classList.remove("floating-nav");
        } else if (currentScrollY > lastScrollY) {
            // Scrolling down: hide navbar and apply floating-nav
            setIsNavVisible(false);
            navContainerRef.current.classList.add("floating-nav");
        } else if (currentScrollY < lastScrollY) {
            // Scrolling up: show navbar with floating-nav
            setIsNavVisible(true);
            navContainerRef.current.classList.add("floating-nav");
        }

        setLastScrollY(currentScrollY);
    }, [currentScrollY, lastScrollY]);

    useEffect(() => {
        gsap.to(navContainerRef.current, {
            y: isNavVisible ? 0 : -100,
            opacity: isNavVisible ? 1 : 0,
            duration: 0.2,
        });
    }, [isNavVisible]);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div
            ref={navContainerRef}
            className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
        >
            <header className="absolute top-1/2 w-full -translate-y-1/2">
                <nav className="flex size-full items-center justify-between p-4">
                    {/* Logo and Product button */}
                    <div className="flex items-center gap-7">
                        <img src="/img/logo.png" alt="logo" className="w-10" />

                        <Button
                            id="product-button"
                            title="Products"
                            rightIcon={<TiLocationArrow />}
                            containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
                        />
                    </div>

                    {/* Navigation Links and Audio Button */}
                    <div className="flex h-full items-center">
                        <div className="hidden md:block">
                            {navItems.map((item, index) => (
                                <a
                                    key={index}
                                    href={`#${item.toLowerCase()}`}
                                    className="nav-hover-btn"
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* BURGER MOBILE */}
                    <div
                        className="sm:hidden text-gray-200 text-3xl cursor-pointer z-50"
                        onClick={toggleMenu}
                    >
                        {isOpen ? (
                            <HiOutlineX className="w-[40px] h-[40px]" />
                        ) : (
                            <HiOutlineMenuAlt3 className="w-[40px] h-[40px]" />
                        )}
                    </div>
                </nav>

                {/* MOBILE - MENU */}
                <div>
                    {isOpen && (
                        <motion.div
                            variants={mobileMenuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            ref={menuRef}
                            className="fixed top-[65px] right-0 w-1/2 h-auto py-5 pr-8 mt-2 rounded-2xl lg:hidden 
                                    flex flex-col items-center gap-8 border-b border-[#7042f861]
                                    bg-gradient-to-b from-[#030014cc] to-[#0f0f2dcc] backdrop-blur-3xl"
                        >
                            {navItems.map((item, index) => (
                                <a
                                    key={index}
                                    onClick={toggleMenu}
                                    href={`#${item.toLowerCase()}`}
                                    className="nav-hover-btn"
                                >
                                    {item}
                                </a>
                            ))}
                        </motion.div>
                    )}
                </div>
            </header>
        </div>
    );
};

export default NavBar;

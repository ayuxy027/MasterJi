import React, { useRef } from "react";

const Navbar: React.FC = () => {
    const menuRef = useRef<HTMLElement>(null);

    const handleOpenMenu = () => {
        if (menuRef.current) {
            menuRef.current.classList.remove("max-md:w-0");
            menuRef.current.classList.add("max-md:w-full");
        }
    };

    const handleCloseMenu = () => {
        if (menuRef.current) {
            menuRef.current.classList.remove("max-md:w-full");
            menuRef.current.classList.add("max-md:w-0");
        }
    };

    return (
        <header className="flex items-center justify-between px-6 py-3 md:py-4 shadow-lg max-w-5xl rounded-full mx-auto w-full bg-white/80 backdrop-blur-md border border-orange-200/60">
            <a href="/" className="text-2xl font-bold text-orange-500">
                MasterJi
            </a>
            <nav
                ref={menuRef}
                id="menu"
                className="max-md:absolute max-md:top-0 max-md:left-0 max-md:overflow-hidden items-center justify-center max-md:h-full max-md:w-0 transition-[width] bg-white/80 backdrop-blur flex-col md:flex-row flex gap-8 text-orange-500 text-sm font-medium"
            >
                <a className="hover:text-orange-600" href="/products">
                    Products
                </a>
                <a className="hover:text-orange-600" href="/about">
                    About
                </a>
                <a className="hover:text-orange-600" href="/challenge">
                    Challenge
                </a>
                <a className="hover:text-orange-600" href="/docs">
                    Docs
                </a>
                <button
                    type="button"
                    id="closeMenu"
                    className="md:hidden text-orange-500"
                    aria-label="Close menu"
                    onClick={handleCloseMenu}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </nav>
            <div className="flex items-center space-x-4">
                <a
                    className="hidden md:flex bg-orange-400 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-orange-500 transition-shadow shadow-md"
                    href="/signup"
                >
                    Join Challenge
                </a>
                <button
                    type="button"
                    id="openMenu"
                    className="md:hidden text-orange-500"
                    aria-label="Open menu"
                    onClick={handleOpenMenu}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </header>
    );
};

export default Navbar;
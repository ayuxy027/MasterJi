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
                <a className="hover:text-orange-600 flex items-center gap-2" href="/chat">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                    AI Chat
                </a>
                <a className="hover:text-orange-600 flex items-center gap-2" href="/lmr">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    LMR Tools
                </a>
                <a className="hover:text-orange-600 flex items-center gap-2" href="/image-gen">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    Image Gen
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
                    href="/chat"
                >
                    Start Learning
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
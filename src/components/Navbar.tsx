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
                MasterG
            </a>
            <nav
                ref={menuRef}
                id="menu"
                className="max-md:absolute max-md:top-0 max-md:left-0 max-md:overflow-hidden items-center justify-center max-md:h-full max-md:w-0 transition-[width] bg-white/80 backdrop-blur flex-col md:flex-row flex gap-8 text-orange-500 text-sm font-medium"
            >
                <a className="hover:text-orange-600 flex items-center gap-2" href="/chat">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V2H8" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11v2" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h2" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 12h2" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 16a2 2 0 0 1-2 2H8.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 4 20.286V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 11v2" />
                    </svg>
                    Chat
                </a>
                <a className="hover:text-orange-600 flex items-center gap-2" href="/lmr">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    LMR
                </a>
                <a className="hover:text-orange-600 flex items-center gap-2" href="/weave">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13.44 4.442 17.082A2 2 0 0 0 4.982 21H19a2 2 0 0 0 .558-3.921l-1.115-.32A2 2 0 0 1 17 14.837V7.66"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 10.56 12.558-3.642A2 2 0 0 0 19.018 3H5a2 2 0 0 0-.558 3.921l1.115.32A2 2 0 0 1 7 9.163v7.178"></path>
                    </svg>
                    Weave
                </a>
                <a className="hover:text-orange-600 flex items-center gap-2" href="/board">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 6h4"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 10h4"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 14h4"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 18h4"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"></path>
                    </svg>
                    Whiteboard
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
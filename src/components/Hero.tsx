import { useState } from 'react';

const Avatar = ({ src, alt }: { src: string; alt: string }) => {
    const [imageError, setImageError] = useState(false);
    
    return (
        <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-300 to-orange-500 rounded-full opacity-50"></div>
            {imageError ? (
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-orange-300 to-orange-500 border-2 border-white shadow-md"></div>
            ) : (
                <img
                    src={src}
                    alt={alt}
                    className="relative w-10 h-10 rounded-full border-2 border-white shadow-md"
                    onError={() => setImageError(true)}
                />
            )}
        </div>
    );
};

const Herobox = () => {
    // Fallback gradient backgrounds for missing images
    const fallbackGradients = [
        "linear-gradient(135deg, #F97316 0%, #FB923C 50%, #FED7AA 100%)",
        "linear-gradient(135deg, #FB923C 0%, #F97316 50%, #EA580C 100%)",
    ];

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
        const parent = target.parentElement;
        if (parent) {
            parent.style.background = fallbackGradients[Math.floor(Math.random() * fallbackGradients.length)];
        }
    };

    return (
        <div className="bg-gradient-to-b from-white via-orange-50/30 to-white px-4 lg:px-20 py-12 relative">
            {/* Ambient background glow - reduced */}
            <div 
                className="absolute inset-0 opacity-30"
                style={{
                    background: 'radial-gradient(circle at center, rgba(251, 146, 60, 0.1) 0%, transparent 70%)'
                }}
            ></div>
            
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-8 items-stretch relative z-10">
                {/* Left Image */}
                <div className="md:col-span-2 relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-orange-300/15 to-transparent rounded-3xl opacity-40 group-hover:opacity-50 transition-opacity duration-500"></div>
                    <div className="relative h-full min-h-[400px] rounded-3xl overflow-hidden"
                         style={{
                             maskImage: 'radial-gradient(ellipse 80% 100% at center, black 60%, transparent 100%)',
                             WebkitMaskImage: 'radial-gradient(ellipse 80% 100% at center, black 60%, transparent 100%)',
                         }}>
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-400 to-orange-300 z-0"></div>
                        <img
                            src="https://images.unsplash.com/photo-1573894999291-f440466112cc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070"
                            alt="Indian Students Learning"
                            className="absolute inset-0 w-full h-full object-cover opacity-90 z-10"
                            onError={handleImageError}
                        />
                        {/* Faded edge overlays */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-l from-white/20 via-transparent to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10"></div>
                    </div>
                    {/* Orangish shadow glow - reduced */}
                    <div className="absolute -inset-1 bg-gradient-to-br from-orange-400/15 to-orange-600/10 rounded-3xl -z-10 opacity-50"></div>
                </div>

                {/* Center Cards */}
                <div className="md:col-span-2 flex flex-col gap-6">
                    {/* Top Card - Avatars + Text */}
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-300/25 via-orange-400/20 to-orange-500/15 rounded-3xl opacity-40 group-hover:opacity-50 transition-opacity duration-500"></div>
                        <div className="relative bg-gradient-to-br from-orange-50 via-orange-100/90 to-orange-50 rounded-3xl p-6 flex flex-col justify-center h-full border border-orange-200/50 shadow-lg"
                             style={{
                                 maskImage: 'radial-gradient(ellipse 90% 90% at center, black 70%, transparent 100%)',
                                 WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at center, black 70%, transparent 100%)',
                             }}>
                            <div className="flex mb-4 -space-x-3">
                                {[
                                    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=faces&q=80",
                                    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=faces&q=80",
                                    "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=100&h=100&fit=crop&crop=faces&q=80",
                                    "https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=100&h=100&fit=crop&crop=faces&q=80",
                                ].map((src, idx) => (
                                    <Avatar key={idx} src={src} alt="Indian Teacher Avatar" />
                                ))}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 leading-relaxed">
                                Transform Your Study <br /> Materials with AI
                            </h3>
                            <a href="/lmr" className="mt-3 inline-block bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-700 transition-all">
                                Try LMR Tools →
                            </a>
                        </div>
                    </div>

                    {/* Bottom Card - Quote */}
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-br from-orange-400/30 via-orange-500/25 to-orange-600/20 rounded-3xl opacity-40 group-hover:opacity-50 transition-opacity duration-500"></div>
                        <div className="relative bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-3xl p-6 px-10 flex flex-col justify-center h-full border border-orange-300/30 shadow-xl"
                             style={{
                                 maskImage: 'radial-gradient(ellipse 90% 90% at center, black 70%, transparent 100%)',
                                 WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at center, black 70%, transparent 100%)',
                             }}>
                            <p className="text-xl font-semibold text-white leading-relaxed drop-shadow-sm">
                                Create Stunning <br />
                                AI-Powered Presentations
                            </p>
                            <a href="/weave" className="mt-3 inline-block bg-white text-orange-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-50 transition-all">
                                Try Weave →
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right Image */}
                <div className="md:col-span-2 relative group">
                    <div className="absolute inset-0 bg-gradient-to-bl from-orange-400/20 via-orange-300/15 to-transparent rounded-3xl opacity-40 group-hover:opacity-50 transition-opacity duration-500"></div>
                    <div className="relative h-full min-h-[400px] rounded-3xl overflow-hidden"
                         style={{
                             maskImage: 'radial-gradient(ellipse 80% 100% at center, black 60%, transparent 100%)',
                             WebkitMaskImage: 'radial-gradient(ellipse 80% 100% at center, black 60%, transparent 100%)',
                         }}>
                        <div className="absolute inset-0 bg-gradient-to-bl from-orange-500 via-orange-400 to-orange-300 z-0"></div>
                        <img
                            src="https://images.unsplash.com/photo-1597743622436-c6b5661731e0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGluZGlhbiUyMGNsYXNzcm9vbXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900"
                            alt="Indian Classroom"
                            className="absolute inset-0 w-full h-full object-cover opacity-90 z-10"
                            onError={handleImageError}
                        />
                        {/* Faded edge overlays */}
                        <div className="absolute inset-0 bg-gradient-to-l from-white/20 via-transparent to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10"></div>
                    </div>
                    {/* Orangish shadow glow - reduced */}
                    <div className="absolute -inset-1 bg-gradient-to-bl from-orange-400/15 to-orange-600/10 rounded-3xl -z-10 opacity-50"></div>
                </div>
            </div>
        </div>
    );
};

const Landing = () => {

    return (
        <div className="py-5">
            <div className="px-4 sm:px-6 lg:px-8 relative overflow-hidden flex justify-center items-start md:items-center">

                <div className="max-w-7xl my-2 mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-16 relative z-10">
                        <span className="inline-flex items-center justify-center gap-2 mb-4 px-4 py-2 border-2 text-white border-orange-400 bg-orange-400 rounded-full text-[12px] md:text-sm font-medium">
                            <svg className="text-sm md:text-base w-3 h-3" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 1L10.5 5.5L15.5 6L11.5 9.5L12.5 14.5L8 11.5L3.5 14.5L4.5 9.5L0.5 6L5.5 5.5L8 1Z" />
                            </svg>
                            <svg className="text-sm md:text-base w-3 h-3 -mx-0.5" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 1L10.5 5.5L15.5 6L11.5 9.5L12.5 14.5L8 11.5L3.5 14.5L4.5 9.5L0.5 6L5.5 5.5L8 1Z" />
                            </svg>
                            <svg className="text-sm md:text-base w-3 h-3" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 1L10.5 5.5L15.5 6L11.5 9.5L12.5 14.5L8 11.5L3.5 14.5L4.5 9.5L0.5 6L5.5 5.5L8 1Z" />
                            </svg>
                            <span>|</span>
                            <span>Trusted by 500+ students</span>
                        </span>

                        <h1 className="text-4xl md:text-7xl tracking-tight  font-semibold text-orange-400 mb-2">
                            Your Personlised  <br />
                            <span className="inline-flex items-center align-middle">
                                <span className="inline-flex items-center justify-center border-2 border-orange-400 rounded-full px-4 py-2 md:px-6 md:py-3 transform -rotate-6 origin-center mr-3">
                                    <svg className="text-lg md:text-3xl text-orange-400 w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 4c-2.2 0-4 1.8-4 4v16c0 2.2 1.8 4 4 4h16c2.2 0 4-1.8 4-4V8c0-2.2-1.8-4-4-4H8z" />
                                        <path d="M8 12h16m-16 4h12m-12 4h8" />
                                        <circle cx="24" cy="24" r="4.5" />
                                        <path d="M24 22v4m-2-2h4" strokeWidth="1.2" />
                                    </svg>
                                </span>
                                <span 
                                    className="text-orange-400 font-semibold"
                                    style={{
                                        WebkitTextStroke: '2px #FB923C',
                                        WebkitTextFillColor: 'transparent',
                                        textStroke: '2px #FB923C',
                                        color: 'transparent',
                                        paintOrder: 'stroke fill'
                                    }}
                                >
                                    Lightweight
                                </span>
                                <span className="inline-flex items-center mx-3 align-middle">
                                    <span className="inline-flex items-center justify-center border-2 border-orange-400 rounded-full px-4 py-2 md:px-6 md:py-3 transform rotate-6 origin-center">
                                        <svg className="text-lg md:text-3xl text-orange-400 w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 4c-2.2 0-4 1.8-4 4v16c0 2.2 1.8 4 4 4h16c2.2 0 4-1.8 4-4V8c0-2.2-1.8-4-4-4H8z" />
                                            <path d="M8 12h16m-16 4h12m-12 4h8" />
                                            <circle cx="24" cy="24" r="4.5" />
                                            <path d="M24 22v4m-2-2h4" strokeWidth="1.2" />
                                        </svg>
                                    </span>
                                </span>
                            </span>
                            <br /> Growth Companion
                        </h1>

                        <p className="text-gray-800 text-sm md:text-xl max-w-[80%] mt-4 mx-auto px-10 mb-8 leading-relaxed">
                            Experience best in class Modern, lightweight, and AI enabled Learning Experience with MasterG.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-row gap-4 justify-center items-center">
                            <button className="bg-orange-400 flex items-center gap-x-2 text-white border-2 border-orange-400 font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300">
                                Start Learning
                            </button>
                            <button className="border-2 border-orange-400 text-orange-400 hover:bg-orange-100 hover:text-gray-800 font-semibold px-8 py-3 rounded-lg transition-all duration-300">
                                Learn More
                            </button>
                        </div>
                    </div>

                </div>
            </div>
            <Herobox />
        </div>
    );
};

export default Landing;

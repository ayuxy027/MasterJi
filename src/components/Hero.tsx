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
        <div className="bg-white px-4 lg:px-20 py-16">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-6 items-stretch">
                {/* Left Image */}
                <div className="md:col-span-2 relative group">
                    <div className="relative h-full min-h-[400px] rounded-xl overflow-hidden border-2 border-orange-400/20 hover:border-orange-400/40 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-400 to-orange-300 z-0"></div>
                        <img
                            src="https://images.unsplash.com/photo-1573894999291-f440466112cc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070"
                            alt="Indian Students Learning"
                            className="absolute inset-0 w-full h-full object-cover z-10"
                            onError={handleImageError}
                        />
                    </div>
                </div>

                {/* Center Cards */}
                <div className="md:col-span-2 flex flex-col gap-6">
                    {/* Top Card - LMR */}
                    <div className="relative bg-white border-2 border-orange-400 rounded-xl p-6 flex flex-col justify-center h-full hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center mb-4 gap-3">
                            <div className="flex -space-x-3">
                                {[
                                    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=faces&q=80",
                                    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=faces&q=80",
                                    "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=100&h=100&fit=crop&crop=faces&q=80",
                                    "https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=100&h=100&fit=crop&crop=faces&q=80",
                                ].map((src, idx) => (
                                    <Avatar key={idx} src={src} alt="Indian Teacher Avatar" />
                                ))}
                            </div>
                            <p className="text-sm text-gray-600 font-medium">
                                and 500+ more Users!
                            </p>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 leading-relaxed mb-3">
                            Transform Your Study <br /> Materials with AI
                        </h3>
                        <a href="/lmr" className="inline-block bg-orange-400 text-white border-2 border-orange-400 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 w-fit">
                            Try LMR Tools →
                        </a>
                    </div>

                    {/* Bottom Card - Weave */}
                    <div className="relative bg-orange-400 border-2 border-orange-400 rounded-xl p-6 px-8 flex flex-col justify-center h-full hover:shadow-lg transition-all duration-300">
                        <p className="text-xl font-semibold text-white leading-relaxed mb-3">
                            Create Stunning <br />
                            AI-Powered Presentations
                        </p>
                        <a href="/weave" className="inline-block bg-white text-orange-400 border-2 border-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-orange-50 hover:text-orange-500 transition-all duration-300 w-fit">
                            Try Weave →
                        </a>
                    </div>
                </div>

                {/* Right Image */}
                <div className="md:col-span-2 relative group">
                    <div className="relative h-full min-h-[400px] rounded-xl overflow-hidden border-2 border-orange-400/20 hover:border-orange-400/40 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-bl from-orange-500 via-orange-400 to-orange-300 z-0"></div>
                        <img
                            src="https://images.unsplash.com/photo-1597743622436-c6b5661731e0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGluZGlhbiUyMGNsYXNzcm9vbXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900"
                            alt="Indian Classroom"
                            className="absolute inset-0 w-full h-full object-cover z-10"
                            onError={handleImageError}
                        />
                    </div>
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
                                        WebkitTextStroke: '2.75px #FB923C',
                                        WebkitTextFillColor: 'transparent',
                                        textStroke: '2.75px #FB923C',
                                        color: 'transparent',
                                        paintOrder: 'stroke fill'
                                    }}
                                >
                                    Lightweight
                                </span>
                                <span className="inline-flex items-center mx-3 align-middle">
                                    <span className="inline-flex items-center justify-center border-2 border-orange-400 rounded-full px-4 py-2 md:px-6 md:py-3 transform rotate-6 origin-center">
                                        <svg className="text-lg md:text-3xl text-orange-400 w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16 6.67a4 4 0 1 0-7.996.167 5.33 5.33 0 0 0-3.368 7.693 5.33 5.33 0 0 0 .741 8.784A5.33 5.33 0 1 0 16 24Z"/>
                                            <path d="M12 17.33a6 6 0 0 0 4-5.33"/>
                                            <path d="M8.004 6.833a4 4 0 0 0 .531 1.833"/>
                                            <path d="M4.636 14.528a5.33 5.33 0 0 1 .78-.528"/>
                                            <path d="M8 24a5.33 5.33 0 0 1-2.623-.688"/>
                                            <path d="M16 17.33h5.33"/>
                                            <path d="M16 24h8a2.67 2.67 0 0 1 2.67 2.67v1.33"/>
                                            <path d="M16 10.67h10.67"/>
                                            <path d="M21.33 10.67V6.67a2.67 2.67 0 0 1 2.67-2.67"/>
                                            <circle cx="21.33" cy="17.33" r=".67"/>
                                            <circle cx="24" cy="4" r=".67"/>
                                            <circle cx="26.67" cy="28" r=".67"/>
                                            <circle cx="26.67" cy="10.67" r=".67"/>
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

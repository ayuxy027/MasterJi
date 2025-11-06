
const Herobox = () => {
    return (
        <div className="bg-white px-4 lg:px-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-6 items-stretch">
                {/* Left Image */}
                <div className="md:col-span-2 relative rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://trainingindustry.com/content/uploads/2021/07/8.10.21_Content_Dev_1182967367.jpg"
                            alt="Teaching Session"
                            className="w-full h-full object-cover rounded-2xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-800 to-transparent"></div>
                    </div>
                </div>
                {/* Center Cards */}
                <div className="md:col-span-2 flex flex-col gap-6">
                    {/* Top Card - Avatars + Text */}
                    <div className="bg-orange-100 rounded-2xl p-6 shadow-md flex flex-col justify-center h-full">
                        <div className="flex mb-4 -space-x-3">
                            {[
                                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqkUYrITWyI8OhPNDHoCDUjGjhg8w10_HRqg&s",
                                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwQQTS4NPqnCGbJPd4x7O_YJNOJ5gH6KkejH3nhVfIhxwwJPHEotjPs0VCpGg-UcybvxM&usqp=CAU",
                                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxapDwCeVLL0T69nhwV_BgqH9lztNDYQGcCbUVKHMgITKzGDlPsa55HS-6dqUdC8Qt5VU&usqp=CAU",
                                "https://www.pathways.health/wp-content/uploads/2023/08/circle-profile-picgfdgaf.jpg",
                            ].map((src, idx) => (
                                <img
                                    key={idx}
                                    src={src}
                                    alt="Avatar"
                                    className="w-10 h-10 rounded-full border-2 border-white"
                                />
                            ))}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">
                            We have 40+ <br /> Professional Teachers
                        </h3>
                    </div>

                    {/* Bottom Card - Quote */}
                    <div className="bg-orange-400 rounded-2xl p-6 px-10 shadow-md flex flex-col justify-center h-full">
                        <p className="text-xl font-semibold text-gray-100 leading-relaxed">
                            “Believe in yourself, <br />
                            keep learning, and success will follow.”
                        </p>
                        <div className="mt-4">
                            <p className="font-semibold text-gray-100">Anon</p>
                        </div>
                    </div>
                </div>

                {/* Right Image */}
                <div className="md:col-span-2">
                    <img
                        src="https://media.istockphoto.com/id/1438634414/photo/business-women-laptop-and-and-happy-team-in-office-for-web-design-collaboration-and-training.jpg?s=612x612&w=0&k=20&c=8e5Wj1tvb4thQCJixGcDRztDtvmuw8x0sO1Fvx8SKyI="
                        alt="Student Learning"
                        className="w-full h-full object-cover rounded-2xl"
                    />
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
                            Your Personlised  <br /> Lightweight
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

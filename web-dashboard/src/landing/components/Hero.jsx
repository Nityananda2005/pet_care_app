import { ArrowRight, Play } from 'lucide-react';

// Change this URL to point to your main web application (frontend) deployment.
const WEB_APP_URL = import.meta.env.VITE_WEB_APP_URL || 'http://localhost:5173';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-linear-to-b from-[#E6FDFB]/40 to-white">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-[#00D1C1]/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 text-left space-y-8 animate-in slide-in-from-left duration-700">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-[#00D1C1]/20 shadow-sm">
               <span className="w-2 h-2 bg-[#00D1C1] rounded-full animate-pulse"></span>
               <span className="text-[11px] font-bold text-[#00A99D] uppercase tracking-wider">New Feature: Location management enabled</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.1]">
              <span className="block mb-2">PetCare+</span>
              <span className="bg-linear-to-r from-[#00D1C1] to-[#008C8C] bg-clip-text text-transparent">Service Dashboard</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed max-w-xl">
              The all-in-one operating system for the pet industry. Manage veterinary clinics, animal shelters, and pet store services in one secure, high-performance platform.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => (window.location.href = WEB_APP_URL)}
                className="w-full sm:w-auto px-8 py-4 bg-[#00D1C1] hover:bg-[#00B8A9] text-white font-extrabold rounded-2xl shadow-xl shadow-[#00D1C1]/25 flex items-center justify-center gap-2 transition-all"
              >
                Open Web App
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4 pt-4">
               <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <img 
                      key={i}
                      src={`https://i.pravatar.cc/100?u=${i + 10}`} 
                      className="w-10 h-10 rounded-full border-2 border-white object-cover" 
                      alt="User"
                    />
                  ))}
               </div>
               <p className="text-sm font-bold text-gray-400">
                  Joined by <span className="text-gray-900">2,500+</span> industry professionals this month
               </p>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="w-full lg:w-1/2 relative animate-in zoom-in duration-1000">
             <div className="relative z-10 bg-white rounded-[40px] shadow-2xl shadow-[#00D1C1]/10 border border-gray-100 p-4 transform lg:rotate-2">
                <img 
                  src="https://tse1.explicit.bing.net/th/id/OIP.Tg57YTomLFI_RTwKN42FewHaEo?rs=1&pid=ImgDetMain&o=7&rm=3"
                  className="w-full h-auto rounded-[32px] object-cover" 
                  alt="Dashboard Mockup"
                />
                
                {/* Overlay Elements */}
                <div className="absolute -left-10 bottom-16 bg-white p-6 rounded-3xl shadow-xl border border-gray-50 hidden md:block animate-bounce-slow">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#E6FDFB] rounded-2xl flex items-center justify-center text-[#00D1C1]">
                         <Play size={20} fill="currentColor" />
                      </div>
                      <div>
                         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Clinic Live</p>
                         <p className="text-sm font-black text-gray-900">Performance Tracking</p>
                      </div>
                   </div>
                </div>
             </div>
             
             {/* Decorative Blobs */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-linear-to-br from-[#00D1C1]/10 via-transparent to-transparent rounded-full -z-10 blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

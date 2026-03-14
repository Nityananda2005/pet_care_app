import React from 'react';
import { 
  ShieldCheck, 
  Zap, 
  Users, 
  Cloud, 
  Calendar, 
  CheckCircle2, 
  BarChart3, 
  RefreshCcw,
  ArrowUpRight
} from 'lucide-react';

const Features = () => {
  const smallFeatures = [
    { title: "Smart Appointments", desc: "AI-driven scheduling with automated SMS reminders and multi-doctor calendar syncing.", icon: Calendar, color: "text-blue-500", bg: "bg-blue-50" },
    { title: "Adoption Tracking", desc: "End-to-end management of the pet journey from intake to happy forever-home placement.", icon: CheckCircle2, color: "text-[#00D1C1]", bg: "bg-[#E6FDFB]" },
    { title: "Inventory Sync", desc: "Real-time stock alerts and automated purchase orders for supplies and medications.", icon: RefreshCcw, color: "text-cyan-500", bg: "bg-cyan-50" },
    { title: "Analytics Suite", desc: "Custom reporting on revenue, occupancy rates, and clinic health performance metrics.", icon: BarChart3, color: "text-blue-400", bg: "bg-blue-50" }
  ];

  const mainSpecs = [
    { title: "HIPAA & GDPR Compliant", desc: "Enterprise-grade security for sensitive medical and owner data.", icon: ShieldCheck },
    { title: "Lighting Fast Performance", desc: "Built on a modern stack optimized for zero-lag operations.", icon: Zap },
    { title: "Unlimited Team Members", desc: "No per-user fees. Scale your workforce without scaling costs.", icon: Users },
    { title: "Cloud-Based Access", desc: "Manage your business from anywhere, on any device, at any time.", icon: Cloud }
  ];

  return (
    <section className="bg-white">
      {/* Small Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-[11px] font-black uppercase tracking-widest rounded-lg">CORE FEATURES</div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">Powerful Features for Growth</h2>
            <p className="text-gray-500 font-medium">Every tool we build is designed to eliminate administrative overhead and let you focus on what matters most: providing exceptional care.</p>
          </div>
          <button className="flex items-center gap-2 text-sm font-bold text-[#00D1C1] hover:text-[#00B8A9] transition-colors group">
            View all features
            <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {smallFeatures.map((f) => (
            <div key={f.title} className="p-8 bg-white border border-gray-100 rounded-[32px] hover:border-[#00D1C1]/20 hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-300">
               <div className={`w-12 h-12 ${f.bg} ${f.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <f.icon size={24} />
               </div>
               <h3 className="text-lg font-black text-gray-900 mb-2">{f.title}</h3>
               <p className="text-sm text-gray-400 font-medium leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Us Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-[#E6FDFB] rounded-[48px] overflow-hidden flex flex-col lg:flex-row items-stretch">
          <div className="flex-1 p-12 lg:p-20 space-y-10">
            <h2 className="text-4xl font-black text-gray-900 leading-tight">Why Industry Leaders Choose PetCare+</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {mainSpecs.map((spec) => (
                <div key={spec.title} className="space-y-3">
                   <div className="w-10 h-10 bg-[#00D1C1] text-white rounded-xl flex items-center justify-center shadow-lg shadow-[#00D1C1]/20">
                      <spec.icon size={20} />
                   </div>
                   <h4 className="text-base font-black text-gray-900">{spec.title}</h4>
                   <p className="text-xs text-[#008C8C] font-semibold leading-relaxed">{spec.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 min-h-[400px] relative">
             <img 
               src="https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800" 
               className="absolute inset-0 w-full h-full object-cover" 
               alt="Global Infrastructure"
             />
             <div className="absolute inset-0 bg-linear-to-r from-[#E6FDFB] to-transparent lg:block hidden"></div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-24 bg-[#00D1C1] relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
           <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Ready to Transform Your Pet Service?</h2>
           <p className="text-white/80 font-bold mb-10 max-w-xl mx-auto">Join thousands of clinics, shelters, and stores already using PetCare+ to deliver better care.</p>
           
           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-10 py-4 bg-white text-[#00D1C1] font-black rounded-2xl hover:bg-gray-50 transition-all shadow-xl">
                 Start 14-Day Free Trial
              </button>
              <button className="px-10 py-4 bg-[#00A99D] text-white font-black border border-white/20 rounded-2xl hover:bg-[#00968B] transition-all">
                 Talk to Sales
              </button>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Features;

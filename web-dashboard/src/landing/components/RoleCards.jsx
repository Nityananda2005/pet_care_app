import { Link } from 'react-router-dom';
import { Stethoscope, PawPrint, CalendarDays, ArrowRight } from 'lucide-react';

const RoleCards = () => {
  const roles = [
    {
      title: "Veterinary Clinic",
      description: "Full-suite clinical management including electronic health records, E-MAR, automated prescriptions, and diagnostic lab integrations.",
      icon: Stethoscope,
      color: "blue",
      btnText: "Vet Login",
      gradient: "from-blue-500 to-blue-600",
      lightColor: "bg-blue-50",
      iconColor: "text-blue-500",
      borderColor: "group-hover:border-blue-200"
    },
    {
      title: "Animal Shelter",
      description: "Streamlined adoption pipelines, intake management, foster coordination, and digital surrender applications in one portal.",
      icon: PawPrint,
      color: "cyan",
      btnText: "Shelter Login",
      gradient: "from-[#00D1C1] to-[#00B4B4]",
      lightColor: "bg-[#E6FDFB]",
      iconColor: "text-[#00D1C1]",
      borderColor: "group-hover:border-[#00D1C1]/30"
    },
    {
      title: "Pet Store",
      description: "Smart inventory tracking, POS integration, loyalty programs, and automated supplier monitoring for retail and grooming services.",
      icon: CalendarDays,
      color: "purple",
      btnText: "Store Login",
      gradient: "from-purple-500 to-purple-600",
      lightColor: "bg-purple-50",
      iconColor: "text-purple-500",
      borderColor: "group-hover:border-purple-200"
    }
  ];

  return (
    <section className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-16 space-y-4">
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Tailored for Your Mission</h2>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto">
            Select your organization type to experience specialized tools built for your specific workflow requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roles.map((role) => (
            <div 
              key={role.title}
              className="group bg-white p-10 rounded-[40px] border border-gray-100 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden"
            >
              <div className={`w-20 h-20 ${role.lightColor} ${role.iconColor} rounded-3xl flex items-center justify-center mb-8 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm`}>
                <role.icon size={36} strokeWidth={1.5} />
              </div>

              <h3 className="text-2xl font-black text-gray-900 mb-4">{role.title}</h3>
              <p className="text-sm font-medium text-gray-400 leading-relaxed mb-10 grow">
                {role.description}
              </p>

              <Link 
                to="/login"
                className={`w-full py-4 bg-linear-to-r ${role.gradient} text-white font-black rounded-2xl shadow-lg transform group-hover:-translate-y-1 transition-all flex items-center justify-center gap-2`}
              >
                {role.btnText}
                <ArrowRight size={18} />
              </Link>
              
              {/* Decorative accent */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${role.gradient} opacity-[0.03] rounded-bl-[100px] -z-10`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoleCards;

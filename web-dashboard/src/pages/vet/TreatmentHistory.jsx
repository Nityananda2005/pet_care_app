import React, { useState } from 'react';
import { 
  Search, 
  Download, 
  Plus, 
  Filter, 
  ArrowUpDown, 
  X, 
  Calendar, 
  User, 
  Activity, 
  FileText,
  Clock,
  ExternalLink,
  Save,
  ChevronRight,
  Stethoscope,
  ArrowUpRight,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

const TreatmentHistory = () => {
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stats = [
    { label: "Treatments This Month", value: "482", trend: "+12.5%", isUp: true },
    { label: "Active Prescriptions", value: "128", trend: "-4.3%", isUp: false },
  ];

  const records = [
    {
      id: "TR-1024",
      pet: { name: "Luna", breed: "Husky", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Luna" },
      condition: "Dermatitis",
      description: "Hypoallergenic diet + Topical ointment",
      notes: "Patient showing improvement in skin irritation. Continue treatment for 14 days.",
      date: "May 18, 2024",
      doctor: "Dr. Sarah Smith",
      doctorAvatar: "https://ui-avatars.com/api/?name=Sarah+Smith&background=E6F6F5&color=00A99D"
    },
    {
      id: "TR-1023",
      pet: { name: "Max", breed: "Beagle", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Max" },
      condition: "Ear Infection",
      description: "Cleaning + Otic Drops",
      notes: "Ear canal reduced inflammation. Keep dry for 7 days.",
      date: "May 17, 2024",
      doctor: "Dr. James Wilson",
      doctorAvatar: "https://ui-avatars.com/api/?name=James+Wilson&background=EBF3FF&color=4A90E2"
    },
    {
      id: "TR-1022",
      pet: { name: "Bella", breed: "Siamese", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bella" },
      condition: "Dental Tartar",
      description: "Professional Scaling",
      notes: "Successful cleaning. Advised daily brushing.",
      date: "May 17, 2024",
      doctor: "Dr. Sarah Smith",
      doctorAvatar: "https://ui-avatars.com/api/?name=Sarah+Smith&background=E6F6F5&color=00A99D"
    },
    {
      id: "TR-1021",
      pet: { name: "Charlie", breed: "Bulldog", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie" },
      condition: "Vaccination",
      description: "DHPP Booster",
      notes: "Routine vaccination. No adverse reaction observed.",
      date: "May 16, 2024",
      doctor: "Dr. Elena Rodriguez",
      doctorAvatar: "https://ui-avatars.com/api/?name=Elena+Rodriguez&background=FDEBF7&color=D026A0"
    },
    {
      id: "TR-1020",
      pet: { name: "Oliver", breed: "Poodle", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver" },
      condition: "Checkup",
      description: "Annual Exam",
      notes: "Weight stable. Heart sounds clear. Healthy.",
      date: "May 15, 2024",
      doctor: "Dr. Sarah Smith",
      doctorAvatar: "https://ui-avatars.com/api/?name=Sarah+Smith&background=E6F6F5&color=00A99D"
    }
  ];

  const openModal = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500 relative min-h-[calc(100vh-64px)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Treatment History</h1>
          <p className="text-gray-500 mt-1">Comprehensive log of all medical procedures and diagnostics administered.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-2">
            <Download size={18} className="text-gray-400" />
            Export CSV
          </button>
          <button className="px-5 py-2.5 rounded-xl bg-[#00A99D] text-sm font-semibold text-white hover:bg-[#008c82] transition-all shadow-lg shadow-[#00A99D]/20 flex items-center gap-2">
            <Plus size={18} />
            New Treatment Entry
          </button>
        </div>
      </div>

      {/* Stats and Search */}
      <div className="flex flex-col lg:flex-row gap-8 items-end lg:items-center">
        <div className="flex flex-1 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 flex-1 min-w-[200px] flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                <div className="flex items-center gap-3">
                   <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                   <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${stat.isUp ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'}`}>
                     {stat.trend}
                   </span>
                </div>
              </div>
              <div className={`p-4 rounded-2xl ${i === 0 ? 'bg-[#E6F6F5] text-[#00A99D]' : 'bg-blue-50 text-blue-500'}`}>
                {i === 0 ? <TrendingUp size={24} /> : <Activity size={24} />}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search treatments..." 
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-sm focus:border-[#00A99D] focus:ring-0 transition-all shadow-sm"
            />
          </div>
          <button className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-gray-600 shadow-sm transition-all">
            <Filter size={20} />
          </button>
          <button className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-gray-600 shadow-sm transition-all">
            <ArrowUpDown size={20} />
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[40px] border border-gray-100 overflow-hidden shadow-sm">
        <div className="p-8 border-b border-gray-50 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Historical Records</h2>
            <p className="text-xs text-gray-500 mt-1">View and manage treatments across all patients.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-5 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Pet Name</th>
                <th className="px-8 py-5 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Medical Reason</th>
                <th className="px-8 py-5 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Details</th>
                <th className="px-8 py-5 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Date</th>
                <th className="px-8 py-5 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Attending Vet</th>
                <th className="px-8 py-5 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {records.map((record) => (
                <tr 
                  key={record.id} 
                  onClick={() => openModal(record)}
                  className="hover:bg-[#fcfdfe] transition-all cursor-pointer group"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <img src={record.pet.avatar} alt="" className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100" />
                      <span className="text-sm font-bold text-gray-900 group-hover:text-[#00A99D] transition-colors">{record.pet.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                       <div className="p-1.5 bg-[#E6F6F5] rounded-lg text-[#00A99D]">
                         <Stethoscope size={14} />
                       </div>
                       <span className="text-sm font-bold text-gray-700">{record.condition}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-xs text-gray-500 truncate max-w-[200px]">{record.description}</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-bold text-gray-600">{record.date}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                       <img src={record.doctorAvatar} alt="" className="w-6 h-6 rounded-full" />
                       <span className="text-xs font-bold text-gray-700">{record.doctor}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <button className="p-2 text-gray-300 group-hover:text-[#00A99D] transition-colors">
                      <ChevronRight size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Credits */}
      <div className="text-center pt-8 pb-4">
        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[2px]">
          © 2024 PetCare+ Veterinary Management System. All rights reserved. Professional Edition v2.4.0
        </p>
      </div>

      {/* Modal Backdrop */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-300 px-10">
          <div 
            className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-8 pb-4 relative">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-all"
              >
                <X size={20} />
              </button>
              
              <div className="flex items-center gap-4">
                <img src={selectedRecord?.pet.avatar} alt="" className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100" />
                <div>
                  <h3 className="text-xl font-extrabold text-gray-900">Medical Notes: {selectedRecord?.pet.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[#00A99D] text-xs font-bold">{selectedRecord?.id}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-[#00A99D] text-xs font-bold">{selectedRecord?.condition}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-6">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Treatment Description</label>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 italic text-sm text-gray-500">
                  {selectedRecord?.description}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Clinical Progress Notes</label>
                <textarea 
                  className="w-full h-32 bg-white border border-gray-100 rounded-2xl p-4 text-sm text-gray-600 focus:border-[#00A99D] focus:ring-0 transition-all resize-none shadow-inner"
                  defaultValue={selectedRecord?.notes}
                />
              </div>

              <div className="grid grid-cols-2 gap-8 pt-4">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Attending Vet</p>
                  <p className="text-sm font-bold text-gray-800">{selectedRecord?.doctor}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Date Recorded</p>
                  <p className="text-sm font-bold text-gray-800">2024-05-18</p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-8 pt-4 bg-gray-50/50 flex gap-4">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3 text-sm font-bold text-gray-500 hover:bg-gray-100 rounded-2xl transition-all border border-gray-200"
              >
                Close View
              </button>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3 text-sm font-bold text-white bg-[#00A99D] hover:bg-[#008c82] rounded-2xl transition-all shadow-lg shadow-[#00A99D]/20 flex items-center justify-center gap-2"
              >
                <Save size={18} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TreatmentHistory;

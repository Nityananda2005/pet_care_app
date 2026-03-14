import React, { useState, useEffect } from 'react';
import {
  Plus,
  FileText,
  Calendar,
  Download,
  ArrowUpRight,
  Heart,
  Clock,
  MoreHorizontal,
  ChevronRight,
  TrendingUp,
  LayoutGrid,
  PawPrint,
  ClipboardList,
  CheckCircle,
  Dog
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchShelterStats, fetchShelterAdoptionRequests } from '../../api';

const StatCard = ({ label, value, trend, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-[32px] border border-gray-100 flex-1 min-w-[200px] relative group hover:shadow-xl hover:shadow-gray-100 transition-all duration-300">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-4 rounded-2xl ${color} bg-opacity-10 ${color.replace('bg-', 'text-')}`}>
        <Icon size={24} />
      </div>
      <div className="flex items-center gap-1 text-[11px] font-bold text-gray-400 group-hover:text-gray-600 transition-colors">
        <ArrowUpRight size={14} className="text-green-500" />
        {trend}
      </div>
    </div>
    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">{label}</p>
    <h3 className="text-3xl font-extrabold text-gray-900">{value}</h3>
  </div>
);

const ShelterDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [statsData, setStatsData] = useState(null);
  const [activities, setActivities] = useState([]);
  const profile = JSON.parse(localStorage.getItem('profile') || '{}');
  const adminName = profile?.result?.name || 'Admin';

  useEffect(() => {
    const loadData = async () => {
      try {
        const [sRes, aRes] = await Promise.all([
          fetchShelterStats(),
          fetchShelterAdoptionRequests()
        ]);
        setStatsData(sRes.data);
        setActivities(aRes.data.requests || []);
      } catch (err) {
        console.error("Error loading shelter dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const stats = [
    { label: "Total Pets", value: statsData?.stats?.totalPets || "0", trend: "Shelter population", icon: Dog, color: "bg-blue-500" },
    { label: "Available", value: statsData?.stats?.availablePets || "0", trend: "Ready for home", icon: Heart, color: "bg-[#00D1C1]" },
    { label: "Active Requests", value: statsData?.stats?.totalRequests || "0", trend: "Total applicants", icon: ClipboardList, color: "bg-orange-500" },
    { label: "Adopted", value: statsData?.stats?.adoptedPets || "0", trend: "Success stories", icon: CheckCircle, color: "bg-purple-500" },
  ];



  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      {/* Welcome Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Welcome back, {adminName} 👋</h1>
          <p className="text-gray-500 text-sm font-medium italic">Here's what's happening at the shelter today.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00D1C1]"></div>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <StatCard key={idx} {...stat} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity Column */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm relative overflow-hidden">
                {/* Decorative Background Dots */}
                <div className="absolute top-8 left-8 flex gap-1.5 opacity-40">
                  {[1, 2, 3, 4, 5, 6].map((i) => <div key={i} className="w-1 h-1 rounded-full bg-gray-300"></div>)}
                </div>

                <div className="flex justify-between items-center mb-10">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-50 rounded-xl text-blue-500">
                      <Clock size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
                      <p className="text-xs text-gray-400 font-medium">Live updates from your adoption pipelines.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {activities.length > 0 ? activities.map((activity, i) => (
                    <div key={i} className="flex items-center justify-between p-2 hover:bg-gray-50/50 rounded-3xl transition-all group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#E6FDFB] flex items-center justify-center text-[#00D1C1] font-bold text-xl uppercase border border-gray-50">
                          {activity.pet?.name?.charAt(0) || 'P'}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <h4 className="font-bold text-gray-900 text-[15px]">{activity.pet?.name || 'Unknown Pet'}</h4>
                            <span className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-widest ${activity.status === 'pending' ? 'bg-orange-50 text-orange-500' : 'bg-[#E6FDFB] text-[#00D1C1]'}`}>
                              {activity.status}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 font-medium">Request by {activity.user?.name || 'Customer'}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-gray-800 mb-0.5">{activity.status === 'pending' ? 'In Review' : 'Processed'}</p>
                        <p className="text-[10px] text-gray-400 font-medium flex items-center justify-end gap-1">
                          <Clock size={10} />
                          {activity.createdAt ? new Date(activity.createdAt).toLocaleDateString() : 'Just now'}
                        </p>
                      </div>
                    </div>
                  )) : (
                    <p className="text-center text-gray-500 py-10">No recent activity found.</p>
                  )}
                </div>
              </div>

              {/* Event Promo Card */}
              <div className="bg-[#EBFBFA] p-10 rounded-[40px] relative overflow-hidden flex flex-col items-start gap-6 border border-[#00D1C1]/10 group">
                {/* Abstract Shape Overlay */}
                <div className="absolute top-0 right-0 p-10 opacity-[0.08] transform translate-x-12 -translate-y-12">
                  <div className="grid grid-cols-4 gap-4">
                    {[...Array(16)].map((_, i) => (
                      <div key={i} className={`w-8 h-8 rounded-full bg-[#00D1C1] ${i % 3 === 0 ? 'opacity-40' : 'opacity-100'}`}></div>
                    ))}
                  </div>
                </div>

                <div className="relative z-10 max-w-md">
                  <h3 className="text-2xl font-extrabold text-[#008C82] mb-3 leading-tight">Ready for the Weekend Adoption Event?</h3>
                  <p className="text-[#008C82]/70 text-sm font-medium leading-relaxed">
                    Don't forget to update the medical files for the upcoming meet-and-greet sessions this Saturday.
                  </p>
                </div>
                <button className="relative z-10 px-8 py-3 bg-[#00D1C1] text-white rounded-2xl font-bold text-sm shadow-xl shadow-[#00D1C1]/20 hover:scale-105 active:scale-95 transition-all">
                  Prepare Event List
                </button>
              </div>
            </div>

            {/* Sidebar Widgets Column */}
            <div className="space-y-8">
              {/* Quick Actions Grid */}
              <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 mb-6">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Plus, label: "Add Pet", color: "text-[#00D1C1]", onClick: () => navigate('/shelter/add-pet') },
                    { icon: FileText, label: "New Request", color: "text-blue-500" },
                    { icon: Calendar, label: "Visits", color: "text-purple-500" },
                    { icon: Download, label: "Export", color: "text-gray-500" }
                  ].map((action, i) => (
                    <button
                      key={i}
                      onClick={action.onClick}
                      className="flex flex-col items-center justify-center gap-3 p-5 rounded-3xl border border-gray-50 hover:bg-gray-50 hover:border-gray-100 transition-all group"
                    >
                      <div className={`p-2 rounded-xl bg-gray-50 group-hover:bg-white ${action.color}`}>
                        <action.icon size={20} />
                      </div>
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Species Breakdown Donut Chart */}
              <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 mb-2">Species Breakdown</h3>
                <p className="text-[11px] text-gray-400 font-medium mb-8">Current shelter population by type.</p>

                <div className="relative w-48 h-48 mx-auto mb-8">
                  {/* SVG Donut Chart */}
                  <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                    <path
                      className="text-[#00D1C1]"
                      strokeDasharray="45, 100"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDashoffset="0"
                    />
                    <path
                      className="text-blue-500"
                      strokeDasharray="25, 100"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDashoffset="-45"
                    />
                    <path
                      className="text-black"
                      strokeDasharray="15, 100"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDashoffset="-70"
                    />
                    <path
                      className="text-gray-200"
                      strokeDasharray="15, 100"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDashoffset="-85"
                    />
                  </svg>
                  {/* Center Circle for Sleek Look */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-white rounded-full"></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                  {[
                    { label: "Dogs", color: "bg-[#00D1C1]" },
                    { label: "Cats", color: "bg-blue-500" },
                    { label: "Rabbits", color: "bg-gray-400" },
                    { label: "Birds", color: "bg-gray-200" }
                  ].map((specie, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${specie.color}`}></div>
                      <span className="text-[10px] font-bold text-gray-500 tracking-wider transition-colors">{specie.label}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-[#E6FDFB] text-[#00D1C1] rounded-lg">
                      <TrendingUp size={14} />
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Most Rescued</span>
                  </div>
                  <span className="text-xs font-extrabold text-gray-900">Dogs (45%)</span>
                </div>
                <div className="w-full h-1.5 bg-gray-50 rounded-full mt-3 overflow-hidden">
                  <div className="w-[45%] h-full bg-[#00D1C1]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center pt-8 pb-4">
            <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[2px] mb-4">
              © 2024 PetCare+ Shelter Management. All paws on deck.
            </p>
            <div className="flex justify-center gap-6 text-[10px] font-bold text-gray-400">
              <button className="hover:text-[#00D1C1]">Support</button>
              <button className="hover:text-[#00D1C1]">Privacy Policy</button>
              <button className="hover:text-[#00D1C1]">Documentation</button>
            </div>
          </div>
        </>
      )}
    </div >
  );
};

export default ShelterDashboard;

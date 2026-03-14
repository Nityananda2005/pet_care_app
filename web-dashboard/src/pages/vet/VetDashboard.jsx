import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Users,
  Activity,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  MoreVertical,
  Plus,
  Clock,
  ExternalLink
} from 'lucide-react';
import { fetchVetStats, fetchVetAppointments } from '../../api';

const StatCard = ({ icon: Icon, label, value, trend, trendValue, color }) => (
  <div className="bg-white p-6 rounded-3xl border border-gray-100 flex-1 min-w-[200px]">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${color === 'red' ? 'bg-red-50' : 'bg-[#E6F6F5]'}`}>
        <Icon size={24} className={color === 'red' ? 'text-red-500' : 'text-[#00A99D]'} />
      </div>
      <div className={`flex items-center gap-1 text-[11px] font-bold ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
        {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {trendValue}
      </div>
    </div>
    <p className="text-gray-500 text-xs font-medium mb-1">{label}</p>
    <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
  </div>
);

const VetDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [statsData, setStatsData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const profile = JSON.parse(localStorage.getItem('profile') || '{}');
  const doctorName = profile?.result?.name || 'Doctor';

  useEffect(() => {
    const loadData = async () => {
      try {
        const [sRes, aRes] = await Promise.all([
          fetchVetStats(),
          fetchVetAppointments()
        ]);
        setStatsData(sRes.data.stats || {});
        setAppointments(aRes.data.appointments || []);
      } catch (err) {
        console.error("Error loading vet dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const todayAppointmentsCount = appointments.filter((apt) => {
    if (!apt.date) return false;
    const aptDate = new Date(apt.date);
    const today = new Date();
    return aptDate.toDateString() === today.toDateString();
  }).length;

  const stats = [
    { icon: Calendar, label: "Today's Appointments", value: todayAppointmentsCount || statsData?.totalAppointments || "0", trend: "up", trendValue: "+4.5%" },
    { icon: Users, label: "Total Treated Pets", value: statsData?.uniquePatients || "0", trend: "up", trendValue: "+12%" },
    { icon: Activity, label: "Pending Records", value: statsData?.pendingAppointments || "0", trend: "up", trendValue: "+2%" },
    { icon: AlertCircle, label: "Emergency Cases", value: "0", trend: "down", trendValue: "0%", color: 'red' },
  ];


  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, Dr. {doctorName.split(' ')[0]}! 👋</h1>
          <p className="text-gray-500 mt-1">
            You have <span className="text-[#00A99D] font-bold underline decoration-2 underline-offset-4">{appointments.length} appointments</span> scheduled.
          </p>
        </div>
        <div className="flex gap-4">
          <button className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-2">
            <Calendar size={18} className="text-[#00A99D]" />
            Full Schedule
          </button>
          <button className="px-5 py-2.5 rounded-xl bg-[#00A99D] text-sm font-semibold text-white hover:bg-[#008c82] transition-all shadow-lg shadow-[#00A99D]/20 flex items-center gap-2">
            <Plus size={18} />
            Add Treatment
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00A99D]"></div>
        </div>
      ) : (
        <>


          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <StatCard key={idx} {...stat} />
            ))}
          </div>

          {/* Main Content Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Performance Chart Section */}
            <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-gray-100">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Clinic Performance</h2>
                  <p className="text-xs text-gray-500 mt-1">Patient volume vs Recovery rate over the last 7 days</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#00A99D]"></div>
                    <span className="text-[10px] uppercase font-bold text-gray-400">Volume</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#1e40af]"></div>
                    <span className="text-[10px] uppercase font-bold text-gray-400">Recovery</span>
                  </div>
                </div>
              </div>

              {/* Custom SVG Chart (Mockup of the design) */}
              <div className="h-64 w-full relative group">
                <svg viewBox="0 0 800 240" className="w-full h-full drop-shadow-sm">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00A99D" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#00A99D" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* Grid Lines */}
                  {[0, 25, 50, 75, 100].map((val, i) => (
                    <g key={i}>
                      <line x1="0" y1={240 - (val * 2.4)} x2="800" y2={240 - (val * 2.4)} stroke="#f1f5f9" strokeWidth="1" />
                      <text x="-10" y={245 - (val * 2.4)} className="text-[10px] fill-gray-400" textAnchor="end">{val}</text>
                    </g>
                  ))}
                  {/* Area Path */}
                  <path
                    d="M0,150 Q100,120 200,130 T400,110 T600,105 T800,90 L800,240 L0,240 Z"
                    fill="url(#chartGradient)"
                  />
                  {/* Line Path */}
                  <path
                    d="M0,150 Q100,120 200,130 T400,110 T600,105 T800,90"
                    fill="none"
                    stroke="#00A99D"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  {/* Second Blue Line */}
                  <path
                    d="M0,200 Q150,180 300,210 T500,195 T800,220"
                    fill="none"
                    stroke="#00A99D"
                    strokeWidth="3"
                    strokeDasharray="1,6"
                    strokeLinecap="round"
                    opacity="1"
                  />
                </svg>
                <div className="flex justify-between mt-4 px-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <span key={day} className="text-[10px] font-bold text-gray-400">{day}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar Components */}
            <div className="space-y-6">
              {/* Quick Search Card */}
              <div className="bg-[#00A99D] p-6 rounded-[32px] text-white overflow-hidden relative group">
                {/* Decorative hearts pattern */}
                <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform">
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>

                <h3 className="text-xl font-bold mb-2">Quick Patient Search</h3>
                <p className="text-white/80 text-sm mb-6">Find medical history instantly</p>

                <button className="w-full bg-white text-[#00A99D] py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition-all shadow-xl shadow-black/10">
                  <Users size={18} />
                  View All Patients
                </button>

                <div className="flex gap-1 mt-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-white opacity-40"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-white opacity-80"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-white opacity-40"></div>
                </div>
              </div>

              {/* Recent Activities */}
              <div className="bg-white p-7 rounded-[32px] border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-gray-900">Recent Activities</h3>
                  <button className="text-[#00A99D] text-xs font-bold hover:underline">See all</button>
                </div>

                <div className="space-y-6">
                  {[
                    { icon: Activity, text: "Prescription renewed for \"Max\"", time: "2 mins ago", color: "text-blue-500" },
                    { icon: AlertCircle, text: "Emergency surgery scheduled", time: "1 hour ago", color: "text-red-500" },
                    { icon: Clock, text: "New vaccination record: \"Luna\"", time: "3 hours ago", color: "text-[#00A99D]" }
                  ].map((activity, i) => (
                    <div key={i} className="flex gap-4">
                      <div className={`mt-1 ${activity.color}`}>
                        <activity.icon size={16} />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-800">{activity.text}</h4>
                        <span className="text-[11px] text-gray-400">{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Appointments Table */}
          <div className="bg-white p-8 rounded-[32px] border border-gray-100">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Upcoming Appointments</h2>
                <p className="text-xs text-gray-500 mt-1">Detailed schedule for the next 24 hours</p>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-gray-50 text-gray-600 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-gray-100 transition-all">
                  Today
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {appointments.length > 0 ? appointments.map((apt, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-[#00A99D] font-bold text-xl uppercase">
                      {apt.pet?.name?.charAt(0) || 'P'}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 leading-tight">
                        {apt.pet?.name || 'Unknown Pet'} <span className="text-[11px] text-gray-400 font-normal ml-2">• {apt.pet?.breed || 'Mixed'}</span>
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">Owner: {apt.user?.name || 'Customer'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <div className="flex items-center gap-1.5 text-gray-700 font-bold text-sm mb-1">
                        <Clock size={14} className="text-[#00A99D]" />
                        {new Date(apt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${apt.status === 'pending' ? 'bg-orange-50 text-orange-500' : 'bg-green-50 text-green-500'}`}>
                        {apt.reason || 'Checkup'}
                      </span>
                    </div>
                  </div>
                </div>
              )) : (
                <p className="text-center text-gray-500 py-10">No upcoming appointments found.</p>
              )}
            </div>

            <button className="w-full mt-6 py-4 text-[#00A99D] text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#E6F6F5] rounded-2xl transition-all">
              View All Appointments
              <ArrowUpRight size={18} />
            </button>
          </div>
        </>
      )}

      {/* Footer Info */}
      <div className="text-center pt-8 pb-4">
        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[2px]">
          © 2024 PetCare+ Veterinary Management System. All rights reserved. Professional Edition v2.4.0
        </p>
      </div>
    </div>
  );
};

export default VetDashboard;

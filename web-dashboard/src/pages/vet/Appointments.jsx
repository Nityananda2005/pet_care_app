import React, { useEffect, useState } from 'react';
import {
  Search,
  Filter,
  RotateCcw,
  Plus,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Clock,
  Calendar,
  User,
  TrendingUp,
} from 'lucide-react';
import { fetchVetAppointments, updateAppointmentStatus } from '../../api';

const statusMap = {
  pending: { label: 'Pending', color: 'bg-orange-50 text-orange-500' },
  approved: { label: 'Confirmed', color: 'bg-[#E6F6F5] text-[#00A99D]' },
  rejected: { label: 'Cancelled', color: 'bg-gray-100 text-gray-500' },
};

const formatDate = (dateString) => {
  if (!dateString) return '--';
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? '--' : date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
};

const formatTime = (dateString) => {
  if (!dateString) return '--';
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? '--' : date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const getAvatarForPet = (petName) => {
  const seed = encodeURIComponent(petName || 'pet');
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
};

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    const loadAppointments = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchVetAppointments();
        setAppointments(res.data.appointments || []);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, []);

  const onStatusUpdate = async (id, status) => {
    setProcessingId(id);
    try {
      await updateAppointmentStatus(id, status);
      setAppointments(prev => prev.map(apt =>
        apt._id === id ? { ...apt, status } : apt
      ));
    } catch (err) {
      alert("Failed to update status: " + (err.response?.data?.message || err.message));
    } finally {
      setProcessingId(null);
    }
  };

  const renderRows = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan={6} className="px-8 py-12 text-center text-sm text-gray-500">
            Loading appointments...
          </td>
        </tr>
      );
    }

    if (error) {
      return (
        <tr>
          <td colSpan={6} className="px-8 py-12 text-center text-sm text-red-500">
            {error}
          </td>
        </tr>
      );
    }

    if (appointments.length === 0) {
      return (
        <tr>
          <td colSpan={6} className="px-8 py-12 text-center text-sm text-gray-500">
            No appointments found.
          </td>
        </tr>
      );
    }

    return appointments.map((apt) => {
      const petName = apt.pet?.name || 'Unknown';
      const petBreed = apt.pet?.breed || '';
      const petAvatar = apt.pet?.image || getAvatarForPet(petName);
      const ownerName = apt.owner?.name || 'Unknown Owner';
      const patientId = apt._id;
      const appointmentDate = apt.date;
      const appointmentDetails = {
        date: formatDate(appointmentDate),
        time: formatTime(appointmentDate),
      };
      const statusKey = (apt.status || 'pending').toLowerCase();
      const status = statusMap[statusKey] || statusMap.pending;

      return (
        <tr key={apt._id} className="hover:bg-gray-50/50 transition-colors group">
          <td className="px-8 py-5">
            <div className="flex items-center gap-3">
              <img src={petAvatar} alt={petName} className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100" />
              <div>
                <p className="text-sm font-bold text-gray-900">{petName}</p>
                <p className="text-[11px] text-gray-500">{petBreed}</p>
              </div>
            </div>
          </td>
          <td className="px-8 py-5">
            <p className="text-sm font-bold text-gray-900">{ownerName}</p>
            <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-tighter">
              <User size={10} />
              Patient ID: {patientId}
            </div>
          </td>
          <td className="px-8 py-5">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
              <Calendar size={14} className="text-[#00A99D]" />
              {appointmentDetails.date}
            </div>
            <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-1">
              <Clock size={12} />
              {appointmentDetails.time}
            </div>
          </td>
          <td className="px-8 py-5 text-sm text-gray-600 font-medium">
            {apt.reason || '—'}
          </td>
          <td className="px-8 py-5">
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${status.color}`}>
              {status.label}
            </span>
          </td>
          <td className="px-8 py-5">
            {statusKey === 'pending' ? (
              <div className="flex items-center gap-2">
                <button
                  disabled={processingId === apt._id}
                  onClick={() => onStatusUpdate(apt._id, 'rejected')}
                  className="px-3 py-1.5 text-xs font-bold text-red-500 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
                >
                  Reject
                </button>
                <button
                  disabled={processingId === apt._id}
                  onClick={() => onStatusUpdate(apt._id, 'approved')}
                  className="px-4 py-1.5 bg-[#00A99D] text-white text-xs font-bold rounded-lg hover:bg-[#008c82] transition-all disabled:opacity-50 shadow-sm"
                >
                  Accept
                </button>
              </div>
            ) : (
              <div className="text-gray-400 text-xs font-medium italic">
                Processed
              </div>
            )}
          </td>
        </tr>
      );
    });
  };


  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
          <div className="flex gap-1 mt-1">
            {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="w-1 h-1 rounded-full bg-gray-300"></div>)}
          </div>
        </div>
        <button className="px-5 py-2.5 rounded-xl bg-[#00A99D] text-sm font-semibold text-white hover:bg-[#008c82] transition-all shadow-lg shadow-[#00A99D]/20 flex items-center gap-2">
          <Plus size={18} />
          New Appointment
        </button>
      </div>
      <p className="text-gray-500 -mt-6">Manage and schedule veterinary visits for your furry patients.</p>

      {/* Filters Section */}
      <div className="bg-white p-6 rounded-[32px] border border-gray-100 space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex p-1 bg-gray-50 rounded-xl">
            {['Today', 'This Week', 'This Month', 'All Time'].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${tab === 'Today' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search appointments..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border-transparent rounded-xl text-sm focus:bg-white focus:border-[#00A99D] focus:ring-0 transition-all"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 flex items-center gap-2 hover:bg-gray-50">
            <Filter size={14} />
            More Filters
          </button>
          <button className="px-4 py-2 rounded-xl text-xs font-bold text-gray-400 flex items-center gap-2 hover:bg-gray-50">
            <RotateCcw size={14} />
            Reset
          </button>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Upcoming Schedule</h2>
            <p className="text-xs text-gray-500 mt-1">A detailed list of all appointments for the selected period.</p>
          </div>
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00A99D]"></div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Confirmed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-300"></div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pending</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pet & Patient Info</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Owner</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Appointment Details</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Reason</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {renderRows()}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-gray-50 flex justify-between items-center bg-gray-50/30">
          <p className="text-xs text-gray-500">
            Showing <span className="font-bold text-gray-900">1-5</span> of <span className="font-bold text-gray-900">{appointments.length}</span> results
          </p>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:bg-white hover:text-gray-600 transition-all">
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-1">
              {[1, 2, 3].map(page => (
                <button
                  key={page}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${page === 1 ? 'bg-[#00A99D] text-white shadow-lg shadow-[#00A99D]/20' : 'bg-white text-gray-400 border border-gray-100 hover:border-[#00A99D] hover:text-[#00A99D]'
                    }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:bg-white hover:text-gray-600 transition-all">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Daily Clinic Capacity Card */}
      <div className="bg-[#f0faf9] border border-[#e6f6f5] p-6 rounded-[32px] flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-start gap-5">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#e6f6f5]">
            <Calendar className="text-[#00A99D]" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Daily Clinic Capacity</h3>
            <p className="text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">
              The clinic is currently operating at <span className="text-[#00A99D] font-bold">85% capacity</span> for today. Please consider spreading out any walk-in emergencies or non-urgent follow-ups to tomorrow morning between 08:00 AM and 10:00 AM.
            </p>
          </div>
        </div>
        <button className="px-6 py-3 bg-white text-[#00A99D] border border-[#e6f6f5] rounded-2xl text-xs font-bold whitespace-nowrap hover:shadow-lg transition-all">
          View Schedule Trends
        </button>
      </div>

      <div className="text-center pt-8 pb-4">
        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[2px]">
          © 2024 PetCare+ Veterinary Management System. All rights reserved. Professional Edition v2.4.0
        </p>
      </div>
    </div>
  );
};

export default Appointments;

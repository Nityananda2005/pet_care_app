import React, { useState, useEffect } from 'react';
import {
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  XCircle,
  ThumbsUp,
  ThumbsDown,
  ExternalLink,
  Heart,
  User,
  Calendar,
  Info,
  Loader2
} from 'lucide-react';
import { fetchShelterAdoptionRequests, updateAdoptionRequestStatus } from '../../api';

const SummaryCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white p-6 rounded-[32px] border border-gray-100 flex-1 flex items-center gap-6 group hover:shadow-xl hover:shadow-gray-100 transition-all duration-300">
    <div className={`p-4 rounded-2xl ${color} bg-opacity-10 ${color.replace('bg-', 'text-')}`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">{label}</p>
      <h3 className="text-3xl font-extrabold text-gray-900">{value}</h3>
    </div>
  </div>
);

const AdoptionConfirmationModal = ({ isOpen, onClose, request, onConfirm, onReject, isProcessing }) => {
  if (!isOpen || !request) return null;

  const getImageUrl = (path) => {
    if (!path) return "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=400";
    if (path.startsWith('http')) return path;
    return `http://127.0.0.1:5000/${path}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}></div>

      <div className="bg-white w-full max-w-lg rounded-[40px] overflow-hidden shadow-2xl relative z-10 animate-in zoom-in-95 duration-300">
        <div className="bg-linear-to-b from-[#EBFBFA] to-white p-8 pb-4 flex flex-col items-center">
          <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#00D1C1] mb-4">
            <Heart size={24} fill="currentColor" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-1">Finalize Adoption</h2>
          <p className="text-gray-500 text-[11px] font-medium">
            Confirming the match for <span className="text-[#00D1C1] font-bold">{request.pet?.petName}</span>
          </p>
        </div>

        <div className="p-8 pt-4 space-y-6">
          <div className="flex items-center justify-center gap-6 py-4 bg-gray-50/50 rounded-3xl border border-gray-100">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-[#00D1C1] font-bold text-xl uppercase border-2 border-white shadow-md">
                {request.user?.name?.charAt(0)}
              </div>
              <div className="text-center">
                <h4 className="font-bold text-gray-900 text-xs">{request.user?.name}</h4>
              </div>
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="px-3 py-1 bg-[#E6FDFB] border border-[#00D1C1]/20 rounded-full">
                <span className="text-[9px] font-black text-[#00D1C1]">Pending Match</span>
              </div>
              <ChevronRight size={14} className="text-[#00D1C1] opacity-50" />
            </div>

            <div className="flex flex-col items-center gap-2">
              <img src={getImageUrl(request.pet?.image)} className="w-16 h-16 rounded-2xl border-2 border-white shadow-md object-cover" alt="" />
              <div className="text-center">
                <h4 className="font-bold text-gray-900 text-xs">{request.pet?.petName}</h4>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-3">
              <div className="p-2 bg-[#EBFBFA] rounded-xl text-[#00D1C1]">
                <Calendar size={14} />
              </div>
              <div>
                <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Request Date</p>
                <p className="text-[10px] font-bold text-gray-900">{new Date(request.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-3">
              <div className="p-2 bg-[#F0F7FF] rounded-xl text-blue-500">
                <User size={14} />
              </div>
              <div>
                <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Phone</p>
                <p className="text-[10px] font-bold text-gray-900">{request.user?.phone || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#EBFBFA]/30 border border-[#00D1C1]/10 flex items-start gap-3">
            <AlertCircle size={14} className="text-[#00D1C1] shrink-0 mt-0.5" />
            <p className="text-[9px] text-gray-500 font-medium leading-relaxed">
              By approving, you confirm that home checks are complete and the pet is ready for its transition.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => onReject(request)}
              disabled={isProcessing}
              className="flex-1 py-3.5 border border-gray-200 rounded-2xl text-[11px] font-bold text-gray-500 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {isProcessing ? <Loader2 size={14} className="animate-spin" /> : <XCircle size={14} className="group-hover:scale-110 transition-transform" />}
              Reject
            </button>
            <button
              onClick={() => onConfirm(request)}
              disabled={isProcessing}
              className="flex-[2] py-3.5 bg-[#00D1C1] text-white rounded-2xl text-[11px] font-black shadow-lg shadow-[#00D1C1]/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {isProcessing ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={14} className="group-hover:scale-110 transition-transform" />}
              Approve Adoption
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdoptionRequests = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      setIsLoading(true);
      const res = await fetchShelterAdoptionRequests();
      setRequests(res.data.requests || []);
    } catch (err) {
      console.error("Failed to load requests", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionClick = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleApprove = async (request) => {
    try {
      setIsProcessing(true);
      await updateAdoptionRequestStatus(request._id, 'approved');
      setRequests(prev => prev.map(r =>
        r._id === request._id ? { ...r, status: 'approved' } : r
      ));
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to approve request", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async (request) => {
    try {
      setIsProcessing(true);
      await updateAdoptionRequestStatus(request._id, 'rejected');
      setRequests(prev => prev.map(r =>
        r._id === request._id ? { ...r, status: 'rejected' } : r
      ));
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to reject request", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const getImageUrl = (path) => {
    if (!path) return "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=400";
    if (path.startsWith('http')) return path;
    return `http://127.0.0.1:5000/${path}`;
  };

  const filteredRequests = requests.filter(req => {
    if (activeTab === 'All') return true;
    return req.status === activeTab.toLowerCase();
  });

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-20">
        <Loader2 className="animate-spin text-[#00D1C1]" size={40} />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div>
        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
          <span>Dashboard</span>
          <ChevronRight size={12} />
          <span className="text-[#00D1C1]">Adoption Requests</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Adoption Requests</h1>
        <p className="text-gray-500 text-sm font-medium">Manage incoming applications and guide pets to their forever homes.</p>
      </div>

      <div className="flex gap-6">
        <SummaryCard
          icon={Clock}
          label="Pending Review"
          value={requests.filter(r => r.status === 'pending').length}
          color="bg-orange-500"
        />
        <SummaryCard
          icon={CheckCircle}
          label="Approved"
          value={requests.filter(r => r.status === 'approved').length}
          color="bg-[#00D1C1]"
        />
        <SummaryCard
          icon={AlertCircle}
          label="Total Requests"
          value={requests.length}
          color="bg-purple-500"
        />
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 p-1 rounded-2xl">
            {['All', 'Pending', 'Approved', 'Rejected'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === tab
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-400 hover:text-gray-600'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Quick search..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#00D1C1]/20 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pet Identity</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Applicant</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Request Date</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Review Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredRequests.map((req) => (
                <tr key={req._id} className="group hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <img src={getImageUrl(req.pet?.image)} alt="" className="w-12 h-12 rounded-2xl object-cover ring-2 ring-gray-50" />
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">{req.pet?.petName}</h4>
                        <p className="text-[11px] text-gray-400 font-medium italic">{req.pet?.breed}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#00D1C1] font-bold border border-gray-100 uppercase">
                        {req.user?.name?.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">{req.user?.name}</h4>
                        <p className="text-[11px] text-gray-400 font-medium">{req.user?.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-sm text-gray-700 font-bold">
                        <Clock size={14} className="text-gray-300" />
                        {new Date(req.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1.5 rounded-xl text-[10px] font-bold border transition-all duration-300 uppercase ${req.status === 'pending' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                        req.status === 'approved' ? 'bg-[#E6FDFB] text-[#00A99D] border-[#00D1C1]/20 shadow-sm shadow-[#00D1C1]/10' :
                          'bg-red-50 text-red-600 border-red-100'
                      }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    {req.status === 'pending' ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleActionClick(req)}
                          className="flex items-center gap-1.5 px-4 py-2 hover:bg-red-50 text-red-500 rounded-xl text-[11px] font-bold transition-all group/btn"
                        >
                          <XCircle size={16} className="group-hover/btn:scale-110 transition-transform" />
                          Reject
                        </button>
                        <button
                          onClick={() => handleActionClick(req)}
                          className="flex items-center gap-2 px-6 py-2.5 bg-[#00D1C1] text-white rounded-xl text-[11px] font-bold shadow-lg shadow-[#00D1C1]/20 hover:scale-[1.05] active:scale-95 transition-all"
                        >
                          <CheckCircle size={16} />
                          Approve
                        </button>
                      </div>
                    ) : (
                      <button className="flex items-center gap-2 px-6 py-2.5 border border-gray-100 rounded-xl text-[11px] font-bold text-gray-500 hover:bg-gray-50 transition-all opacity-50 cursor-not-allowed">
                        Processed
                        <CheckCircle size={14} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredRequests.length === 0 && (
            <div className="p-20 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-3xl flex items-center justify-center text-gray-300 mx-auto mb-4">
                <Search size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900">No requests found</h3>
              <p className="text-sm text-gray-400 font-medium">Try changing your filters or searching for something else.</p>
            </div>
          )}
        </div>
      </div>

      <AdoptionConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        request={selectedRequest}
        onConfirm={handleApprove}
        onReject={handleReject}
        isProcessing={isProcessing}
      />

      <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest pt-8 border-t border-gray-50">
        <p>© 2024 PetCare+ Shelter Management. All paws on deck.</p>
      </div>
    </div>
  );
};

export default AdoptionRequests;

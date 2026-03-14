import React, { useEffect, useMemo, useState } from 'react';
import {
  Search,
  Filter,
  Plus,
  ChevronRight,
  User,
  Calendar,
  FileText,
  ShieldCheck,
  Clock,
  Download,
  UploadCloud,
  MoreVertical,
  Activity,
  Stethoscope
} from 'lucide-react';
import { fetchVetMedicalHistory } from '../../api';

const formatDate = (dateString) => {
  if (!dateString) return '--';
  const d = new Date(dateString);
  return isNaN(d.getTime()) ? '--' : d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
};

const formatTime = (dateString) => {
  if (!dateString) return '--';
  const d = new Date(dateString);
  return isNaN(d.getTime()) ? '--' : d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const MedicalRecords = () => {
  const [history, setHistory] = useState({ records: [], vaccinations: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPetId, setSelectedPetId] = useState(null);

  useEffect(() => {
    const loadHistory = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetchVetMedicalHistory();
        setHistory(res.data.history || { records: [], vaccinations: [] });

        const firstPetId = res.data.history?.records?.[0]?.pet?._id || res.data.history?.vaccinations?.[0]?.pet?._id;
        setSelectedPetId(firstPetId || null);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  const pets = useMemo(() => {
    const petMap = new Map();

    history.records.forEach((rec) => {
      if (rec.pet?._id) petMap.set(rec.pet._id, rec.pet);
    });
    history.vaccinations.forEach((vac) => {
      if (vac.pet?._id) petMap.set(vac.pet._id, vac.pet);
    });

    return Array.from(petMap.values());
  }, [history]);

  const selectedPet = useMemo(() => pets.find((p) => p._id === selectedPetId) || pets[0] || null, [pets, selectedPetId]);

  const petRecords = useMemo(() => {
    if (!selectedPet) return [];
    return history.records
      .filter((rec) => rec.pet?._id === selectedPet._id)
      .sort((a, b) => new Date(b.visitDate) - new Date(a.visitDate));
  }, [history.records, selectedPet]);

  const petVaccinations = useMemo(() => {
    if (!selectedPet) return [];
    return history.vaccinations
      .filter((vac) => vac.pet?._id === selectedPet._id)
      .sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
  }, [history.vaccinations, selectedPet]);

  const selectedPetName = selectedPet?.name || 'Unknown';
  const selectedPetBreed = selectedPet?.breed || 'Unknown';
  const selectedPetSpecies = selectedPet?.species || '';
  const selectedPetAvatar = selectedPet ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(selectedPetName)}` : '';

  const timelineItems = useMemo(() => {
    const recordItems = petRecords.map((item) => ({
      key: `record-${item._id}`,
      date: formatDate(item.visitDate),
      type: item.diagnosis || 'Medical Record',
      title: item.diagnosis || 'Medical Record',
      doctor: item.vet?.name || 'Unknown Vet',
      description: item.prescription || 'No additional notes',
      icon: Stethoscope,
      color: 'text-[#00A99D]',
      bg: 'bg-[#E6F6F5]',
    }));

    const vaccinationItems = petVaccinations.map((item) => ({
      key: `vac-${item._id}`,
      date: formatDate(item.dateGiven),
      type: 'Vaccination',
      title: item.vaccineName,
      doctor: item.vet?.name || 'Unknown Vet',
      description: item.notes || `Next due: ${formatDate(item.dueDate)}`,
      icon: ShieldCheck,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
    }));

    return [...recordItems, ...vaccinationItems].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [petRecords, petVaccinations]);

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden animate-in fade-in duration-500">
      {/* Left Sidebar - Patient List */}
      <div className="w-80 bg-white border-r border-gray-100 flex flex-col">
        <div className="p-6 border-b border-gray-50">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Patients</h2>
            <button className="text-[#00A99D] p-2 hover:bg-[#E6F6F5] rounded-xl transition-all">
              <Filter size={18} />
            </button>
          </div>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by pet name..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border-transparent rounded-xl text-sm focus:bg-white focus:border-[#00A99D] focus:ring-0 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-2">Recent Visits</p>
          {loading ? (
            <div className="px-4 py-6 text-sm text-gray-500">Loading patients...</div>
          ) : error ? (
            <div className="px-4 py-6 text-sm text-red-500">{error}</div>
          ) : pets.length === 0 ? (
            <div className="px-4 py-6 text-sm text-gray-500">No patient history found.</div>
          ) : (
            pets.map((pet) => (
              <button
                key={pet._id}
                onClick={() => setSelectedPetId(pet._id)}
                className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all ${
                  pet._id === selectedPetId ? 'bg-[#E6F6F5] border border-[#00A99D]/20' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(pet.name || pet._id)}`} alt="" className="w-10 h-10 rounded-xl bg-gray-100 border border-gray-100" />
                  <div className="text-left">
                    <p className={`text-sm font-bold ${pet._id === selectedPetId ? 'text-[#00A99D]' : 'text-gray-900'}`}>{pet.name || 'Unnamed'}</p>
                    <p className="text-[11px] text-gray-500">{pet.species || 'Unknown species'}</p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">{pet.breed || ''}</span>
                  <ChevronRight size={14} className="text-gray-300" />
                </div>
              </button>
            ))
          )}
        </div>

        <div className="p-6 bg-gray-50/50">
          <button className="w-full bg-[#00A99D] text-white py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#008c82] transition-all shadow-lg shadow-[#00A99D]/20">
            <Plus size={18} />
            New Patient Profile
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto bg-[#fcfdfe] p-8 space-y-8">
        {/* Pet Profile Header */}
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-[0.03] transform translate-x-8 -translate-y-8">
            <Stethoscope size={240} />
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-[#E6F6F5] p-1">
                <img
                  src={selectedPetAvatar}
                  alt={selectedPetName}
                  className="w-full h-full rounded-full object-cover bg-gray-50"
                />
              </div>
              <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{selectedPetName}</h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
                <span className="bg-[#00A99D] text-white px-4 py-1 rounded-lg text-xs font-bold">
                  {selectedPetBreed || 'Unknown Breed'}
                </span>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest border-l pl-4 border-gray-200">
                  Patient ID: {selectedPet?._id || '—'}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Species</p>
                  <p className="text-sm font-bold text-gray-900">{selectedPetSpecies || 'Unknown'}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Owner</p>
                  <p className="text-sm font-bold text-gray-900">{selectedPet?.ownerName || 'Unknown'}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Last Visit</p>
                  <p className="text-sm font-bold text-gray-900">
                    {petRecords[0] ? formatDate(petRecords[0].visitDate) : '--'}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Next Vaccine</p>
                  <p className="text-sm font-bold text-gray-900">
                    {petVaccinations[0] ? formatDate(petVaccinations[0].dueDate) : '--'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button className="px-6 py-2.5 bg-[#00A99D] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#008c82] transition-all whitespace-nowrap">
                <Calendar size={18} />
                Book Appointment
              </button>
              <button className="px-6 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-all whitespace-nowrap">
                <FileText size={18} />
                Export Medical File
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-8">
          {/* History Timeline */}
          <div className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-gray-100 flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                  <Clock size={20} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Medical History Timeline</h3>
              </div>
              <button className="text-[#00A99D] text-xs font-bold hover:underline">View All History</button>
            </div>

            <div className="space-y-0 relative ml-4">
              <div className="absolute left-0 top-0 bottom-8 border-l-2 border-dashed border-gray-100 ml-[19px]"></div>
              {timelineItems.length === 0 ? (
                <div className="py-20 text-center text-sm text-gray-500">No medical history available for this patient.</div>
              ) : (
                timelineItems.map((item) => (
                  <div key={item.key} className="relative pl-12 pb-12 last:pb-0">
                    <div className={`absolute left-0 top-0 w-10 h-10 rounded-full ${item.bg} flex items-center justify-center border-4 border-white z-10 shadow-sm`}>
                      <item.icon size={18} className={item.color} />
                    </div>
                    <div className="flex justify-between items-start mb-2 pt-1">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-gray-900">{item.date}</span>
                        <span className="bg-gray-50 text-gray-400 px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider border border-gray-100">{item.type}</span>
                      </div>
                    </div>
                    <h4 className="text-base font-bold text-gray-800 mb-1">{item.title}</h4>
                    <p className="text-[11px] text-gray-400 mb-4 font-medium italic">Examined by {item.doctor}</p>
                    <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50">
                      <p className="text-xs text-gray-600 leading-relaxed font-medium">{item.description}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <button className="w-full mt-8 py-4 border-2 border-dashed border-gray-100 rounded-3xl text-gray-400 text-xs font-bold hover:bg-gray-50 hover:border-[#00A99D]/30 hover:text-[#00A99D] transition-all">
              Add Manual History Record
            </button>
          </div>

          {/* Right Column Panels */}
          <div className="space-y-8">
            {/* Vaccination Records */}
            <div className="bg-white p-8 rounded-[40px] border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Vaccination Records</h3>
              </div>

              <div className="space-y-4">
                {petVaccinations.length === 0 ? (
                  <div className="py-8 text-center text-sm text-gray-500">No vaccination records available for this patient.</div>
                ) : (
                  petVaccinations.map((vax) => (
                    <div key={vax._id} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#00A99D]/20 transition-all group">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="text-xs font-bold text-gray-800 group-hover:text-[#00A99D] transition-colors">{vax.vaccineName}</h5>
                        <span className="text-[9px] font-bold text-gray-400 tracking-widest">NEXT DUE</span>
                      </div>
                      <div className="flex justify-between items-end">
                        <span className="text-[10px] text-gray-400 font-medium">Last: {formatDate(vax.dateGiven)}</span>
                        <span className="text-[11px] font-bold text-gray-900">{formatDate(vax.dueDate)}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-4 p-4 bg-red-50/50 rounded-2xl border border-red-100">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="text-xs font-bold text-red-800">Leptospirosis</h5>
                  <span className="text-[9px] font-bold text-red-400 tracking-widest">NEXT DUE</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-[10px] text-red-400 font-medium">Last: Jan 05, 2023</span>
                  <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold">Jan 05, 2024</span>
                </div>
              </div>

              <button className="w-full mt-6 py-3 border border-[#00A99D] text-[#00A99D] text-xs font-bold rounded-xl hover:bg-[#00A99D] hover:text-white transition-all">
                Log New Vaccination
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecords;

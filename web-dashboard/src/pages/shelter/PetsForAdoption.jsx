import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Filter,
  Heart,
  Eye,
  Dog,
  Cat,
  Bird,
  Rabbit,
  ChevronDown,
  X,
  Plus,
  ArrowUpRight,
  TrendingUp,
  LayoutGrid,
  Clock,
  Info,
  Loader2
} from 'lucide-react';
import { fetchShelterPets } from '../../api';

const PetsForAdoption = () => {
  const [activeTab, setActiveTab] = useState('All Pets');
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPets = async () => {
      try {
        const response = await fetchShelterPets();
        setPets(response.data.pets || []);
      } catch (err) {
        console.error('Failed to fetch pets:', err);
      } finally {
        setIsLoading(false);
      }
    };
    getPets();
  }, []);

  const categories = [
    { name: 'All Pets', icon: LayoutGrid },
    { name: 'Dogs', icon: Dog },
    { name: 'Cats', icon: Cat },
    { name: 'Birds', icon: Bird },
    { name: 'Others', icon: Rabbit },
  ];

  // Functional Filtering Logic
  const filteredPets = useMemo(() => {
    if (activeTab === 'All Pets') return pets;
    const speciesFilter = activeTab === 'Others' ? 'Other' : activeTab.slice(0, -1);
    return pets.filter(pet => pet.species === speciesFilter);
  }, [activeTab, pets]);

  const getImageUrl = (path) => {
    if (!path) return "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=400";
    if (path.startsWith('http')) return path;
    return `http://127.0.0.1:5000/${path}`;
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-20">
        <Loader2 className="animate-spin text-[#00D1C1]" size={40} />
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] animate-in fade-in duration-500">
      {/* Filters Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-100 p-8 space-y-8 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto hidden lg:block">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-[#00D1C1]" />
            <h3 className="text-lg font-bold text-gray-900">Filters</h3>
          </div>
          <button className="p-1 hover:bg-gray-50 rounded-lg text-gray-400">
            <X size={18} />
          </button>
        </div>

        {/* Species Filter */}
        <section>
          <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Species</h4>
          <div className="space-y-3">
            {['Dog', 'Cat', 'Bird', 'Other'].map((species) => (
              <label key={species} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative w-5 h-5 flex items-center justify-center">
                  <input type="checkbox" className="peer appearance-none w-5 h-5 border-2 border-gray-100 rounded-md checked:bg-[#00D1C1] checked:border-[#00D1C1] transition-all" defaultChecked />
                  <div className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity">
                    <svg size={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                </div>
                <span className="text-sm font-bold text-gray-600 group-hover:text-gray-900 transition-colors">{species}</span>
              </label>
            ))}
          </div>
        </section>

        <div className="pt-4 space-y-4">
          <button className="w-full py-3 bg-[#00D1C1] text-white rounded-2xl text-xs font-bold shadow-lg shadow-[#00D1C1]/20 hover:bg-[#00B8A9] transition-all">
            Apply Filters
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-[#fcfdfe]">
        {/* Category Tabs */}
        <div className="flex gap-4 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveTab(cat.name)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${activeTab === cat.name
                  ? 'bg-[#00D1C1] text-white shadow-lg shadow-[#00D1C1]/20'
                  : 'bg-white text-gray-400 border border-gray-50 hover:border-[#00D1C1]/30 hover:text-gray-600'
                }`}
            >
              <cat.icon size={16} />
              {cat.name}
            </button>
          ))}
        </div>

        {/* Header & Sort */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900">Showing {filteredPets.length} Pets</h2>
            <p className="text-xs text-gray-400 font-medium mt-1 italic">Find your perfect companion among our sheltered friends.</p>
          </div>
        </div>

        {/* Pet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 min-h-[400px]">
          {filteredPets.length > 0 ? (
            filteredPets.map((pet, idx) => (
              <div key={pet._id} className="bg-white rounded-[32px] overflow-hidden border border-gray-50 group hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 animate-in zoom-in-95">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={getImageUrl(pet.image)}
                    alt={pet.petName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 bg-white/90 backdrop-blur-sm rounded-xl text-gray-400 hover:text-red-500 transition-all shadow-sm">
                      <Heart size={16} />
                    </button>
                    <button className="p-2 bg-white/90 backdrop-blur-sm rounded-xl text-gray-400 hover:text-[#00D1C1] transition-all shadow-sm">
                      <Eye size={16} />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-extrabold text-gray-900 mb-0.5">{pet.petName}</h3>
                      <p className="text-[11px] font-bold text-gray-400 italic">{pet.breed}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-lg text-[9px] font-extrabold uppercase tracking-widest ${pet.status === 'available' ? 'bg-[#E6FDFB] text-[#00D1C1]' : 'bg-blue-50 text-blue-500'
                      }`}>
                      {pet.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-gray-500">
                      <Clock size={14} className="text-gray-300" />
                      {pet.age} Years
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-gray-500 border-l border-gray-100 pl-4 h-4 uppercase">
                      {pet.gender}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 bg-gray-50/50 rounded-[40px] border border-dashed border-gray-200">
              <div className="p-4 bg-white rounded-2xl shadow-sm mb-4">
                <Search size={32} className="text-gray-200" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">No pets found</h3>
              <p className="text-xs text-gray-400">Try adjusting your filters or adding a new companion.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetsForAdoption;

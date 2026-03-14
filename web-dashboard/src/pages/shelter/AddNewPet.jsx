import React, { useState, useRef } from 'react';
import {
  Camera,
  Plus,
  Info,
  CheckCircle,
  X,
  Search,
  ChevronRight,
  Upload,
  AlertCircle,
  Clock,
  Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { addAdoptionPet } from '../../api';

const AddNewPet = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    petName: '',
    breed: '',
    species: 'Dog',
    age: '',
    gender: 'Male',
    size: 'Medium (11-25kg)',
    description: '',
    medicalHistory: '',
  });

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Single image support for now
    const file = files[0];
    setImages([file]);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviews([reader.result]);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (index) => {
    setImages([]);
    setPreviews([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.petName || !formData.breed || !formData.age) {
      setError('Please fill in all required fields marked with *');
      return;
    }

    if (images.length === 0) {
      setError('Please upload an image of the pet.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const data = new FormData();
      data.append('petName', formData.petName);
      data.append('breed', formData.breed);
      data.append('species', formData.species);
      data.append('age', formData.age);
      data.append('gender', formData.gender.toLowerCase());
      data.append('description', formData.description || formData.medicalHistory);
      data.append('image', images[0]);

      await addAdoptionPet(data);
      navigate('/shelter/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to add pet profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 pb-20 space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      {/* Header & Stepper */}
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-12 mb-10 w-full max-w-sm justify-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-px bg-gray-100 z-0"></div>

          <div className="flex flex-col items-center gap-2 relative z-10">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black border-2 transition-all ${currentStep >= 1 ? 'bg-[#00D1C1] border-[#00D1C1] text-white' : 'bg-white border-gray-200 text-gray-300'
              }`}>
              1
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${currentStep >= 1 ? 'text-gray-900' : 'text-gray-300'}`}>Details</span>
          </div>

          <div className="flex flex-col items-center gap-2 relative z-10">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black border-2 transition-all ${currentStep >= 2 ? 'bg-[#00D1C1] border-[#00D1C1] text-white' : 'bg-white border-gray-200 text-gray-300'
              }`}>
              2
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${currentStep >= 2 ? 'text-gray-900' : 'text-gray-300'}`}>Review</span>
          </div>
        </div>
      </div>

      {/* Main Form Container */}
      <form onSubmit={handleSubmit} className="bg-white rounded-[48px] border border-gray-100 shadow-sm overflow-hidden p-12 space-y-12">
        {error && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-bold animate-shake">
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        {/* Media Gallery Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#EBFBFA] rounded-xl text-[#00D1C1]">
              <Camera size={20} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Media Gallery</h3>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
            accept="image/*"
          />

          <div
            onClick={() => fileInputRef.current.click()}
            className="border-2 border-dashed border-[#00D1C1]/20 rounded-[40px] p-10 bg-[#fcfdfe]/50 relative group hover:bg-[#EBFBFA]/20 transition-all cursor-pointer"
          >
            <span className="absolute top-4 right-6 text-[10px] font-black text-[#00D1C1] uppercase tracking-widest opacity-50">REQUIRED</span>
            <div className="flex flex-col items-center justify-center py-10">
              <div className="w-16 h-16 bg-white rounded-3xl shadow-sm border border-[#00D1C1]/10 flex items-center justify-center text-[#00D1C1] mb-6 group-hover:scale-110 transition-transform">
                <Upload size={28} />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-1">Click to upload pet photo</h4>
              <p className="text-xs text-gray-400 font-medium">PNG, JPG or WebP (max. 5MB)</p>
            </div>
          </div>

          {previews.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {previews.map((img, i) => (
                <div key={i} className="relative w-32 h-32 group">
                  <img src={img} className="w-full h-full object-cover rounded-[24px] ring-2 ring-gray-50 shadow-sm" alt="" />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full shadow-md border border-gray-100 flex items-center justify-center text-red-500 hover:scale-110 transition-transform z-10"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Basic Information Section */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#F0F7FF] rounded-xl text-blue-500">
              <Info size={20} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Basic Information</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Pet Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="petName"
                value={formData.petName}
                onChange={handleInputChange}
                placeholder="e.g. Buddy"
                className="w-full px-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm font-medium focus:bg-white focus:border-[#00D1C1]/30 outline-none transition-all shadow-inner"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Breed / Mix <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="breed"
                value={formData.breed}
                onChange={handleInputChange}
                placeholder="e.g. Golden Retriever"
                className="w-full px-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm font-medium focus:bg-white focus:border-[#00D1C1]/30 outline-none transition-all shadow-inner"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-x-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Species <span className="text-red-500">*</span></label>
                <select
                  name="species"
                  value={formData.species}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm font-medium focus:bg-white focus:border-[#00D1C1]/30 outline-none transition-all appearance-none cursor-pointer shadow-inner"
                >
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Bird">Bird</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Age (Years) <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="2"
                  className="w-full px-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm font-medium focus:bg-white focus:border-[#00D1C1]/30 outline-none transition-all shadow-inner"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Gender</label>
                <div className="flex bg-gray-50 border border-gray-100 p-1 rounded-2xl">
                  {['Male', 'Female'].map(g => (
                    <button
                      type="button"
                      key={g}
                      onClick={() => setFormData(prev => ({ ...prev, gender: g }))}
                      className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${formData.gender === g ? 'bg-white shadow-sm text-gray-900 border border-gray-100' : 'text-gray-400 hover:text-gray-600'
                        }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Size</label>
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm font-medium focus:bg-white focus:border-[#00D1C1]/30 outline-none transition-all appearance-none cursor-pointer shadow-inner"
                >
                  <option>Small (0-11kg)</option>
                  <option>Medium (11-25kg)</option>
                  <option>Large (25kg+)</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Medical & Temperament Section */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-xl text-purple-500">
              <Info size={20} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Medical & Temperament</h3>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Medical History & Requirements</label>
              <textarea
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleInputChange}
                rows="4"
                placeholder="List vaccinations, known health issues..."
                className="w-full px-8 py-6 bg-gray-50/50 border border-gray-100 rounded-[32px] text-sm font-medium focus:bg-white focus:border-[#00D1C1]/30 outline-none transition-all shadow-inner resize-none"
              ></textarea>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Description & Personality</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                placeholder="Friendly, energetic, and great with kids..."
                className="w-full px-8 py-6 bg-gray-50/50 border border-gray-100 rounded-[32px] text-sm font-medium focus:bg-white focus:border-[#00D1C1]/30 outline-none transition-all shadow-inner resize-none mb-2"
              ></textarea>
            </div>
          </div>
        </section>

        {/* Form Actions Footer */}
        <div className="flex items-center justify-between pt-10 border-t border-gray-50">
          <button
            type="button"
            onClick={() => navigate('/shelter/dashboard')}
            className="px-10 py-4 border border-gray-100 rounded-2xl text-xs font-bold text-gray-400 hover:bg-gray-50 transition-all uppercase tracking-widest"
          >
            Cancel
          </button>

          <div className="flex items-center gap-8">
            <button
              type="submit"
              disabled={isLoading}
              className="px-12 py-4 bg-[#00D1C1] text-white rounded-2xl text-xs font-black shadow-xl shadow-[#00D1C1]/20 hover:scale-[1.05] active:scale-95 transition-all uppercase tracking-widest flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Saving...
                </>
              ) : 'Save Pet Profile'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewPet;

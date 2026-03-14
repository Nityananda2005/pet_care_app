import React, { useState } from 'react';
import { User, Mail, Shield, Camera, Save, Phone, MapPin } from 'lucide-react';

const ProfilePage = () => {
    const profile = JSON.parse(localStorage.getItem('profile') || '{}');
    const user = profile?.result || {};

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '+91 98765 43210',
        address: user.address || '123 Pet Care Lane, Mumbai, Maharashtra',
        clinicName: user.clinicName || 'PetCare+ Center',
        bio: user.bio || 'Dedicated pet care professional committed to providing the best treatment for our furry friends.'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        // Logic to save profile would go here (API call)
        setIsEditing(false);
        // Update local storage for demo purposes
        const updatedProfile = { ...profile, result: { ...user, ...formData } };
        localStorage.setItem('profile', JSON.stringify(updatedProfile));
        alert('Profile updated successfully!');
    };

    const roleColors = {
        vet: 'text-blue-500 bg-blue-50',
        shelter: 'text-teal-500 bg-teal-50',
        seller: 'text-orange-500 bg-orange-50'
    };

    const roleLabels = {
        vet: 'Veterinarian',
        shelter: 'Shelter Manager',
        seller: 'Store Owner'
    };

    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">My Profile</h1>
                    <p className="text-gray-500 text-sm font-medium">Manage your professional information and settings.</p>
                </div>
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-5 py-2.5 rounded-xl bg-[#00A99D] text-white text-sm font-bold hover:bg-[#008d83] transition-all shadow-lg shadow-[#00A99D]/20 flex items-center gap-2"
                    >
                        Edit Profile
                    </button>
                ) : (
                    <div className="flex gap-3">
                        <button
                            onClick={() => setIsEditing(false)}
                            className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-500 hover:bg-gray-50 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-5 py-2.5 rounded-xl bg-[#00A99D] text-white text-sm font-bold hover:bg-[#008d83] transition-all shadow-lg shadow-[#00A99D]/20 flex items-center gap-2"
                        >
                            <Save size={18} />
                            Save Changes
                        </button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center text-center">
                        <div className="relative mb-6">
                            <div className="w-32 h-32 rounded-[40px] overflow-hidden ring-4 ring-gray-50">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=E6F6F5&color=00A99D&bold=true&size=128`}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {isEditing && (
                                <button className="absolute -bottom-2 -right-2 p-3 bg-white border border-gray-100 rounded-2xl shadow-lg text-[#00A99D] hover:text-[#008d83] transition-colors">
                                    <Camera size={20} />
                                </button>
                            )}
                        </div>

                        <h2 className="text-2xl font-black text-gray-900 mb-2">{formData.name}</h2>
                        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 ${roleColors[user.role] || 'text-gray-500 bg-gray-50'}`}>
                            {roleLabels[user.role] || user.role}
                        </div>

                        <div className="w-full pt-6 border-t border-gray-50 space-y-4">
                            <div className="flex items-center gap-4 text-left">
                                <div className="p-2.5 bg-gray-50 text-gray-400 rounded-xl">
                                    <Mail size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</p>
                                    <p className="text-sm font-bold text-gray-800">{formData.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-left">
                                <div className="p-2.5 bg-gray-50 text-gray-400 rounded-xl">
                                    <Shield size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Account ID</p>
                                    <p className="text-sm font-bold text-gray-800">#{user._id?.slice(-8).toUpperCase() || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Trust Badge */}
                    <div className="bg-linear-to-br from-[#00A99D] to-[#00D1C1] p-8 rounded-[40px] text-white shadow-xl shadow-[#00A99D]/20">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
                            <Shield size={24} className="text-white" />
                        </div>
                        <h3 className="text-lg font-bold mb-2">Verified Professional</h3>
                        <p className="text-white/80 text-sm leading-relaxed">
                            Your account is verified as a legitimate {roleLabels[user.role]?.toLowerCase()} service provider.
                        </p>
                    </div>
                </div>

                {/* Profile Details */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-8 md:p-12 rounded-[40px] border border-gray-100 shadow-sm">
                        <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                            <div className="w-2 h-8 bg-[#00A99D] rounded-full" />
                            General Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <User size={14} className="text-[#00A99D]" />
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full outline-hidden bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-800 focus:bg-white focus:ring-2 focus:ring-[#00A99D]/10 focus:border-[#00A99D] disabled:opacity-60 transition-all font-sans"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <Mail size={14} className="text-[#00A99D]" />
                                    Work Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full outline-hidden bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-800 focus:bg-white focus:ring-2 focus:ring-[#00A99D]/10 focus:border-[#00A99D] disabled:opacity-60 transition-all font-sans"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <Phone size={14} className="text-[#00A99D]" />
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full outline-hidden bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-800 focus:bg-white focus:ring-2 focus:ring-[#00A99D]/10 focus:border-[#00A99D] disabled:opacity-60 transition-all font-sans"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <MapPin size={14} className="text-[#00A99D]" />
                                    Work Location
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full outline-hidden bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-800 focus:bg-white focus:ring-2 focus:ring-[#00A99D]/10 focus:border-[#00A99D] disabled:opacity-60 transition-all font-sans"
                                />
                            </div>
                        </div>

                        <div className="mt-8 space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                Professional Biography
                            </label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                disabled={!isEditing}
                                rows="4"
                                className="w-full outline-hidden bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-800 focus:bg-white focus:ring-2 focus:ring-[#00A99D]/10 focus:border-[#00A99D] disabled:opacity-60 transition-all font-sans resize-none"
                            ></textarea>
                        </div>
                    </div>

                    <div className="bg-white p-8 md:p-12 rounded-[40px] border border-gray-100 shadow-sm">
                        <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                            <div className="w-2 h-8 bg-red-400 rounded-full" />
                            Security & Access
                        </h3>
                        <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-red-50 rounded-3xl border border-red-100 gap-4">
                            <div>
                                <h4 className="font-bold text-red-900">Change Password</h4>
                                <p className="text-xs text-red-600/70 font-medium tracking-tight">Updating your password frequently helps keep your account secure.</p>
                            </div>
                            <button className="px-6 py-3 bg-white text-red-500 rounded-xl text-xs font-black uppercase tracking-widest shadow-sm hover:shadow-md transition-all border border-red-100">
                                Update Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;

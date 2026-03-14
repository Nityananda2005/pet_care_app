import React, { useState, useEffect, useCallback } from 'react';
import {
    Search, MapPin, Phone, AlertCircle, Plus, Camera, X,
    Heart, Eye, Clock, CheckCircle, Filter, ChevronDown, RefreshCw
} from 'lucide-react';
import { fetchLostPets, reportLostPet, fetchFoundPets, reportFoundPet } from '../api';
import { useToast } from '../components/Toast';

const SPECIES = ['All', 'Dog', 'Cat', 'Bird', 'Other'];

const SPECIES_EMOJI = { Dog: '🐕', Cat: '🐈', Bird: '🐦', Other: '🐾', All: '🐾' };

const emptyForm = {
    petName: '',
    species: 'Dog',
    breed: '',
    location: '',
    description: '',
    image: ''
};

const PetCard = ({ pet, mode }) => {
    const isLost = mode === 'lost';
    const accentColor = isLost ? '#EF4444' : '#10B981';
    const accentBg = isLost ? '#FEF2F2' : '#F0FDF4';
    const label = isLost ? 'LOST' : 'FOUND';
    const labelBg = isLost ? '#EF4444' : '#10B981';
    const contactLabel = isLost ? 'Contact Owner' : 'I Know This Pet';
    const phone = pet.owner?.phone;

    return (
        <div className="lost-pet-card">
            <div className="adoption-image-wrapper" style={{ height: '190px' }}>
                <span className="new-badge" style={{ background: labelBg, color: 'white' }}>{label}</span>
                <img
                    src={pet.image || `https://api.dicebear.com/7.x/adventurer/svg?seed=${pet.petName}`}
                    alt={pet.petName}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.target.src = `https://api.dicebear.com/7.x/adventurer/svg?seed=${pet.petName}`; }}
                />
                <div className="distance-tag">
                    <MapPin size={11} />
                    <span>{pet.location}</span>
                </div>
            </div>
            <div className="adoption-info">
                <div className="name-row">
                    <h5 style={{ color: accentColor }}>{pet.petName}</h5>
                    <span style={{ fontSize: '1.2rem' }}>{SPECIES_EMOJI[pet.species] || '🐾'}</span>
                </div>
                <p className="breed-text">{[pet.breed, pet.species].filter(Boolean).join(' • ')}</p>
                {pet.description && (
                    <p style={{ fontSize: '0.75rem', color: '#6B7280', margin: '6px 0 10px', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {pet.description}
                    </p>
                )}
                <div style={{ fontSize: '0.65rem', color: '#9CA3AF', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={10} />
                    {new Date(pet.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
                {phone ? (
                    <a
                        href={`tel:${phone}`}
                        className="btn-adopt-cyan"
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', textDecoration: 'none', background: accentBg, color: accentColor, fontWeight: '800', borderRadius: '12px', padding: '10px', fontSize: '0.8rem' }}
                    >
                        <Phone size={13} /> {contactLabel}
                    </a>
                ) : (
                    <div style={{ background: accentBg, color: accentColor, borderRadius: '12px', padding: '10px', fontSize: '0.8rem', fontWeight: '700', textAlign: 'center' }}>
                        📍 {isLost ? 'No contact listed' : 'Reporter anonymous'}
                    </div>
                )}
            </div>
        </div>
    );
};

const ReportModal = ({ mode, onClose, onSuccess }) => {
    const toast = useToast();
    const [form, setForm] = useState(emptyForm);
    const [submitting, setSubmitting] = useState(false);

    const isLost = mode === 'lost';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (isLost) {
                await reportLostPet(form);
            } else {
                await reportFoundPet(form);
            }
            toast({
                message: isLost
                    ? 'Lost pet reported! The community will help you find them. 🙏'
                    : 'Found pet reported! The owner will hopefully see this soon. ❤️',
                title: isLost ? 'Lost Pet Reported ✓' : 'Found Pet Reported ✓',
                type: 'success'
            });
            onSuccess();
            onClose();
        } catch (err) {
            toast({ message: err.response?.data?.message || 'Failed to submit report', title: 'Error', type: 'error' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content card" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
                <div className="modal-header">
                    <h3>{isLost ? '🚨 Report Lost Pet' : '✅ Report Found Pet'}</h3>
                    <button className="icon-button" onClick={onClose}><X size={22} /></button>
                </div>

                <p style={{ fontSize: '0.85rem', color: '#6B7280', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                    {isLost
                        ? 'Fill in the details below. The community will see this and help locate your pet.'
                        : 'Saw a stray or lost pet? Report it so the owner can find them!'}
                </p>

                <form className="pet-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="field-label">{isLost ? "Pet Name" : "Pet's Name / Description"}</label>
                        <input
                            type="text"
                            placeholder={isLost ? "e.g. Max" : "e.g. Brown Labrador or Unknown"}
                            className="input-field"
                            value={form.petName}
                            onChange={(e) => setForm({ ...form, petName: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="field-label">Species</label>
                            <select
                                className="input-field"
                                value={form.species}
                                onChange={(e) => setForm({ ...form, species: e.target.value })}
                            >
                                <option value="Dog">Dog</option>
                                <option value="Cat">Cat</option>
                                <option value="Bird">Bird</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="field-label">Breed</label>
                            <input
                                type="text"
                                placeholder="e.g. Husky"
                                className="input-field"
                                value={form.breed}
                                onChange={(e) => setForm({ ...form, breed: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="field-label">{isLost ? "Last Seen Location" : "Where Did You Find Them?"}</label>
                        <input
                            type="text"
                            placeholder="e.g. Central Park, Sector 5"
                            className="input-field"
                            value={form.location}
                            onChange={(e) => setForm({ ...form, location: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="field-label">Description &amp; Contact Info</label>
                        <textarea
                            className="input-field"
                            style={{ height: '90px', paddingTop: '12px' }}
                            placeholder={isLost
                                ? "Describe your pet (colour, marks, collar) & your phone number..."
                                : "Describe the pet's appearance and how to contact you..."}
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group" style={{ textAlign: 'center' }}>
                        <label className="field-label">Pet Photo</label>
                        <div style={{ margin: '0.75rem auto', width: '120px', height: '120px', borderRadius: '20px', background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '2px dashed #E5E7EB' }}>
                            {form.image ? (
                                <img src={form.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <Camera size={32} color="#9CA3AF" />
                            )}
                        </div>
                        <label style={{ display: 'inline-block', marginTop: '8px', fontSize: '0.85rem', color: '#3B82F6', fontWeight: '700', cursor: 'pointer' }}>
                            {form.image ? 'Change Photo' : 'Select Photo'}
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => setForm({ ...form, image: reader.result });
                                        reader.readAsDataURL(file);
                                    }
                                }}
                                required={!form.image}
                            />
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="btn btn-primary"
                        style={{ width: '100%', marginTop: '1rem', height: '56px', background: isLost ? '#EF4444' : '#10B981', borderColor: 'transparent', opacity: submitting ? 0.7 : 1 }}
                    >
                        {submitting ? 'Submitting...' : (isLost ? '🚨 Post Lost Alert' : '✅ Report Found Pet')}
                    </button>
                </form>
            </div>
        </div>
    );
};

const LostPetsPage = () => {
    const [activeTab, setActiveTab] = useState('lost'); // 'lost' | 'found'
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSpecies, setSelectedSpecies] = useState('All');
    const [showModal, setShowModal] = useState(null); // null | 'lost' | 'found'
    const [showFilterMenu, setShowFilterMenu] = useState(false);

    const loadPets = useCallback(async () => {
        setLoading(true);
        try {
            const params = {};
            if (selectedSpecies !== 'All') params.species = selectedSpecies;
            if (searchQuery.trim()) params.search = searchQuery.trim();

            const res = activeTab === 'lost'
                ? await fetchLostPets(params)
                : await fetchFoundPets(params);

            setPets(res.data.pets || []);
        } catch (err) {
            console.error('Failed to fetch pets:', err);
            setPets([]);
        } finally {
            setLoading(false);
        }
    }, [activeTab, selectedSpecies, searchQuery]);

    useEffect(() => {
        const debounce = setTimeout(loadPets, 300);
        return () => clearTimeout(debounce);
    }, [loadPets]);

    const isLostTab = activeTab === 'lost';

    return (
        <div className="lost-pets-page">
            {/* Header */}
            <header className="adoption-header" style={{ paddingBottom: '0' }}>
                <h2 style={{ fontSize: '1.6rem' }}>Lost &amp; Found 🔍</h2>
                <p>Help us reunite pets with their families</p>

                {/* Tab Switcher */}
                <div className="view-switcher-tabs" style={{ marginTop: '1.25rem', marginBottom: '0' }}>
                    <button
                        className={`tab-btn ${activeTab === 'lost' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('lost'); setPets([]); }}
                        style={activeTab === 'lost' ? { color: '#EF4444' } : {}}
                    >
                        🚨 Missing Pets
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'found' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('found'); setPets([]); }}
                        style={activeTab === 'found' ? { color: '#10B981' } : {}}
                    >
                        ✅ Found Pets
                    </button>
                </div>
            </header>

            {/* Search Bar */}
            <div style={{ margin: '1rem 0', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <div className="search-bar-rounded" style={{ flex: 1, padding: '0.65rem 1rem' }}>
                    <Search size={16} color="#9CA3AF" />
                    <input
                        placeholder={`Search ${isLostTab ? 'missing' : 'found'} pets by name...`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ fontSize: '0.9rem' }}
                    />
                    {searchQuery && (
                        <button onClick={() => setSearchQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}>
                            <X size={14} color="#9CA3AF" />
                        </button>
                    )}
                </div>
                <button
                    onClick={() => setShowFilterMenu(v => !v)}
                    style={{
                        width: '44px', height: '44px', borderRadius: '14px',
                        background: selectedSpecies !== 'All' ? '#79e5f7' : 'white',
                        border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', cursor: 'pointer', flexShrink: 0,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                    }}
                >
                    <Filter size={16} color={selectedSpecies !== 'All' ? '#111' : '#6B7280'} />
                </button>
            </div>

            {/* Species Filter Dropdown */}
            {showFilterMenu && (
                <div style={{ background: 'white', borderRadius: '16px', padding: '0.75rem', marginBottom: '1rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid #F3F4F6' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: '700', color: '#9CA3AF', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Filter by Species</p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {SPECIES.map(s => (
                            <button
                                key={s}
                                onClick={() => { setSelectedSpecies(s); setShowFilterMenu(false); }}
                                style={{
                                    padding: '6px 14px', borderRadius: '20px', border: '1px solid',
                                    fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer',
                                    background: selectedSpecies === s ? '#111' : 'transparent',
                                    color: selectedSpecies === s ? 'white' : '#374151',
                                    borderColor: selectedSpecies === s ? '#111' : '#E5E7EB',
                                    transition: 'all 0.15s'
                                }}
                            >
                                {SPECIES_EMOJI[s]} {s}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Stats Banner */}
            <div style={{
                background: isLostTab
                    ? 'linear-gradient(135deg, #FEF2F2, #FEE2E2)'
                    : 'linear-gradient(135deg, #F0FDF4, #DCFCE7)',
                borderRadius: '16px', padding: '1rem 1.25rem', marginBottom: '1.25rem',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
                <div>
                    <p style={{ fontSize: '0.75rem', fontWeight: '700', color: isLostTab ? '#B91C1C' : '#065F46', opacity: 0.8, marginBottom: '2px' }}>
                        {isLostTab ? '🚨 Active Alerts' : '✅ Found Reports'}
                    </p>
                    <p style={{ fontSize: '1.5rem', fontWeight: '900', color: isLostTab ? '#EF4444' : '#10B981' }}>
                        {loading ? '...' : pets.length} {pets.length === 1 ? 'pet' : 'pets'}
                    </p>
                </div>
                <button
                    onClick={loadPets}
                    style={{ background: 'white', border: 'none', borderRadius: '12px', padding: '8px', display: 'flex', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                >
                    <RefreshCw size={16} color="#6B7280" />
                </button>
            </div>

            {/* Pets Grid */}
            <section className="results-section" style={{ marginTop: '0' }}>
                {loading ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} style={{ background: '#F9FAFB', borderRadius: '24px', height: '300px', animation: 'pulse 1.5s infinite' }} />
                        ))}
                    </div>
                ) : pets.length > 0 ? (
                    <div className="adoption-grid">
                        {pets.map(pet => (
                            <PetCard key={pet._id} pet={pet} mode={activeTab} />
                        ))}
                    </div>
                ) : (
                    <div className="placeholder-view" style={{ padding: '3rem 1rem' }}>
                        <AlertCircle size={48} color="#D1D5DB" />
                        <p style={{ marginTop: '1rem', fontWeight: '700', color: '#374151' }}>
                            {searchQuery || selectedSpecies !== 'All'
                                ? 'No pets match your search'
                                : isLostTab ? 'No lost pets reported yet.' : 'No found pets reported yet.'}
                        </p>
                        <p style={{ fontSize: '0.85rem', color: '#9CA3AF', marginTop: '6px' }}>
                            {isLostTab ? 'Help the community by sharing any lost pet you see.' : 'Found a stray? Report it to help reunite them!'}
                        </p>
                    </div>
                )}
            </section>

            {/* Action Buttons — inline at end of page content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '1.5rem' }}>
                <button
                    className="btn-floating-cyan"
                    style={{ background: '#EF4444', color: 'white', boxShadow: '0 10px 25px rgba(239,68,68,0.3)', height: '54px', fontSize: '1rem', borderRadius: '18px' }}
                    onClick={() => setShowModal('lost')}
                >
                    <Plus size={20} /> Report Lost Pet
                </button>
                <button
                    className="btn-floating-cyan"
                    style={{ background: '#10B981', color: 'white', boxShadow: '0 10px 25px rgba(16,185,129,0.3)', height: '54px', fontSize: '1rem', borderRadius: '18px' }}
                    onClick={() => setShowModal('found')}
                >
                    <CheckCircle size={20} /> I Found a Pet
                </button>
            </div>

            {/* Modal */}
            {showModal && (
                <ReportModal
                    mode={showModal}
                    onClose={() => setShowModal(null)}
                    onSuccess={() => {
                        setActiveTab(showModal);
                        loadPets();
                    }}
                />
            )}
        </div>
    );
};

export default LostPetsPage;

import React, { useState, useEffect } from 'react';
import { ChevronLeft, Shield, Clock, Plus, Check, Bell, Info, Calendar, MapPin, ChevronRight, Share2, Download, Edit2, X, Activity } from 'lucide-react';
import { fetchPetDetails, fetchHealthCard, fetchVaccinations, fetchMedicalRecords, addVaccination, addMedicalRecord, updatePetDetails } from '../api';
import dogAvatar from '../assets/dog-avatar.png';
import { useToast } from '../components/Toast';

const PetDetailsPage = () => {
    const toast = useToast();
    const [pet, setPet] = useState(null);
    const [healthCard, setHealthCard] = useState(null);
    const [vaccinations, setVaccinations] = useState([]);

    // Add Record States
    const [showAddModal, setShowAddModal] = useState(false);
    const [recordType, setRecordType] = useState('vaccine');
    const [formData, setFormData] = useState({
        title: '',
        date: new Date().toISOString().split('T')[0],
        dueDate: '',
        location: '',
        notes: ''
    });

    // Edit Pet States
    const [showEditPetModal, setShowEditPetModal] = useState(false);
    const [editPetForm, setEditPetForm] = useState({
        name: '',
        species: '',
        breed: '',
        age: '',
        weight: '',
        mood: ''
    });

    const petId = localStorage.getItem('selectedPetId');

    const loadPetData = async () => {
        try {
            const [pRes, hRes, vRes, mRes] = await Promise.all([
                fetchPetDetails(petId),
                fetchHealthCard(petId),
                fetchVaccinations(petId),
                fetchMedicalRecords(petId)
            ]);
            const petData = pRes.data.pet;
            setPet(petData);
            setHealthCard(hRes.data.healthCard);

            setEditPetForm({
                name: petData.name,
                species: petData.species,
                breed: petData.breed,
                age: petData.age,
                weight: petData.weight,
                mood: petData.mood
            });

            const currentUserName = JSON.parse(localStorage.getItem('profile'))?.result?.name || 'You';

            const vData = (vRes.data.vaccines || []).map(v => ({
                ...v,
                type: 'vaccine',
                title: v.vaccineName,
                date: v.dateGiven,
                addedBy: v.vet?.name || currentUserName
            }));

            const mData = (mRes.data.records || []).map(r => ({
                ...r,
                type: 'medical',
                title: r.diagnosis,
                date: r.visitDate,
                addedBy: r.vet?.name || currentUserName
            }));

            const combined = [...vData, ...mData].sort((a, b) => new Date(b.date) - new Date(a.date));
            setVaccinations(combined);
        } catch (err) {
            console.error("Error loading pet details", err);
        }
    };

    useEffect(() => {
        if (!petId) return;
        loadPetData();
    }, [petId]);

    const handleSaveRecord = async (e) => {
        e.preventDefault();
        try {
            if (recordType === 'vaccine') {
                await addVaccination(petId, {
                    vaccineName: formData.title,
                    dateGiven: formData.date,
                    dueDate: formData.dueDate,
                    notes: formData.notes
                });
            } else {
                await addMedicalRecord(petId, {
                    diagnosis: formData.title,
                    visitDate: formData.date,
                    prescription: formData.notes
                });
            }
            setShowAddModal(false);
            loadPetData();
            setFormData({ title: '', date: new Date().toISOString().split('T')[0], dueDate: '', location: '', notes: '' });
        } catch (err) {
            console.error("Error saving record:", err);
            toast({ message: err.response?.data?.message || err.message, title: 'Save Failed', type: 'error' });
        }
    };

    const handleUpdatePet = async (e) => {
        e.preventDefault();
        try {
            await updatePetDetails(petId, editPetForm);
            setShowEditPetModal(false);
            loadPetData();
            toast({ message: 'Pet profile updated!', title: 'Saved ✓', type: 'success' });
        } catch (err) {
            toast({ message: 'Failed to update pet profile', type: 'error' });
        }
    };

    if (!pet) return <div className="placeholder-view">Select a pet from the list first.</div>;

    const upcomingVaccines = vaccinations.filter(v => v.type === 'vaccine' && v.dueDate && new Date(v.dueDate) > new Date());
    const healthScore = 100 - (upcomingVaccines.length * 4);

    return (
        <div className="health-vaccines-page" style={{ paddingTop: '0' }}>
            {/* Header is provided by MainLayout */}

            <section className="pet-health-summary" style={{ marginTop: '0' }}>
                <div className="health-avatar">
                    <img src={pet.image || dogAvatar} alt={pet.name} />
                    <div className="status-dot-green"></div>
                </div>
                <div className="health-info-box">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <h2>{pet.name}</h2>
                            <button className="icon-button" style={{ padding: '4px', height: 'auto' }} onClick={() => setShowEditPetModal(true)}>
                                <Edit2 size={14} color="var(--text-secondary)" />
                            </button>
                        </div>
                        <div className="protected-badge">
                            <Shield size={12} fill="currentColor" />
                            <span>Protected</span>
                        </div>
                    </div>
                    <div className="health-score-row">
                        <span>Health Score: <strong>{healthScore}%</strong></span>
                    </div>
                    <div className="progress-container">
                        <div className="progress-bar-fill" style={{ width: `${healthScore}%` }}></div>
                    </div>
                </div>
            </section>

            <section className="reminders-section">
                <div className="reminders-label">
                    <h4>Reminders</h4>
                    <span className="active-count">{upcomingVaccines.length} Active</span>
                </div>
                {upcomingVaccines.length > 0 ? (
                    <div className="reminder-card">
                        <div className="reminder-icon-bg">
                            <Bell size={20} />
                        </div>
                        <div className="reminder-content">
                            <h5>Vaccination Reminder</h5>
                            <p>{pet.name}'s {upcomingVaccines[0].title} is due in few days. Schedule an appointment now.</p>
                            <div className="reminder-actions">
                                <button className="btn-book-now" onClick={() => window.location.hash = '#/appointments'}>Book Now</button>
                                <button className="btn-dismiss">Dismiss</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="subtitle" style={{ marginBottom: '2rem', textAlign: 'center' }}>No pending reminders</p>
                )}
            </section>

            <section className="timeline-section">
                <header>
                    <h4>Vaccination Timeline</h4>
                    <button className="btn-filter">Filter</button>
                </header>

                <div className="timeline-container">
                    <div className="timeline-line"></div>

                    {vaccinations.map((item, idx) => {
                        const isUpcoming = item.type === 'vaccine' && item.dueDate && new Date(item.dueDate) > new Date();
                        return (
                            <div key={item._id || idx} className="timeline-item">
                                <div className={`timeline-dot ${isUpcoming ? 'upcoming' : 'completed'}`}>
                                    {isUpcoming ? <Clock size={14} /> : <Check size={14} />}
                                </div>
                                <div className="timeline-card">
                                    <header>
                                        <h5>{item.title}</h5>
                                        <span className={`status-tag ${isUpcoming ? 'upcoming' : 'completed'}`}>
                                            {isUpcoming ? 'Upcoming' : 'Completed'}
                                        </span>
                                    </header>
                                    <div className="timeline-card-body">
                                        <p><Calendar size={14} /> {isUpcoming ? `Due: ${new Date(item.dueDate).toLocaleDateString()}` : `Completed: ${new Date(item.date).toLocaleDateString()}`}</p>
                                        <p><MapPin size={14} /> {item.addedBy || item.vet?.name || "Happy Paws Veterinary"}</p>
                                    </div>
                                    <div className="timeline-card-footer">
                                        <button className="btn-view-details">
                                            View Details <ChevronRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            <div className="export-banner">
                <div className="export-icon-box">
                    <Info size={20} color="#111" />
                </div>
                <div className="export-text">
                    <p>Need a digital health certificate?</p>
                    <span>Download a PDF of {pet.name}'s full records.</span>
                </div>
                <button className="btn-export">Export</button>
            </div>

            <div className="sticky-bottom-action">
                <button className="btn-floating-cyan" onClick={() => setShowAddModal(true)}>
                    <Plus size={24} /> Add New Record
                </button>
            </div>

            {/* Combined Add Modal */}
            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modal-content card">
                        <div className="modal-header">
                            <h3>Add New Record</h3>
                            <button className="icon-button" onClick={() => setShowAddModal(false)}><Plus style={{ transform: 'rotate(45deg)' }} /></button>
                        </div>

                        <div className="view-switcher-tabs" style={{ marginBottom: '1.5rem' }}>
                            <button className={`tab-btn ${recordType === 'vaccine' ? 'active' : ''}`} onClick={() => setRecordType('vaccine')}>Vaccination</button>
                            <button className={`tab-btn ${recordType === 'medical' ? 'active' : ''}`} onClick={() => setRecordType('medical')}>Medical</button>
                        </div>

                        <form className="pet-form" onSubmit={handleSaveRecord}>
                            <div className="form-group">
                                <label className="field-label">{recordType === 'vaccine' ? 'Vaccine Name' : 'Diagnosis'}</label>
                                <input type="text" placeholder={recordType === 'vaccine' ? 'e.g. Rabies' : 'e.g. Skin Allergy'} required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="field-label">Date</label>
                                    <input type="date" required value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
                                </div>
                                {recordType === 'vaccine' && (
                                    <div className="form-group">
                                        <label className="field-label">Due Date (Optional)</label>
                                        <input type="date" value={formData.dueDate} onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })} />
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <label className="field-label">Instruction / Notes</label>
                                <textarea
                                    style={{ width: '100%', borderRadius: '12px', padding: '12px', border: '1px solid #e5e7eb', height: '80px' }}
                                    placeholder="Enter any specific notes..."
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                />
                            </div>

                            <button type="submit" className="btn-floating-cyan" style={{ position: 'static', marginTop: '1rem', height: '56px' }}>
                                Save Record
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Pet Modal */}
            {showEditPetModal && (
                <div className="modal-overlay">
                    <div className="modal-content card">
                        <div className="modal-header">
                            <h3>Edit Pet Profile</h3>
                            <button className="icon-button" onClick={() => setShowEditPetModal(false)}>
                                <X size={24} />
                            </button>
                        </div>

                        <form className="pet-form" onSubmit={handleUpdatePet}>
                            <div className="form-group">
                                <label className="field-label">Pet Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter pet name"
                                    className="input-field"
                                    value={editPetForm.name}
                                    onChange={(e) => setEditPetForm({ ...editPetForm, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="field-label">Species</label>
                                    <select
                                        className="input-field"
                                        value={editPetForm.species}
                                        onChange={(e) => setEditPetForm({ ...editPetForm, species: e.target.value })}
                                        required
                                    >
                                        <option value="Dog">Dog</option>
                                        <option value="Cat">Cat</option>
                                        <option value="Bird">Bird</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="field-label">Gender</label>
                                    <select
                                        className="input-field"
                                        value={editPetForm.gender}
                                        onChange={(e) => setEditPetForm({ ...editPetForm, gender: e.target.value })}
                                        required
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="field-label">Breed</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Golden Retriever"
                                    className="input-field"
                                    value={editPetForm.breed}
                                    onChange={(e) => setEditPetForm({ ...editPetForm, breed: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="field-label">Age (Years)</label>
                                    <input
                                        type="number"
                                        className="input-field"
                                        value={editPetForm.age}
                                        onChange={(e) => setEditPetForm({ ...editPetForm, age: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="field-label">Weight (kg)</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        className="input-field"
                                        value={editPetForm.weight}
                                        onChange={(e) => setEditPetForm({ ...editPetForm, weight: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="field-label">Mood</label>
                                <select
                                    className="input-field"
                                    value={editPetForm.mood}
                                    onChange={(e) => setEditPetForm({ ...editPetForm, mood: e.target.value })}
                                    required
                                >
                                    <option value="happy">Happy</option>
                                    <option value="energetic">Energetic</option>
                                    <option value="calm">Calm</option>
                                    <option value="sad">Sad</option>
                                    <option value="angry">Angry</option>
                                </select>
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem', height: '56px' }}>
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PetDetailsPage;


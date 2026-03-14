import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, Clock, ChevronRight, X, Loader2, Calendar, ClipboardList } from 'lucide-react';
import { fetchNearbyVets, bookAppointment, fetchMyPets, fetchMyAppointments } from '../api';
import drSarah from '../assets/dr-sarah.png';
import Button from '../components/Button';
import { useToast } from '../components/Toast';

const AppointmentsPage = () => {
    const toast = useToast();
    const [view, setView] = useState('find'); // 'find' or 'my'
    const [vets, setVets] = useState([]);
    const [pets, setPets] = useState([]);
    const [myAppointments, setMyAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedVet, setSelectedVet] = useState(null);
    const [selectedPet, setSelectedPet] = useState('');
    const [bookingData, setBookingData] = useState({
        date: '',
        time: '10:00',
        reason: ''
    });

    const lat = localStorage.getItem('userLat') || '28.6139';
    const lon = localStorage.getItem('userLon') || '77.2090';

    const loadData = async () => {
        setLoading(true);
        try {
            const [vRes, pRes, aRes] = await Promise.all([
                fetchNearbyVets(lon, lat),
                fetchMyPets(),
                fetchMyAppointments()
            ]);
            setVets(vRes.data.vets || []);
            setPets(pRes.data.pets || []);
            setMyAppointments(aRes.data.appointments || []);
            if (pRes.data.pets?.length > 0) setSelectedPet(pRes.data.pets[0]._id);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [lat, lon]);

    const handleOpenBooking = (vet) => {
        setSelectedVet(vet);
        setShowBookingModal(true);
    };

    const handleConfirmBooking = async (e) => {
        e.preventDefault();
        if (!selectedPet) { toast({ message: 'Please select a pet', type: 'warning' }); return; }

        try {
            const dateTime = new Date(`${bookingData.date}T${bookingData.time}`);
            await bookAppointment({
                pet: selectedPet,
                vet: selectedVet._id,
                date: dateTime,
                reason: bookingData.reason
            });
            toast({ message: 'Appointment scheduled successfully!', title: 'Booked ✓', type: 'success' });
            setShowBookingModal(false);
            setView('my');
            loadData();
        } catch (err) {
            toast({ message: err.response?.data?.message || err.message, title: 'Booking Failed', type: 'error' });
        }
    };

    return (
        <div className="appointments-page">
            <div className="view-switcher-tabs">
                <button className={`tab-btn ${view === 'find' ? 'active' : ''}`} onClick={() => setView('find')}>
                    Find a Vet
                </button>
                <button className={`tab-btn ${view === 'my' ? 'active' : ''}`} onClick={() => setView('my')}>
                    My Bookings
                </button>
            </div>

            {view === 'find' ? (
                <>
                    <div className="search-container">
                        <div className="search-bar-wrapper">
                            <Search size={20} className="search-icon-fixed" />
                            <input type="text" placeholder="Search specialized vets..." />
                        </div>
                        <div className="location-row">
                            <div className="current-location">
                                <MapPin size={16} color="#79e5f7" />
                                <span>Vets near you</span>
                            </div>
                        </div>
                    </div>

                    <div className="section-title-row">
                        <h3>Recommended Experts</h3>
                        <span className="results-count">{vets.length} found</span>
                    </div>

                    {loading ? (
                        <div className="placeholder-view"><Loader2 className="animate-spin" /> Loading experts...</div>
                    ) : (
                        <div className="doctor-cards-list">
                            {vets.length > 0 ? vets.map(doc => (
                                <div key={doc._id} className="doctor-card">
                                    <div className="doctor-info-row">
                                        <div className="doctor-avatar-box">
                                            <img src={`https://ui-avatars.com/api/?name=${doc.name}&background=79e5f7&color=fff&bold=true`} alt={doc.name} />
                                        </div>
                                        <div className="doctor-text">
                                            <h4>{doc.name}</h4>
                                            <p className="doctor-clinic">Professional Veterinary Surgeon</p>
                                            <p className="doctor-contact">
                                                <span>{doc.email}</span>
                                                {doc.phone && <span> · {doc.phone}</span>}
                                            </p>
                                            <div className="doctor-meta-row">
                                                <div className="doctor-meta-item">
                                                    <Star size={14} className="star-filled" fill="#FFC107" color="#FFC107" />
                                                    <span>4.9 (120+)</span>
                                                </div>
                                                <div className="doctor-meta-item">
                                                    <Clock size={14} color="#6B7280" />
                                                    <span>10am - 6pm</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Button variant="outline" fullWidth onClick={() => handleOpenBooking(doc)}>
                                        Schedule Visit <ChevronRight size={18} />
                                    </Button>
                                </div>
                            )) : (
                                <div className="placeholder-view">No vets found in your area.</div>
                            )}
                        </div>
                    )}
                </>
            ) : (
                <div className="my-appointments-list">
                    {loading ? (
                        <div className="placeholder-view"><Loader2 className="animate-spin" /> Loading your bookings...</div>
                    ) : myAppointments.length > 0 ? (
                        myAppointments.map(appt => {
                            const petName = appt.pet?.name || (typeof appt.pet === 'string' ? appt.pet : 'Unknown Pet');
                            const vetName = appt.vet?.name || (typeof appt.vet === 'string' ? appt.vet : 'Unknown Vet');
                            const appointmentDate = appt.date ? new Date(appt.date) : null;
                            const appointmentImage = appt.pet?.image || "https://images.unsplash.com/photo-1543466835-00a7907e9de1";

                            return (
                                <div key={appt._id} className="my-appt-card">
                                    <div className="appt-header">
                                        <div className="pet-mini-avatar">
                                            <img src={appointmentImage} alt={petName} />
                                        </div>
                                        <div className="appt-title-box">
                                            <h5>{appt.reason || 'Appointment'}</h5>
                                            <p>for {petName}</p>
                                        </div>
                                        <span className={`status-badge ${appt.status || 'pending'}`}>{appt.status || 'pending'}</span>
                                    </div>
                                    <div className="appt-details">
                                        <div className="detail-item">
                                            <Calendar size={14} />
                                            <span>{appointmentDate ? appointmentDate.toLocaleDateString() : '--'}</span>
                                        </div>
                                        <div className="detail-item">
                                            <Clock size={14} />
                                            <span>{appointmentDate ? appointmentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--'}</span>
                                        </div>
                                        <div className="detail-item">
                                            <MapPin size={14} />
                                            <span>Dr. {vetName}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="placeholder-view">
                            <ClipboardList size={40} color="#D1D5DB" />
                            <p>You have no upcoming appointments.</p>
                            <Button variant="primary" onClick={() => setView('find')}>Book Now</Button>
                        </div>
                    )}
                </div>
            )}

            {showBookingModal && (
                <div className="modal-overlay">
                    <div className="modal-content card">
                        <div className="modal-header">
                            <h3>Schedule Appointment</h3>
                            <button className="icon-button" onClick={() => setShowBookingModal(false)}><X /></button>
                        </div>
                        <div className="modal-sub-header">
                            <p>Booking with <strong>Dr. {selectedVet?.name}</strong></p>
                        </div>
                        <form onSubmit={handleConfirmBooking} className="pet-form">
                            <div className="form-group">
                                <label className="field-label">Select Your Pet</label>
                                <select value={selectedPet} onChange={(e) => setSelectedPet(e.target.value)} required>
                                    {pets.map(p => <option key={p._id} value={p._id}>{p.name} ({p.species})</option>)}
                                </select>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="field-label">Date</label>
                                    <input type="date" required min={new Date().toISOString().split('T')[0]} onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label className="field-label">Time</label>
                                    <input type="time" required onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="field-label">Reason for Visit</label>
                                <input type="text" placeholder="e.g. Vaccinations, Fever, Checkup" required onChange={(e) => setBookingData({ ...bookingData, reason: e.target.value })} />
                            </div>

                            <Button type="submit" variant="primary" fullWidth style={{ height: '60px', marginTop: '1rem' }}>
                                Confirm Booking
                            </Button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppointmentsPage;



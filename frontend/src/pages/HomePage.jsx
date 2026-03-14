import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Stethoscope, Users, Syringe, Heart, ChevronRight, Search } from 'lucide-react';
import { fetchMyPets, fetchMyAppointments, fetchNotifications, markNotificationRead } from '../api';
import dogAvatar from '../assets/dog-avatar.png';
const HomePage = ({ user }) => {
    const [pets, setPets] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const userName = user?.result?.name?.split(' ')[0] || 'User';

    useEffect(() => {
        const loadData = async () => {
            try {
                const petsRes = await fetchMyPets();
                setPets(petsRes.data.pets || []);

                const apptRes = await fetchMyAppointments();
                setAppointments(apptRes.data.appointments || []);

                const notifRes = await fetchNotifications();
                setNotifications(notifRes.data.notifications || []);
            } catch (err) {
                console.error("Error loading home data", err);
            }
        };
        loadData();
    }, []);

    const handleNotificationClick = async (id, type) => {
        try {
            await markNotificationRead(id);
            setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));

            // If it's a vaccination reminder, optionally redirect to appointments or pets page
            if (type === 'vaccination') {
                window.location.hash = '#/appointments';
            }
        } catch (error) {
            console.error("Error marking notification as read", error);
        }
    };

    const nextAppointment = appointments[0];

    return (
        <div className="home-content">
            <section className="greeting-section">
                <h2>Hi, {userName}! 👋</h2>
                <p>{pets.length > 0 ? `How is ${pets[0].name} doing today?` : "Ready to take care of your furry friends?"}</p>
            </section>

            <section className="my-family-section">
                <div className="section-header">
                    <h3>My Family</h3>
                    <button className="see-all" onClick={() => window.location.hash = '#/pets'}>See All</button>
                </div>
                <div className="horizontal-scroll">
                    {pets.length > 0 ? pets.map(pet => (
                        <div key={pet._id} className="pet-card" onClick={() => {
                            localStorage.setItem('selectedPetId', pet._id);
                            window.location.hash = '#/pet-profile';
                        }}>
                            <img src={pet.image || dogAvatar} alt={pet.name} className="pet-avatar" />
                            <div className="pet-info">
                                <h4>{pet.name}</h4>
                                <p>{pet.breed} • {pet.age} yrs</p>
                                <div className="health-status-bar">
                                    <div className="health-label">
                                        <span>Mood</span>
                                        <span style={{ textTransform: 'capitalize' }}>{pet.mood}</span>
                                    </div>
                                    <div className="progress-track">
                                        <div className="progress-fill" style={{ width: '100%', background: '#10B981' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="pet-card empty" onClick={() => window.location.hash = '#/pets'}>
                            <p>No pets added yet</p>
                        </div>
                    )}
                </div>
            </section>

            {nextAppointment && (
                <section className="appointment-section">
                    <div className="appointment-card">
                        <div className="appointment-badge">Next Appointment</div>
                        <div className="appointment-icon-bg">
                            <Stethoscope size={24} color="white" />
                        </div>
                        <h4>{nextAppointment.reason}</h4>
                        <div className="appointment-time">
                            <Clock size={18} />
                            <span>{new Date(nextAppointment.date).toLocaleString()}</span>
                        </div>
                        <div className="appointment-footer">
                            <div className="clinic-info">
                                <MapPin size={18} />
                                <span>{nextAppointment.vet?.name || "Clinic"}</span>
                            </div>
                            <button className="btn-view" onClick={() => window.location.hash = '#/appointments'}>View</button>
                        </div>
                    </div>
                </section>
            )}

            <section className="quick-actions-section">
                <div className="section-header">
                    <h3>Quick Actions</h3>
                </div>
                <div className="quick-actions-grid">
                    <div className="action-card" onClick={() => window.location.hash = '#/appointments'}>
                        <div className="action-icon-box green">
                            <Calendar size={24} />
                        </div>
                        <span>Book Vet</span>
                    </div>
                    <div className="action-card" onClick={() => window.location.hash = '#/community'}>
                        <div className="action-icon-box orange">
                            <Users size={24} />
                        </div>
                        <span>Community</span>
                    </div>
                    <div className="action-card" onClick={() => window.location.hash = '#/adoption'}>
                        <div className="action-card-icon" style={{ background: '#F5F3FF', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                            <Heart size={24} color="#8B5CF6" />
                        </div>
                        <span style={{ color: '#8B5CF6' }}>Adopt Pet</span>
                    </div>

                    <div className="action-card" onClick={() => window.location.hash = '#/lost-found'}>
                        <div className="action-card-icon" style={{ background: '#FCE7F3', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                            <Search size={24} color="#DB2777" />
                        </div>
                        <span style={{ color: '#DB2777' }}>Lost & Found</span>
                    </div>

                    <div className="action-card" onClick={() => window.location.hash = '#/ai-assistant'}>
                        <div className="action-card-icon" style={{ background: '#E0F2FE', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                            <Stethoscope size={24} color="#0284C7" />
                        </div>
                        <span style={{ color: '#0284C7' }}>AI Assistant</span>
                    </div>

                    <div className="action-card" onClick={() => window.location.hash = '#/report-rescue'}>
                        <div className="action-card-icon" style={{ background: '#FEE2E2', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                            <Heart size={24} color="#DC2626" />
                        </div>
                        <span style={{ color: '#DC2626' }}>Rescue</span>
                    </div>
                </div>
            </section>

            <section className="health-alerts-section">
                <div className="section-header">
                    <h3>Health Alerts</h3>
                </div>
                <div className="alerts-list">
                    {notifications.length > 0 ? notifications.map(notif => (
                        <div
                            key={notif._id}
                            className="alert-item"
                            style={{ opacity: notif.read ? 0.6 : 1, cursor: 'pointer' }}
                            onClick={() => handleNotificationClick(notif._id, notif.type)}
                        >
                            <div className="alert-icon-box">
                                <Syringe size={24} />
                            </div>
                            <div className="alert-content">
                                <div className="alert-title-row">
                                    <h5>{notif.title}</h5>
                                    {!notif.read && <span className="urgent-badge">New</span>}
                                </div>
                                <p>{notif.message}</p>
                            </div>
                            <ChevronRight size={20} color="#9CA3AF" />
                        </div>
                    )) : (
                        <p className="subtitle" style={{ textAlign: 'center', padding: '10px' }}>No active alerts</p>
                    )}
                </div>
            </section>

            <section className="community-cta">
                <div className="community-banner">
                    <div className="community-icon-box">
                        <Heart size={24} color="#111" />
                    </div>
                    <div className="community-content">
                        <h5>Join the Community!</h5>
                        <p>Share, like, and ask for pet advice.</p>
                    </div>
                    <button className="btn-join" onClick={() => window.location.hash = '#/community'}>Open Feed</button>
                </div>
            </section>

        </div>
    );
};

export default HomePage;


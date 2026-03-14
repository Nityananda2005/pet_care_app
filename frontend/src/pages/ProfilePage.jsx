import React, { useState, useEffect } from 'react';
import { User, Mail, Settings, Bell, Shield, LogOut, Camera, ChevronRight, Heart, Star, CreditCard, X, Phone, Save } from 'lucide-react';
import { fetchMyPets, fetchMyAppointments, updateProfile } from '../api';
import { useToast } from '../components/Toast';

const ProfilePage = () => {
    const toast = useToast();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile'))?.result);
    const [petCount, setPetCount] = useState(0);
    const [apptCount, setApptCount] = useState(0);

    // Edit Profile State
    const [showEditModal, setShowEditModal] = useState(false);
    const [editForm, setEditForm] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadStats = async () => {
            try {
                const pets = await fetchMyPets();
                setPetCount(pets.data.pets?.length || 0);

                const appts = await fetchMyAppointments();
                setApptCount(appts.data.appointments?.length || 0);
            } catch (err) {
                console.error(err);
            }
        };
        loadStats();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('profile');
        window.location.hash = '#/welcome';
        window.location.reload();
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await updateProfile(editForm);
            const updatedUser = res.data.result;

            // Update local storage
            const profile = JSON.parse(localStorage.getItem('profile'));
            profile.result = updatedUser;
            localStorage.setItem('profile', JSON.stringify(profile));

            setUser(updatedUser);
            setShowEditModal(false);
            toast({ message: 'Profile updated successfully!', title: 'Saved ✓', type: 'success' });
        } catch (err) {
            toast({ message: err.response?.data?.message || 'Failed to update profile', title: 'Error', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    return (
        <div className="profile-page">
            <div className="profile-header-card">
                <div className="profile-avatar-wrapper">
                    <img
                        src={`https://ui-avatars.com/api/?name=${user.name}&background=79e5f7&color=fff&bold=true`}
                        alt="Profile"
                        className="profile-avatar"
                    />
                    <button className="edit-avatar-btn">
                        <Camera size={16} />
                    </button>
                </div>
                <h3 className="user-name">{user.name}</h3>
                <p className="user-email">{user.email}</p>
                {user.phone && <p className="user-email" style={{ marginTop: '2px' }}>{user.phone}</p>}

                <div className="profile-stats-grid">
                    <div className="stat-box">
                        <h4>{petCount}</h4>
                        <p>Pets</p>
                    </div>
                    <div className="stat-box">
                        <h4>{apptCount}</h4>
                        <p>Appts</p>
                    </div>
                    <div className="stat-box">
                        <h4>0</h4>
                        <p>Posts</p>
                    </div>
                </div>
            </div>

            <div className="profile-menu">
                <div className="menu-item" onClick={() => setShowEditModal(true)}>
                    <div className="menu-icon-box blue">
                        <User size={20} />
                    </div>
                    <div className="menu-text">
                        <h5>Personal Info</h5>
                        <p>Manage your account details</p>
                    </div>
                    <ChevronRight size={18} color="#9CA3AF" />
                </div>

                <div className="menu-item">
                    <div className="menu-icon-box purple">
                        <Bell size={20} />
                    </div>
                    <div className="menu-text">
                        <h5>Notifications</h5>
                        <p>Alerts and reminders</p>
                    </div>
                    <ChevronRight size={18} color="#9CA3AF" />
                </div>

                <div className="menu-item">
                    <div className="menu-icon-box green">
                        <Shield size={20} />
                    </div>
                    <div className="menu-text">
                        <h5>Security</h5>
                        <p>Password and protection</p>
                    </div>
                    <ChevronRight size={18} color="#9CA3AF" />
                </div>

                <div className="menu-item">
                    <div className="menu-icon-box red">
                        <CreditCard size={20} />
                    </div>
                    <div className="menu-text">
                        <h5>Subscription</h5>
                        <p>PawsomeCare Premium</p>
                    </div>
                    <ChevronRight size={18} color="#9CA3AF" />
                </div>
            </div>

            <div className="logout-card" onClick={handleLogout}>
                <LogOut size={20} />
                <span>Sign Out</span>
            </div>

            {/* Edit Profile Modal */}
            {showEditModal && (
                <div className="modal-overlay">
                    <div className="modal-content card">
                        <div className="modal-header">
                            <h3>Edit Profile</h3>
                            <button className="icon-button" onClick={() => setShowEditModal(false)}>
                                <X size={24} />
                            </button>
                        </div>

                        <form className="pet-form" onSubmit={handleUpdateProfile}>
                            <div className="form-group">
                                <label className="field-label">Full Name</label>
                                <div className="input-wrapper">
                                    <User className="input-icon-left" size={20} />
                                    <input
                                        type="text"
                                        className="input-field with-icon-left"
                                        placeholder="Your Name"
                                        value={editForm.name}
                                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="field-label">Email Address</label>
                                <div className="input-wrapper">
                                    <Mail className="input-icon-left" size={20} />
                                    <input
                                        type="email"
                                        className="input-field with-icon-left"
                                        placeholder="email@example.com"
                                        value={editForm.email}
                                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="field-label">Phone Number</label>
                                <div className="input-wrapper">
                                    <Phone className="input-icon-left" size={20} />
                                    <input
                                        type="tel"
                                        className="input-field with-icon-left"
                                        placeholder="+91 00000 00000"
                                        value={editForm.phone}
                                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
                                {loading ? "Updating..." : "Save Changes"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;

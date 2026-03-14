import React, { useState, useEffect } from 'react';
import { Plus, Clock, Weight, Venus, Mars, X } from 'lucide-react';
import { fetchMyPets, addPet } from '../api';
import dogAvatar from '../assets/dog-avatar.png';
import { useToast } from '../components/Toast';

const PetsPage = () => {
    const toast = useToast();
    const [pets, setPets] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        species: 'Dog',
        age: '',
        gender: 'male',
        breed: '',
        weight: '',
        mood: 'happy',
        image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1'
    });

    const loadPets = async () => {
        try {
            const res = await fetchMyPets();
            setPets(res.data.pets || []);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadPets();
    }, []);

    const handleAddPet = async (e) => {
        e.preventDefault();
        try {
            await addPet(formData);
            setShowModal(false);
            loadPets();
        } catch (err) {
            toast({ message: 'Failed to add pet', title: 'Error', type: 'error' });
        }
    };

    return (
        <div className="pets-page">
            <section className="greeting-section">
                <h2>Your Furry Family</h2>
                <p>Manage health and profiles for all your pets.</p>
            </section>

            <div className="pets-grid">
                <div className="add-pet-card" onClick={() => setShowModal(true)}>
                    <div className="plus-icon-box">
                        <Plus size={24} />
                    </div>
                    <h4>Add New Pet</h4>
                    <p>Expand your family</p>
                </div>

                {pets.map((pet) => (
                    <div
                        key={pet._id}
                        className="pet-card-v2"
                        onClick={() => {
                            localStorage.setItem('selectedPetId', pet._id);
                            window.location.hash = '#/pet-profile';
                        }}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="pet-image-container">
                            <img src={pet.image || dogAvatar} alt={pet.name} className="pet-image-v2" />
                            <div className={`gender-badge ${pet.gender}`}>
                                {pet.gender === 'female' ? <Venus size={16} /> : <Mars size={16} />}
                            </div>
                        </div>
                        <div className="pet-details-v2">
                            <div className="pet-name-row">
                                <h4 className="pet-name-v2">{pet.name}</h4>
                                <span className="pet-type-v2">{pet.species}</span>
                            </div>
                            <p className="pet-breed-v2">{pet.breed}</p>
                            <div className="pet-stats">
                                <div className="stat-item">
                                    <Clock size={14} />
                                    <span>{pet.age} yrs</span>
                                </div>
                                <div className="stat-item">
                                    <Weight size={14} />
                                    <span>{pet.weight} kg</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content card">
                        <div className="modal-header">
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Add New Pet</h3>
                            <button type="button" className="icon-button" onClick={() => setShowModal(false)}>
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleAddPet} className="pet-form">
                            <div className="image-upload-container">
                                <div className="image-preview">
                                    <img src={formData.image} alt="Preview" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                                </div>
                                <label className="btn-upload-trigger">
                                    Change Photo
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    setFormData({ ...formData, image: reader.result });
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                    />
                                </label>
                            </div>

                            <input type="text" placeholder="Pet Name" required onChange={(e) => setFormData({ ...formData, name: e.target.value })} />

                            <div className="form-row">
                                <select required onChange={(e) => setFormData({ ...formData, species: e.target.value })}>
                                    <option value="Dog">Dog</option>
                                    <option value="Cat">Cat</option>
                                    <option value="Bird">Bird</option>
                                    <option value="Other">Other</option>
                                </select>
                                <input type="text" placeholder="Breed" required onChange={(e) => setFormData({ ...formData, breed: e.target.value })} />
                            </div>

                            <div className="form-row">
                                <input type="number" placeholder="Age" required onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })} />
                                <input type="number" placeholder="Weight (kg)" required onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) })} />
                            </div>

                            <div className="form-row">
                                <select onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                                <select onChange={(e) => setFormData({ ...formData, mood: e.target.value })}>
                                    <option value="happy">Happy</option>
                                    <option value="energetic">Energetic</option>
                                    <option value="calm">Calm</option>
                                    <option value="sad">Sad</option>
                                </select>
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', height: '60px' }}>
                                Save to Family
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PetsPage;


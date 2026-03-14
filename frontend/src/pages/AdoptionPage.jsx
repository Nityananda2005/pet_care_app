import React, { useState, useEffect } from 'react';
import { Search, Heart, MapPin, Filter, X, Check } from 'lucide-react';
import { fetchAdoptions, requestAdoption, API } from '../api';
import { useToast } from '../components/Toast';

const AdoptionPage = () => {
    const toast = useToast();
    const [pets, setPets] = useState([]);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [requesting, setRequesting] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);

    const categories = [
        { name: 'All', icon: '🐾' },
        { name: 'Dog', icon: '🐶' },
        { name: 'Cat', icon: '🐱' },
        { name: 'Bird', icon: '🦜' },
        { name: 'Other', icon: '🐹' }
    ];

    const loadPets = async () => {
        try {
            const [petsRes, requestsRes] = await Promise.all([
                fetchAdoptions(),
                API.get('/adoption/request') // Direct call since we need all requests for this user
            ]);
            setPets(petsRes.data.pets || []);
            setRequests(requestsRes.data.requests || []);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPets();
    }, []);

    const handleAdopt = async (petId) => {
        setRequesting(petId);
        try {
            await requestAdoption({ petId });
            toast({ message: 'Adoption request sent!', title: 'Request Sent ✓', type: 'success' });
            // Refresh requests to update UI
            const requestsRes = await API.get('/adoption/request');
            setRequests(requestsRes.data.requests || []);
        } catch (err) {
            toast({ message: 'Failed to send adoption request', title: 'Error', type: 'error' });
        } finally {
            setRequesting(null);
        }
    };

    const getImageUrl = (path) => {
        if (!path) return "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=400";
        if (path.startsWith('http')) return path;
        return `http://127.0.0.1:5000/${path}`;
    };

    const filteredPets = pets.filter(pet => {
        const matchesCategory = selectedCategory === 'All' || pet.species === selectedCategory;
        const matchesSearch = pet.petName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pet.breed.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="adoption-page">
            <header className="adoption-header">
                <h2>Find your best friend ✨</h2>
                <p>Nearby animals waiting for home</p>
                <div className="search-bar-rounded" style={{ marginTop: '1.5rem' }}>
                    <Search size={18} color="#9CA3AF" />
                    <input
                        type="text"
                        placeholder="Search by breed or name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </header>

            <section className="categories-section">
                <div className="categories-list">
                    {categories.map(cat => (
                        <div
                            key={cat.name}
                            className={`category-pill ${selectedCategory === cat.name ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(cat.name)}
                        >
                            <span className="cat-icon">{cat.icon}</span>
                            <span className="cat-name">{cat.name === 'All' ? 'All' : `${cat.name}s`}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="results-section">
                <div className="section-header">
                    <h4>Results ({filteredPets.length})</h4>
                    <button className="text-btn-cyan">View All</button>
                </div>

                {loading ? (
                    <div className="placeholder-view">Finding friends...</div>
                ) : (
                    <div className="adoption-grid">
                        {filteredPets.map(pet => (
                            <div key={pet._id} className="adoption-card">
                                <div className="adoption-image-wrapper">
                                    <span className="new-badge">NEW</span>
                                    <button className="heart-fab"><Heart size={16} /></button>
                                    <img src={getImageUrl(pet.image)} alt={pet.petName} />
                                    <div className="distance-tag">
                                        <MapPin size={12} />
                                        <span>{(Math.random() * 5 + 1).toFixed(1)} km</span>
                                    </div>
                                </div>
                                <div className="adoption-info">
                                    <div className="name-row">
                                        <h5>{pet.petName}</h5>
                                        <div className={`gender-mini-badge ${pet.gender}`}>
                                            {pet.gender === 'male' ? '♂' : '♀'}
                                        </div>
                                    </div>
                                    <p className="breed-text">{pet.breed}</p>
                                    <div className="age-text">{pet.age < 1 ? `${pet.age * 12} months` : `${pet.age} years`}</div>
                                    <button
                                        className={`btn-adopt-cyan ${requests.some(req => req.pet?._id === pet._id) ? 'requested' : ''}`}
                                        onClick={() => handleAdopt(pet._id)}
                                        disabled={requesting === pet._id || requests.some(req => req.pet?._id === pet._id)}
                                    >
                                        {requesting === pet._id ? 'Sending...' :
                                            requests.some(req => req.pet?._id === pet._id) ? 'Requested ✓' : 'Adopt'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {showSuccess && (
                <div className="toast-success">
                    <Check size={20} />
                    <span>Adoption request sent!</span>
                </div>
            )}
        </div>
    );
};

export default AdoptionPage;

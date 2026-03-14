import React, { useState, useRef } from 'react';
import { MapPin, AlertCircle, FileText, Camera, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { submitRescueReport } from '../../services/rescueService';
import { useToast } from '../Toast';
import { useNavigate } from 'react-router-dom';

const CONDITIONS = [
    'Injured',
    'Sick / Weak',
    'Bleeding',
    'Trapped',
    'Hit by Vehicle',
    'Other'
];

export default function RescueForm() {
    const [formData, setFormData] = useState({
        location: '',
        condition: '',
        description: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fileInputRef = useRef(null);
    const toast = useToast();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.location || !formData.condition) {
            toast({ message: 'Please provide both location and condition.', type: 'warning' });
            return;
        }

        setIsSubmitting(true);
        try {
            const result = await submitRescueReport({
                ...formData,
                image: imageFile
            });

            if (result.success) {
                toast({ message: result.message, type: 'success' });
                setTimeout(() => {
                    window.location.hash = '#/';
                    navigate('/');
                }, 2000);
            }
        } catch (error) {
            toast({ message: 'Failed to submit report. Please try again.', type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="pet-form" style={{ paddingBottom: '2rem' }}>
            {/* Disclaimer Banner */}
            <div style={{ background: '#FEE2E2', borderLeft: '4px solid #DC2626', padding: '12px', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ position: 'relative', display: 'flex', height: '10px', width: '10px' }}>
                    <span style={{ animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite', position: 'absolute', display: 'inline-flex', height: '100%', width: '100%', borderRadius: '50%', backgroundColor: '#FCA5A5', opacity: 0.75 }}></span>
                    <span style={{ position: 'relative', display: 'inline-flex', borderRadius: '50%', height: '10px', width: '10px', backgroundColor: '#EF4444' }}></span>
                </span>
                <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#991B1B', margin: 0 }}>
                    Your report helps save lives — every second counts!
                </p>
            </div>

            {/* Photo Upload */}
            <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 700, color: '#111', marginBottom: '0.75rem' }}>
                    <Camera size={18} color="#DC2626" />
                    Upload Photo <span style={{ color: '#6B7280', fontWeight: 500 }}>(Optional)</span>
                </label>

                {!imagePreview ? (
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        style={{ width: '100%', height: '140px', border: '2px dashed #E5E7EB', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#F9FAFB', cursor: 'pointer', transition: '0.2s' }}
                    >
                        <ImageIcon size={32} color="#9CA3AF" />
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#6B7280' }}>Tap to select picture</span>
                    </div>
                ) : (
                    <div style={{ position: 'relative', width: '100%', height: '200px', borderRadius: '16px', overflow: 'hidden', backgroundColor: '#000' }}>
                        <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        <button
                            type="button"
                            onClick={removeImage}
                            className="icon-button"
                            style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '6px' }}
                        >
                            <X size={18} />
                        </button>
                    </div>
                )}
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                />
            </div>

            {/* Location */}
            <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 700, color: '#111', marginBottom: '0.75rem' }}>
                    <MapPin size={18} color="#DC2626" />
                    Location <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <div className="input-wrapper">
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="E.g., Sector 14 near the main gate..."
                        className="input-field"
                        required
                    />
                </div>
            </div>

            {/* Condition Dropdown */}
            <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 700, color: '#111', marginBottom: '0.75rem' }}>
                    <AlertCircle size={18} color="#DC2626" />
                    Animal's Condition <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <div className="input-wrapper">
                    <select
                        name="condition"
                        value={formData.condition}
                        onChange={handleChange}
                        className="input-field"
                        style={{ appearance: 'none' }}
                        required
                    >
                        <option value="" disabled>Select a condition</option>
                        {CONDITIONS.map(cond => (
                            <option key={cond} value={cond}>{cond}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Description */}
            <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 700, color: '#111', marginBottom: '0.75rem' }}>
                    <FileText size={18} color="#DC2626" />
                    Additional Details
                </label>
                <div className="input-wrapper">
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe the animal, severity of injury, etc."
                        rows={3}
                        className="input-field"
                        style={{ resize: 'none' }}
                    />
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{ width: '100%', background: isSubmitting ? '#EF4444' : '#DC2626', opacity: isSubmitting ? 0.7 : 1, marginTop: '1rem', height: '54px' }}
            >
                {isSubmitting ? (
                    <>
                        <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                        Submitting Report...
                    </>
                ) : (
                    'Report Emergency'
                )}
            </button>
        </form>
    );
}

import React, { useState } from 'react';
import { User, Mail, Lock, CheckCircle } from 'lucide-react';
import Input from '../components/Input';
import Button from '../components/Button';
import dogAvatar from '../assets/dog-avatar.png';
import * as api from '../api/index';
import { useToast } from '../components/Toast';

const RegisterPage = () => {
    const toast = useToast();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'pet_owner'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.password !== formData.confirmPassword) {
                toast({ message: "Passwords don't match", title: 'Check Password', type: 'warning' });
                return;
            }
            const { data } = await api.register(formData);
            localStorage.setItem('profile', JSON.stringify(data));
            window.location.hash = '#/'; // Navigate to home after successful registration
        } catch (error) {
            console.error(error);
            toast({ message: error.response?.data?.message || 'Registration failed', title: 'Error', type: 'error' });
        }
    };

    return (
        <div className="app-container">
            <div className="card">
                <div className="avatar-container">
                    <img src={dogAvatar} alt="Happy Dog" />
                </div>

                <h1>Join PawsomeCare</h1>
                <p className="subtitle">Start your journey with us today.</p>

                <form onSubmit={handleSubmit}>
                    <Input
                        label="Full Name"
                        icon={User}
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />

                    <Input
                        label="Email Address"
                        icon={Mail}
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />

                    <Input
                        label="Password"
                        icon={Lock}
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />

                    <Input
                        label="Confirm Password"
                        icon={CheckCircle}
                        type="password"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    />

                    <Button variant="primary">
                        Create Account
                    </Button>

                    <Button variant="secondary" type="button" onClick={() => window.location.hash = '#/login'}>
                        Back to Login
                    </Button>
                </form>

                <p className="footer-text">
                    By registering, you agree to PawsomeCare's<br />
                    <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;

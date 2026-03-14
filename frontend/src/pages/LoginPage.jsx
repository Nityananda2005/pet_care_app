import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import Input from '../components/Input';
import Button from '../components/Button';
import dogAvatar from '../assets/dog-avatar.png';
import * as api from '../api/index';
import { useToast } from '../components/Toast';

const LoginPage = () => {
    const toast = useToast();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.login(formData);

            if (data.result.role !== 'pet_owner') {
                toast({ message: 'This app is for Pet Owners only. Please use the Web Dashboard for your role.', title: 'Wrong Role', type: 'warning' });
                return;
            }

            localStorage.setItem('profile', JSON.stringify(data));
            window.location.hash = '#/'; // Navigate to home after successful login
        } catch (error) {
            console.error(error);
            toast({ message: error.response?.data?.message || 'Login failed', title: 'Login Failed', type: 'error' });
        }
    };

    return (
        <div className="app-container">
            <div className="card">
                <div className="avatar-container">
                    <img src={dogAvatar} alt="Happy Dog" />
                </div>

                <h1>Welcome Back!</h1>
                <p className="subtitle">Your furry friends missed you.</p>

                <form onSubmit={handleSubmit}>
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
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        iconRight={showPassword ? EyeOff : Eye}
                        onIconRightClick={() => setShowPassword(!showPassword)}
                    />

                    <div className="form-options">
                        <label className="remember-me">
                            <input type="checkbox" />
                            <span>Remember me</span>
                        </label>
                        <a href="#" className="forgot-password">Forgot Password?</a>
                    </div>

                    <Button variant="primary" icon={ArrowRight}>
                        Login
                    </Button>

                    <Button variant="secondary" type="button" onClick={() => window.location.hash = '#/register'}>
                        Register Account
                    </Button>
                </form>

                <p className="footer-text">
                    By continuing, you agree to PawsomeCare's<br />
                    <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
                </p>
            </div>
        </div>
    );
};

export default LoginPage;

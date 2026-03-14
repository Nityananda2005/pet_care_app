import React from 'react';
import { PawPrint, Target } from 'lucide-react';
import welcomeImg from '../assets/welcome_pets.png';

const WelcomePage = () => {
    const handleStart = () => {
        window.location.hash = '#/login';
    };

    return (
        <div className="welcome-page" onClick={handleStart}>
            <div className="welcome-content">
                <div className="paw-circle">
                    <PawPrint size={40} color="#fff" fill="#fff" />
                </div>

                <h3 className="welcome-title">WELCOME TO THE FAMILY</h3>
                <p className="welcome-subtitle">
                    Compassionate care for your best friends, all in one place.
                </p>

                <div className="welcome-img-container">
                    <img src={welcomeImg} alt="Welcome Pets" />
                </div>

                <div className="welcome-bottom">
                    <div className="dots-indicator">
                        <span className="dot active"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>

                    <p className="loading-text">LOADING YOUR EXPERIENCE</p>

                    <div className="start-btn-pill">
                        <div className="target-icon-box">
                            <Target size={20} color="#fff" />
                        </div>
                        <span>Tap anywhere to start</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;

import React, { useState, useEffect } from 'react';
import { Syringe, CalendarClock, BellRing, Info, Activity } from 'lucide-react';
import { fetchNotifications, fetchMyAppointments } from '../api';
import '../AlertsPage.css';

const AlertsPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAlertsData = async () => {
            setLoading(true);
            try {
                // Fetch Notifications (This now includes upcoming vaccinations)
                const notifRes = await fetchNotifications();
                setNotifications(notifRes.data.notifications || []);

                // Fetch Appointments
                const apptRes = await fetchMyAppointments();
                setAppointments(apptRes.data.appointments || []);

            } catch (err) {
                console.error("Error loading alerts data", err);
            } finally {
                setLoading(false);
            }
        };

        loadAlertsData();
    }, []);

    const allItems = [
        ...notifications.map(n => ({ ...n, dateStr: n.createdAt })),
        ...appointments.map(a => ({ ...a, type: 'appointment', dateStr: a.date, title: `Upcoming Appointment for ${a.pet?.name || 'Pet'}`, message: a.reason }))
    ].sort((a, b) => new Date(b.dateStr) - new Date(a.dateStr)); // Sort newest/closest first

    if (loading) {
        return <div className="loading-state">Loading alerts...</div>;
    }

    return (
        <div className="alerts-page">
            <div className="alerts-container">
                {allItems.length > 0 ? (
                    allItems.map((item, index) => {
                        let Icon = Info;
                        let iconColor = "#3B82F6";
                        let iconBg = "#DBEAFE";

                        if (item.type === 'vaccination') {
                            Icon = Syringe;
                            iconColor = "#10B981";
                            iconBg = "#D1FAE5";
                        } else if (item.type === 'appointment') {
                            Icon = CalendarClock;
                            iconColor = "#F59E0B";
                            iconBg = "#FEF3C7";
                        } else {
                            Icon = BellRing;
                            iconColor = "#6366F1";
                            iconBg = "#E0E7FF";
                        }

                        return (
                            <div key={item._id || index} className={`alert-card ${item.read ? 'read' : 'unread'}`}>
                                <div className="alert-icon-wrapper" style={{ backgroundColor: iconBg }}>
                                    <Icon size={24} color={iconColor} />
                                </div>
                                <div className="alert-content-wrapper">
                                    <h4 className="alert-title">{item.title}</h4>
                                    <p className="alert-message">{item.message}</p>
                                    <span className="alert-date">
                                        {new Date(item.dateStr).toLocaleDateString(undefined, {
                                            month: 'short', day: 'numeric', year: 'numeric'
                                        })}
                                    </span>
                                </div>
                                {item.type === 'notification' && !item.read && (
                                    <div className="alert-new-dot"></div>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <div className="empty-alerts">
                        <Activity size={48} color="#9CA3AF" />
                        <h3>You're all caught up!</h3>
                        <p>No new alerts or notifications at this time.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AlertsPage;

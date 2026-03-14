import { useNavigate } from 'react-router-dom';
import {
    AlertTriangle,
    Search,
    ClipboardList,
    ShieldCheck,
    ArrowRight,
    Calendar,
    Info,
    RefreshCw,
} from 'lucide-react';
import { isMedicalIssue } from '../../utils/isMedicalIssue';

/**
 * Urgency level to visual config mapping.
 */
const URGENCY_CONFIG = {
    Low: {
        color: '#059669',
        bg: '#ECFDF5',
        border: '1px solid #A7F3D0',
        icon: <ShieldCheck size={18} color="#10B981" />,
        label: 'Low Urgency',
    },
    Moderate: {
        color: '#D97706',
        bg: '#FFFBEB',
        border: '1px solid #FDE68A',
        icon: <AlertTriangle size={18} color="#F59E0B" />,
        label: 'Moderate Urgency',
    },
    High: {
        color: '#DC2626',
        bg: '#FEF2F2',
        border: '1px solid #FECACA',
        icon: <AlertTriangle size={18} color="#EF4444" />,
        label: 'High Urgency',
    },
};

/**
 * Displays the structured AI diagnosis result in a styled card.
 * @param {{ result: object | null, userInput: string, onAskAnother: () => void }} props
 */
export default function AIResponseCard({ result, userInput = '', onAskAnother }) {
    const navigate = useNavigate();

    if (!result) return null;

    const urgency = URGENCY_CONFIG[result.urgencyLevel] || URGENCY_CONFIG.Moderate;
    const showVetButton = isMedicalIssue(userInput);

    return (
        <div style={{ margin: '0 1rem 1rem 1rem', animation: 'fadeInUp 0.3s ease-out' }}>
            <div style={{ borderRadius: '16px', border: '1px solid #E5E7EB', background: '#fff', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                {/* Header */}
                <div style={{ background: 'linear-gradient(to right, #0284C7, #38BDF8)', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ClipboardList size={18} color="#fff" />
                    <h3 style={{ color: '#fff', fontWeight: 600, fontSize: '0.875rem', margin: 0 }}>AI Diagnosis Summary</h3>
                </div>

                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Urgency Badge */}
                    <div>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, border: urgency.border, background: urgency.bg, color: urgency.color }}>
                            {urgency.icon}
                            {urgency.label}
                        </div>
                    </div>

                    {/* Possible Causes */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                            <Search size={16} color="#0EA5E9" />
                            <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#111827', margin: 0 }}>Possible Causes</h4>
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 0 4px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {result.possibleCauses.map((cause, i) => (
                                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.875rem', color: '#6B7280' }}>
                                    <ArrowRight size={14} color="#0284C7" style={{ marginTop: '2px', flexShrink: 0 }} />
                                    <span>{cause}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Divider */}
                    <hr style={{ border: 0, borderTop: '1px solid #E5E7EB', margin: 0 }} />

                    {/* Recommended Action */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                            <ClipboardList size={16} color="#0EA5E9" />
                            <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#111827', margin: 0 }}>Recommended Action</h4>
                        </div>
                        <div style={{ background: '#F8FAFC', borderRadius: '12px', padding: '12px 16px', fontSize: '0.875rem', color: '#111827', lineHeight: 1.6, border: '1px solid #DCFCE7' }}>
                            {result.recommendedAction}
                        </div>
                    </div>

                    {/* Disclaimer */}
                    <p style={{ fontSize: '0.7rem', color: '#9CA3AF', fontStyle: 'italic', lineHeight: 1.6, margin: 0 }}>
                        ⚕️ This is an AI-generated analysis and should not replace professional veterinary advice.
                        Always consult a licensed veterinarian for proper diagnosis.
                    </p>

                    {/* Book Vet Appointment CTA — only for medical queries */}
                    {showVetButton && (
                        <button
                            onClick={() => {
                                window.location.hash = '#/appointments';
                                navigate('/appointments');
                            }}
                            className="btn btn-primary"
                            style={{ width: '100%', background: '#059669', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                        >
                            <Calendar size={18} />
                            Book Vet Appointment
                        </button>
                    )}

                    {/* Info message for non-medical / advice queries */}
                    {!showVetButton && (
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '12px', padding: '12px 16px' }}>
                            <Info size={16} color="#3B82F6" style={{ marginTop: '2px', flexShrink: 0 }} />
                            <p style={{ fontSize: '0.75rem', color: '#1D4ED8', lineHeight: 1.6, margin: 0 }}>
                                This appears to be a general care question. A vet appointment may not be necessary.
                            </p>
                        </div>
                    )}

                    {/* Ask Another Question */}
                    {onAskAnother && (
                        <button
                            onClick={onAskAnother}
                            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '4px', color: '#059669', fontSize: '0.875rem', fontWeight: 500, padding: '8px', background: 'transparent', border: 'none', cursor: 'pointer' }}
                        >
                            <RefreshCw size={14} />
                            Ask Another Question
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

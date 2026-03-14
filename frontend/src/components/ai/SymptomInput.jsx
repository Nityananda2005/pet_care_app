import { useState } from 'react';
import { SendHorizonal } from 'lucide-react';

/**
 * Symptom input area with a textarea and "Analyze Symptoms" button.
 * @param {{ onSubmit: (text: string) => void, isLoading: boolean }} props
 */
export default function SymptomInput({ onSubmit, isLoading }) {
    const [text, setText] = useState('');

    const handleSubmit = () => {
        if (!text.trim() || isLoading) return;
        onSubmit(text.trim());
        setText('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div style={{ borderTop: '1px solid #E5E7EB', background: '#fff', padding: '1.25rem 1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                {/* Textarea */}
                <div style={{ flex: 1, position: 'relative' }}>
                    <textarea
                        id="symptom-input"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Describe your pet's symptoms… (e.g. My dog has been scratching)"
                        rows={3}
                        disabled={isLoading}
                        className="input-field"
                        style={{
                            height: '80px',
                            resize: 'none',
                            padding: '14px 16px',
                            fontSize: '0.9rem',
                            lineHeight: '1.5',
                            overflowY: 'auto'
                        }}
                    />
                </div>

                {/* Submit Button */}
                <button
                    id="analyze-btn"
                    onClick={handleSubmit}
                    disabled={!text.trim() || isLoading}
                    className="btn btn-primary"
                    style={{
                        padding: '0 1.5rem',
                        height: '80px',
                        opacity: (!text.trim() || isLoading) ? 0.5 : 1,
                        background: '#0284C7',
                        width: 'auto',
                        whiteSpace: 'nowrap',
                        flexShrink: 0
                    }}
                >
                    <SendHorizonal size={18} />
                    <span style={{ fontSize: '0.9rem' }}>Analyze</span>
                </button>
            </div>

            <p style={{ marginTop: '0.75rem', fontSize: '0.7rem', color: '#9CA3AF', textAlign: 'center' }}>
                Press <kbd style={{ padding: '2px 4px', borderRadius: '4px', background: '#F3F4F6', border: '1px solid #E5E7EB', fontFamily: 'monospace' }}>Enter</kbd> to send · <kbd style={{ padding: '2px 4px', borderRadius: '4px', background: '#F3F4F6', border: '1px solid #E5E7EB', fontFamily: 'monospace' }}>Shift + Enter</kbd> for new line
            </p>
        </div>
    );
}

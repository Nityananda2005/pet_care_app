import { Bot, User } from 'lucide-react';

/**
 * A single chat message bubble.
 * @param {{ message: { id: string, type: 'user' | 'ai', text: string, timestamp: Date } }} props
 */
export default function ChatMessage({ message }) {
    const isUser = message.type === 'user';

    return (
        <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: '10px',
            flexDirection: isUser ? 'row-reverse' : 'row',
            animation: 'fadeInUp 0.3s ease-out'
        }}>
            {/* Avatar */}
            <div style={{
                flexShrink: 0,
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
                background: isUser ? '#0284C7' : 'linear-gradient(to bottom right, #10B981, #34D399)',
                color: 'white'
            }}>
                {isUser ? <User size={16} /> : <Bot size={16} />}
            </div>

            {/* Bubble */}
            <div style={{
                position: 'relative',
                maxWidth: '75%',
                padding: '12px 16px',
                fontSize: '0.85rem',
                lineHeight: 1.6,
                boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
                background: isUser ? '#0284C7' : '#F9FAFB',
                color: isUser ? 'white' : '#111827',
                borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                border: isUser ? 'none' : '1px solid #E5E7EB'
            }}>
                {/* Preserve newlines */}
                <p style={{ whiteSpace: 'pre-line', margin: 0 }}>{message.text}</p>

                {/* Timestamp */}
                <span style={{
                    display: 'block',
                    marginTop: '6px',
                    fontSize: '0.65rem',
                    color: isUser ? '#BAE6FD' : '#9CA3AF'
                }}>
                    {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </span>
            </div>
        </div>
    );
}

import { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';

/**
 * Scrollable chat area that renders all messages and a loading indicator.
 * @param {{ messages: Array, isLoading: boolean }} props
 */
export default function ChatContainer({ messages, isLoading }) {
    const bottomRef = useRef(null);

    // Auto-scroll to the latest message
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    return (
        <div style={{ padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
            ))}

            {/* Loading indicator */}
            {isLoading && (
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', animation: 'fadeInUp 0.3s ease-out' }}>
                    {/* AI avatar */}
                    <div style={{
                        flexShrink: 0,
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'linear-gradient(to bottom right, #10B981, #34D399)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)'
                    }}>
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: '16px', height: '16px', color: 'white' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                        </svg>
                    </div>

                    {/* Typing dots */}
                    <div style={{ background: '#fff', borderRadius: '16px 16px 16px 4px', border: '1px solid #E5E7EB', padding: '14px 20px', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0284C7', animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite', animationDelay: '0ms' }} />
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0284C7', animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite', animationDelay: '200ms' }} />
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0284C7', animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite', animationDelay: '400ms' }} />
                            <span style={{ marginLeft: '8px', fontSize: '0.75rem', color: '#6B7280' }}>Analyzing symptoms…</span>
                        </div>
                    </div>
                </div>
            )}

            <div ref={bottomRef} />
        </div>
    );
}

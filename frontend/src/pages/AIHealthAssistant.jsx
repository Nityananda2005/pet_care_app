import { PawPrint, RotateCcw } from 'lucide-react';
import ChatContainer from '../components/ai/ChatContainer';
import SymptomInput from '../components/ai/SymptomInput';
import AIResponseCard from '../components/ai/AIResponseCard';
import { useAIChat } from '../hooks/useAIChat';

/**
 * Main page — AI Pet Health Assistant.
 */
export default function AIHealthAssistant() {
    const {
        messages,
        isLoading,
        latestResult,
        lastUserInput,
        sendMessage,
        clearChat,
        resetForNewQuestion,
    } = useAIChat();

    return (
        <div className="ai-assistant-page" style={{ height: 'calc(100vh - 150px)', display: 'flex', flexDirection: 'column' }}>
            <div className="chat-actions" style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '10px' }}>
                <button
                    id="clear-chat-btn"
                    onClick={clearChat}
                    title="Clear chat"
                    className="icon-button"
                    style={{ background: '#FCE7F3', color: '#DB2777' }}
                >
                    <RotateCcw size={16} />
                </button>
            </div>

            {/* ── Scrollable Area: Chat + AI Response Card ── */}
            <div className="chat-content flex-1 overflow-y-auto flex flex-col hide-scrollbar" style={{ paddingBottom: '20px' }}>
                <ChatContainer messages={messages} isLoading={isLoading} />

                {/* ── AI Response Card ── */}
                <AIResponseCard
                    result={latestResult}
                    userInput={lastUserInput}
                    onAskAnother={resetForNewQuestion}
                />
            </div>

            {/* ── Input ── */}
            <SymptomInput onSubmit={sendMessage} isLoading={isLoading} />
        </div>
    );
}

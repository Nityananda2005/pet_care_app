import { useState, useCallback } from 'react';
import { analyzeSymptoms } from '../services/aiService';

/**
 * Custom hook for managing AI chat state.
 */
export function useAIChat() {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      type: 'ai',
      text: "Hello! 🐾 I'm your AI Pet Health Assistant. Describe your pet's symptoms below and I'll help you understand what might be going on.",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [latestResult, setLatestResult] = useState(null);
  const [lastUserInput, setLastUserInput] = useState('');

  const sendMessage = useCallback(async (symptoms) => {
    if (!symptoms.trim() || isLoading) return;

    // Add user message
    const userMsg = {
      id: `user-${Date.now()}`,
      type: 'user',
      text: symptoms,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setLastUserInput(symptoms);
    setIsLoading(true);
    setLatestResult(null);

    try {
      const result = await analyzeSymptoms(symptoms);

      // Build AI text summary
      const aiText = `Based on the symptoms you described, here's my analysis:\n\n• Possible causes identified\n• Urgency: ${result.urgencyLevel}\n• Action plan ready\n\nCheck the diagnosis card below for full details.`;

      const aiMsg = {
        id: `ai-${Date.now()}`,
        type: 'ai',
        text: aiText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setLatestResult(result);
    } catch (error) {
      const errorMsg = {
        id: `error-${Date.now()}`,
        type: 'ai',
        text: `⚠️ ${error.message || "Something went wrong while analyzing the symptoms. Please try again."}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const clearChat = useCallback(() => {
    setMessages([
      {
        id: 'welcome',
        type: 'ai',
        text: "Hello! 🐾 I'm your AI Pet Health Assistant. Describe your pet's symptoms below and I'll help you understand what might be going on.",
        timestamp: new Date(),
      },
    ]);
    setLatestResult(null);
    setLastUserInput('');
  }, []);

  /** Reset analysis result so the user can ask another question (keeps chat history). */
  const resetForNewQuestion = useCallback(() => {
    setLatestResult(null);
    setLastUserInput('');
  }, []);

  return {
    messages,
    isLoading,
    latestResult,
    lastUserInput,
    sendMessage,
    clearChat,
    resetForNewQuestion,
  };
}

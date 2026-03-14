/**
 * AI Service — calls the backend API for real Groq-powered analysis.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api';

/**
 * Analyze pet symptoms using the AI backend.
 * @param {string} symptoms — the user-described symptoms
 * @returns {Promise<{ possibleCauses: string[], urgencyLevel: string, recommendedAction: string }>}
 */
export async function analyzeSymptoms(symptoms) {
  const response = await fetch(`${API_BASE_URL}/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ symptoms }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Server error: ${response.status}`);
  }

  return response.json();
}

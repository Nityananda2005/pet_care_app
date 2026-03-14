const Groq = require('groq-sdk');
require('dotenv').config();

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `You are an expert AI veterinary health assistant. When a user describes their pet's symptoms, analyze them carefully and respond with ONLY a valid JSON object (no markdown, no code fences, no extra text) in this exact format:

{
  "possibleCauses": ["cause 1", "cause 2", "cause 3"],
  "urgencyLevel": "Low" | "Moderate" | "High",
  "recommendedAction": "A detailed paragraph of what the pet owner should do, including home care tips and when to see a vet."
}

Guidelines:
- Provide exactly 3 possible causes, ordered from most to least likely.
- Set urgencyLevel to "Low" for minor issues, "Moderate" for concerning symptoms, and "High" for potentially life-threatening situations.
- The recommendedAction should be practical, caring, and specific to the symptoms described.
- Always remind that this is AI-generated advice and a licensed veterinarian should be consulted.
- Be empathetic and professional in your recommendations.
- If the user input is not about pet health, still respond with the JSON format but set possibleCauses to ["Not a pet health query"], urgencyLevel to "Low", and recommendedAction explaining that you specialize in pet health.`;

exports.analyzeSymptoms = async (req, res) => {
    try {
        const { symptoms } = req.body;

        if (!symptoms || typeof symptoms !== 'string' || !symptoms.trim()) {
            return res.status(400).json({
                error: 'Please provide a valid symptoms description.',
            });
        }

        console.log(`\n🐾 Analyzing symptoms: "${symptoms.substring(0, 80)}..."`);

        // Call Groq LLM
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                { role: 'user', content: symptoms.trim() },
            ],
            model: 'llama-3.3-70b-versatile',
            temperature: 0.4,
            max_tokens: 1024,
        });

        const rawResponse = chatCompletion.choices[0]?.message?.content || '';
        console.log('📋 Raw AI response:', rawResponse.substring(0, 200));

        // Parse the JSON from the LLM response
        let parsed;
        try {
            // Try to extract JSON if the model wrapped it in markdown code fences
            const jsonMatch = rawResponse.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                parsed = JSON.parse(jsonMatch[0]);
            } else {
                throw new Error('No JSON object found in response');
            }
        } catch (parseError) {
            console.error('⚠️  Failed to parse AI response:', parseError.message);
            // Return a safe fallback
            parsed = {
                possibleCauses: [
                    'Unable to parse AI analysis — please try rephrasing your symptoms',
                ],
                urgencyLevel: 'Moderate',
                recommendedAction:
                    'We could not fully analyze the symptoms. Please try describing them in more detail, or consult a veterinarian directly for professional advice.',
            };
        }

        // Validate structure
        const result = {
            possibleCauses: Array.isArray(parsed.possibleCauses)
                ? parsed.possibleCauses
                : ['Unknown'],
            urgencyLevel: ['Low', 'Moderate', 'High'].includes(parsed.urgencyLevel)
                ? parsed.urgencyLevel
                : 'Moderate',
            recommendedAction:
                typeof parsed.recommendedAction === 'string'
                    ? parsed.recommendedAction
                    : 'Please consult a licensed veterinarian for a proper diagnosis.',
        };

        console.log('✅ Sending structured response — Urgency:', result.urgencyLevel);
        res.json(result);
    } catch (error) {
        console.error('❌ Server error:', error.message);

        // Handle specific Groq errors
        if (error.status === 401) {
            return res.status(500).json({
                error: 'Invalid API key. Please check your GROQ_API_KEY in the .env file.',
            });
        }
        if (error.status === 429) {
            return res.status(429).json({
                error: 'Rate limit exceeded. Please wait a moment and try again.',
            });
        }

        res.status(500).json({
            error: 'Something went wrong while analyzing symptoms. Please try again.',
        });
    }
};

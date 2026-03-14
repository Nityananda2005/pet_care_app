/**
 * Determines if a user's input likely describes a medical issue requiring a vet appointment.
 * @param {string} input - The user's symptoms description.
 * @returns {boolean} - True if it contains medical keywords, false otherwise.
 */
export const isMedicalIssue = (input) => {
    if (!input || typeof input !== 'string') return false;

    const medicalKeywords = [
        'vomit', 'blood', 'bleed', 'limp', 'pain', 'cry', 'diarrhea', 'seizure',
        'collapse', 'chok', 'swallow', 'breathe', 'breath', 'unconscious', 'fever',
        'lethargic', 'not eating', 'not drinking', 'wound', 'bite', 'swelling', 'poison',
        'injury', 'injured', 'broken'
    ];

    const lowerInput = input.toLowerCase();

    // Check if any medical keyword exists in the user input
    return medicalKeywords.some(keyword => lowerInput.includes(keyword));
};

import { API } from '../api';

/**
 * Submits a rescue report to the backend API.
 *
 * @param {Object} data
 * @param {File|null}   data.image       - Uploaded photo of the animal
 * @param {string}      data.location    - User-entered location description
 * @param {string}      data.condition   - Selected condition (e.g. "Injured", "Bleeding")
 * @param {string}      data.description - Free-text description of what the user saw
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export async function submitRescueReport(data) {
  const formData = new FormData();
  formData.append('location', data.location);
  formData.append('condition', data.condition);
  formData.append('description', data.description || '');
  if (data.image) {
    formData.append('image', data.image);
  }

  try {
    const response = await API.post('/rescues/report', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('[rescueService] Error submitting rescue report:', error);
    throw error;
  }
}

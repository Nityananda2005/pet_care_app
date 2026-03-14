import axios from 'axios';

export const API = axios.create({ baseURL: import.meta.env.VITE_BASE_URL || 'http://127.0.0.1:5000/api' });

// Add a request interceptor to include the JWT token in headers
API.interceptors.request.use((req) => {
    const profile = localStorage.getItem('profile');
    if (profile) {
        req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`;
    }
    return req;
});

// Add a response interceptor to handle unauthorized access
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('profile');
            window.location.hash = '#/login';
            window.location.reload(); // Force reload to clear all states and redirect properly
        }
        return Promise.reject(error);
    }
);

export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);
export const updateProfile = (formData) => API.patch('/auth/update-profile', formData);

// Pets
export const fetchMyPets = () => API.get('/pets/my-pets');
export const addPet = (petData) => API.post('/pets/add', petData);
export const updatePetDetails = (id, petData) => API.put(`/pets/${id}`, petData);
export const fetchPetDetails = (id) => API.get(`/pets/${id}`);
export const fetchHealthCard = (id) => API.get(`/pets/${id}/health-card`);

// Appointments
export const bookAppointment = (data) => API.post('/appointment/book', data);
export const fetchMyAppointments = () => API.get('/appointment/my');

// Adoption
export const fetchAdoptions = () => API.get('/adoption');
export const addAdoption = (data) => API.post('/adoption/add', data);
export const requestAdoption = (data) => API.post('/adoption/request', data);

// Lost Pets
export const reportLostPet = (data) => API.post('/lostpets/report', data);
export const fetchLostPets = (params) => API.get('/lostpets', { params });
export const reportFoundPet = (data) => API.post('/lostpets/found', data);
export const fetchFoundPets = (params) => API.get('/lostpets/found', { params });

// Posts & Community
export const fetchPosts = () => API.get('/posts');
export const createPost = (data) => API.post('/posts/create', data);
export const toggleLikePost = (id) => API.put(`/posts/like/${id}`);
export const addComment = (data) => API.post('/comments/add', data);
export const fetchComments = (postId) => API.get(`/comments/${postId}`);

// Emergency & Notifications
export const fetchNearbyVets = (lon, lat) => API.get(`/emergency/nearby-vets?longitude=${lon}&latitude=${lat}`);
export const fetchNotifications = () => API.get('/notifications');
export const markNotificationRead = (id) => API.put(`/notifications/${id}/read`);

// Medical & Vaccination
export const addMedicalRecord = (id, data) => API.post(`/pets/${id}/medical-history`, data);
export const addVaccination = (id, data) => API.post(`/pets/${id}/vaccination`, data);
export const fetchMedicalRecords = (id) => API.get(`/pets/${id}/medical-history`);
export const fetchVaccinations = (id) => API.get(`/pets/${id}/vaccinations`);


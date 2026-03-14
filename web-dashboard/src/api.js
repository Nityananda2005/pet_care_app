import axios from 'axios';

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api' });

// Add a request interceptor to include the JWT token in headers
API.interceptors.request.use((req) => {
    const profile = localStorage.getItem('profile');
    if (profile) {
        req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`;
    }
    return req;
});

// Auth
export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);

// Vet Dashboard
export const fetchVetStats = () => API.get('/appointment/vet-stats');
export const fetchVetAppointments = () => API.get('/appointment/vet');
export const updateAppointmentStatus = (id, status) => API.put(`/appointment/status/${id}`, { status });

// Medical Records
export const fetchVetMedicalHistory = () => API.get('/medical/history');
export const fetchPetMedicalRecords = (petId) => API.get(`/pets/${petId}/medical-history`);
export const fetchPetVaccinations = (petId) => API.get(`/pets/${petId}/vaccinations`);

// Shelter Dashboard
export const fetchShelterStats = () => API.get('/adoption/shelter-stats');
export const fetchShelterPets = () => API.get('/adoption/my-pets');
export const fetchShelterAdoptionRequests = () => API.get('/adoption/my-requests');
export const updateAdoptionRequestStatus = (id, status) => API.put(`/adoption/request-status/${id}`, { status });
export const addAdoptionPet = (data) => API.post('/adoption/add', data);
export const fetchRescueOperations = () => API.get('/rescues');
export const updateRescueStatus = (id, status) => API.patch(`/rescues/${id}/status`, { status });

// Store Dashboard
export const fetchStoreStats = () => API.get('/orders/seller-stats');
export const fetchStoreOrders = () => API.get('/orders/seller-orders');
export const updateOrderStatus = (id, status) => API.put(`/orders/status/${id}`, { status });
export const fetchStoreProducts = () => API.get('/products');
export const addProduct = (data) => API.post('/products', data);

export default API;

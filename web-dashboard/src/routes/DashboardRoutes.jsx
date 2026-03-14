import { Routes, Route, Navigate } from 'react-router-dom';
import VetDashboard from '../pages/vet/VetDashboard';
import Appointments from '../pages/vet/Appointments';
import MedicalRecords from '../pages/vet/MedicalRecords';
import TreatmentHistory from '../pages/vet/TreatmentHistory';
import ShelterDashboard from '../pages/shelter/ShelterDashboard';
import PetsForAdoption from '../pages/shelter/PetsForAdoption';
import AdoptionRequests from '../pages/shelter/AdoptionRequests';
import AddNewPet from '../pages/shelter/AddNewPet';
import RescueOperations from '../pages/shelter/RescueOperations';
import StoreDashboard from '../pages/store/StoreDashboard';
import Products from '../pages/store/Products';
import Inventory from '../pages/store/Inventory';
import Orders from '../pages/store/Orders';
import ProfilePage from '../pages/common/ProfilePage';
import AdminDashboard from '../pages/admin/AdminDashboard';

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<VetDashboard />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/medical-records" element={<MedicalRecords />} />
      <Route path="/treatment-history" element={<TreatmentHistory />} />
      <Route path="/shelter/dashboard" element={<ShelterDashboard />} />
      <Route path="/shelter/pets" element={<PetsForAdoption />} />
      <Route path="/shelter/requests" element={<AdoptionRequests />} />
      <Route path="/shelter/rescues" element={<RescueOperations />} />
      <Route path="/shelter/add-pet" element={<AddNewPet />} />
      <Route path="/shelter/profile" element={<ProfilePage />} />
      <Route path="/shelter/settings" element={<div>Shelter Settings Page</div>} />

      {/* Store Routes */}
      <Route path="/store/dashboard" element={<StoreDashboard />} />
      <Route path="/store/products" element={<Products />} />
      <Route path="/store/inventory" element={<Inventory />} />
      <Route path="/store/orders" element={<Orders />} />
      <Route path="/store/profile" element={<ProfilePage />} />
      <Route path="/store/settings" element={<div>Store Settings Page</div>} />

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/profile" element={<ProfilePage />} />
      <Route path="/admin/settings" element={<div>Admin Settings Page</div>} />

      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/settings" element={<div>Settings Page</div>} />
    </Routes>
  );
};


export default DashboardRoutes;

# PetCare Super App - Major Project

A premium, all-in-one mobile solution for pet owners. This application provides a comprehensive suite of tools ranging from health management and social networking to emergency assistance.

## 🚀 Core Features

### 🐾 Pet Management & Health
- **Digital Health Card**: Comprehensive pet profile including blood group, microchip ID, and allergy tracking.
- **Medical History**: Log diagnoses and prescriptions from veterinary visits.
- **Vaccination Management**: Keep track of vaccines given and upcoming due dates.
- **Automated Reminders**: Background scheduler sends notifications for upcoming vaccinations 3 days in advance.

### 📅 Services
- **Appointment Booking**: Find and book appointments with certified veterinarians.
- **Emergency SOS**: Quick-access locator for nearby veterinary clinics with one-tap calling.

### 🤝 Community & Adoption
- **Pet Adoption**: A platform for shelters and individuals to list pets for adoption and manage requests.
- **Lost & Found**: Geo-tagged reporting system for missing pets to alert the local community.
- **Social Feed**: Connect with other pet owners, share posts, like, and comment on updates.

---

## 🛠️ Technology Stack

- **Frontend**: React (Vite), CSS-in-JS/Vanilla CSS.
- **Backend**: Node.js, Express.js (CommonJS).
- **Database**: MongoDB with Mongoose (Geospatial indexing enabled).
- **Scheduler**: Node-cron for automated reminders.
- **Authentication**: JWT (JSON Web Tokens) with BcryptJS.

---

## 📂 Project Structure

```text
PetCareSuperApp/
├── backend/
│   ├── config/             # Database connection
│   ├── controllers/        # Business logic for all modules
│   ├── middleware/         # Auth and validation middleware
│   ├── models/             # Mongoose schemas (Pet, User, Post, etc.)
│   ├── routes/             # API endpoint definitions
│   ├── scheduler.js        # Background cron jobs
│   └── server.js           # Entry point
└── frontend/
    ├── src/
    │   ├── components/     # Reusable UI components
    │   ├── pages/          # Main application screens
    │   └── assets/         # Images and styles
```

---

## 📡 API Documentation

### Authentication
- `POST /api/auth/register` - Create a new account (Pet Owner, Vet, or Shelter).
- `POST /api/auth/login` - Authenticate and receive JWT.

### Pet Profile
- `POST /api/pets/add` - Register a new pet.
- `GET /api/pets/my-pets` - Fetch current user's pets.
- `GET /api/pets/:id/health-card` - Get the digital health card summary.

### Medical & Vaccinations
- `POST /api/pets/:id/medical-history` - Add a medical record.
- `POST /api/pets/:id/vaccination` - Log a vaccination.
- `GET /api/notifications` - Retrieve health alerts and reminders.

### Emergency & Community
- `GET /api/emergency/nearby-vets` - Locate vets near user coordinates.
- `POST /api/lostpets/report` - Report a pet as lost.
- `GET /api/posts` - View community social feed.

---

## ⚙️ Installation & Setup

1. **Clone the repository**
2. **Backend Setup**:
   - Navigate to `/backend`
   - Run `npm install`
   - Create a `.env` file with `MONGO_URI`, `JWT_SECRET`, and `PORT`.
   - Start the server: `npx nodemon server.js`
3. **Frontend Setup**:
   - Navigate to `/frontend`
   - Run `npm install`
   - Start the app: `npm run dev`


## 📜 License
Internal Major Project License.
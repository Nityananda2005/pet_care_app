# Backend API Documentation

Base URL: `http://localhost:5000/api`

## Authentication
### Register
- **URL**: `/auth/register`
- **Method**: `POST`
- **Body**: `{ "name", "email", "password", "role": "pet_owner" | "vet" | "shelter" }`

### Login
- **URL**: `/auth/login`
- **Method**: `POST`
- **Body**: `{ "email", "password" }`

---

## Pet Management
### Add Pet
- **URL**: `/pets/add`
- **Method**: `POST` (Protected)
- **Body**: `{ "name", "species", "age", "gender", "breed", "weight", "mood", "image" }`

### Get Health Card
- **URL**: `/pets/:id/health-card`
- **Method**: `GET` (Protected)
- **Returns**: Medical summary, blood group, allergies, etc.

---

## Medical Records
### Add Record
- **URL**: `/pets/:id/medical-history`
- **Method**: `POST` (Protected)
- **Body**: `{ "diagnosis", "prescription" }`

### Add Vaccination
- **URL**: `/pets/:id/vaccination`
- **Method**: `POST` (Protected)
- **Body**: `{ "vaccineName", "dateGiven", "dueDate" }`

---

## Community & Social
### Feed
- **URL**: `/posts`
- **Method**: `GET`
- **Returns**: Array of community posts.

### Create Post
- **URL**: `/posts/create`
- **Method**: `POST` (Protected)
- **Body**: `{ "content", "image" }`

---

## Emergency & SOS
### Nearby Vets
- **URL**: `/emergency/nearby-vets`
- **Method**: `GET` (Protected)
- **Params**: `longitude`, `latitude`
- **Returns**: List of vets sorted by proximity.

---

## Notifications
### Fetch Notifications
- **URL**: `/notifications`
- **Method**: `GET` (Protected)
- **Returns**: List of health alerts and vaccination reminders.

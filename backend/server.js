const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require("./routes/authRoutes")
const petRoutes = require("./routes/petRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const adoptionRoutes = require("./routes/adoptionRoutes");
const lostPetRoutes = require("./routes/lostPetRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const medicalRoutes = require("./routes/medicalRoutes");
const emergencyRoutes = require("./routes/emergencyRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const aiRoutes = require("./routes/aiRoutes");
const rescueRoutes = require("./routes/rescueRoutes");
const startScheduler = require("./scheduler");

const path = require('path');
dotenv.config();

const app = express();

// Middleware
const allowedOrigins = [
  "https://pet-care-app-1u11.vercel.app",
  "https://www.pet-care-app-1u11.vercel.app",
  "http://localhost:5173",
  "http://127.0.0.1:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const uploadDir = process.env.VERCEL ? '/tmp/uploads' : path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadDir));


// Routes
app.use('/api/auth', authRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/adoption", adoptionRoutes);
app.use("/api/lostpets", lostPetRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api", medicalRoutes);
app.use("/api/emergency", emergencyRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", aiRoutes);
app.use("/api/rescues", rescueRoutes);

// MongoDB Connection

connectDB();
startScheduler();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

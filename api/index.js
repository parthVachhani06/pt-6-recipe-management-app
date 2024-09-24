const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const port = process.env.PORT || 5000;
const cors = require('cors');
dotenv.config();

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use(cors({
  origin: 'http://localhost:5173',  // Frontend's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allowed methods
  credentials: true  // Allow credentials (cookies, authorization headers, etc.)
}));
app.use(cors());

app.options('*', cors()); 
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }
  next();
});
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.get('/', (req, res) => {
  res.send('API is running...');
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

module.exports = app;

// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 3002;

// app.use(cors());
// app.use(express.json());

// // Import container routes
// const containerRoutes = require('./routes/containers');
// app.use('/api/containers', containerRoutes);

// // Default route
// app.get('/', (req, res) => res.send("Backend running ✅"));

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

// 🆕 Routes
const authRoutes = require('./routes/auth');
const containerRoutes = require('./routes/containers');
const verifyToken = require('./middleware/authMiddleware');

// Login route (no token needed)
app.use('/api', authRoutes);

// Protected container route
app.use('/api/containers', verifyToken, containerRoutes);

app.get('/', (req, res) => res.send("Backend running ✅"));

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

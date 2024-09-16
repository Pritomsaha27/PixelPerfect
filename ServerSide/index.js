const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { mongoURI, port } = require('./config/config');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
app.use('/api', userRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));

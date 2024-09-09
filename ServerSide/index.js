const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cors());
// MongoDB connection
mongoose.connect(`mongodb+srv://pritom2001saha:Pritomsaha100@testpritom.pr2xj.mongodb.net/testDb`)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// User model
const User = mongoose.model('user', new mongoose.Schema({
  name: String,
  email: String,
  auth0Id: String,
  likedPhotos: [String],
}));

// Endpoint to save user data
// Endpoint to save user data
app.post('/api/save-user', async (req, res) => {
  const { name, email, auth0Id } = req.body;
  
  let user = await User.findOne({ auth0Id });
  if (!user) {
    user = new User({ name, email, auth0Id });
  }
  
  await user.save();
  res.sendStatus(200);
});

// Endpoint to save liked photo
app.post('/api/save-liked-photo', async (req, res) => {
  const { photoId, userId } = req.body;

  let user = await User.findOne({ auth0Id: userId });
  if (user) {
    if (!user.likedPhotos.includes(photoId)) {
      user.likedPhotos.push(photoId);
      await user.save();
    }
  }
  res.sendStatus(200);
});

// Endpoint to get liked photos
app.get('/api/get-liked-photos', async (req, res) => {
  const { auth0Id } = req.query;

  try {
    const user = await User.findOne({ auth0Id });
    if (user) {
      res.json({ likedPhotos: user.likedPhotos });
    } else {
      res.json({ likedPhotos: [] });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching liked photos', error });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));

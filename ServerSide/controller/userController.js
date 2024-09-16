const User = require('../models/userModel');

// Controller to save user data
exports.saveUser = async (req, res) => {
  const { name, email, auth0Id } = req.body;
  try {
    let user = await User.findOne({ auth0Id });
    if (!user) {
      user = new User({ name, email, auth0Id });
    }
    await user.save();
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: 'Error saving user', error });
  }
};

// Controller to save liked photo
exports.saveLikedPhoto = async (req, res) => {
  const { photoId, userId } = req.body;

  try {
    let user = await User.findOne({ auth0Id: userId });
    if (user) {
      if (!user.likedPhotos.includes(photoId)) {
        user.likedPhotos.push(photoId);
        await user.save();
      }
    }
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: 'Error saving liked photo', error });
  }
};

// Controller to get liked photos
exports.getLikedPhotos = async (req, res) => {
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
};

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../server/server');

// Register a new user
router.post('/register', async (req, res) => {
  const { mobileNumber, name } = req.body;

  try {
    const existingUser = await User.findOne({ mobileNumber });

    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      mobileNumber
    });

    await newUser.save();
    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { mobileNumber, name } = req.body;
  

  try {
    if(mobileNumber){
      const user = await User.findOne({ mobileNumber });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid MobileNumber' });
      }
  
      res.status(200).json({ message: 'Login successful' });
    }
    else if(name){
      const user2 = await User.findOne({ name });
  
      if (!user2) {
        return res.status(400).json({ message: 'Invalid name' });
      }
  
      res.status(200).json({ message: 'Login successful' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error logging in1' });
  }
});







// router.post('/login', async (req, res) => {
//   const { mobileNumber } = req.body;
//   const { Tdate } = req.body;
//   try {
//     if(mobileNumber){
//       const user = await User.findOne({ mobileNumber });
  
//       if (!user) {
//         return res.status(400).json({ message: 'Invalid username or password' });
//       }
  
//       res.status(200).json({ message: 'Login successful' });
//     }

//     else if(Tdate){
//       const user = await User.findOne({ mobileNumber });
  
//       if (!user) {
//         return res.status(400).json({ message: 'Invalid username or password' });
//       }
  
//       res.status(200).json({ message: 'Login successful' });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Error logging in1' });
//   }
// });

module.exports = router;

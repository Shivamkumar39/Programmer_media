import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
//import { Content } from './schema/schema.js';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { body, validationResult } from 'express-validator'
import User from './schema/User.js'
import Content from './schema/schema.js'
import multer from 'multer';
import path from 'path'
import fs from 'fs'
import { Route } from 'react-router-dom';
//const fetchUser = require('./middleweare');

const app = express();
const port = 3000;
const JWT_SECRET = 'your_jwt_secret123';


// Connect to MongoDB
mongoose.connect('mongodb+srv://shivamkumar098798:dYAPQ3FWQydd1JSX@cluster0.2yzapfm.mongodb.net/', {   //mongodb+srv://shivamkumar098798:dYAPQ3FWQydd1JSX@cluster0.2yzapfm.mongodb.net/  

}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Serve static files from the uploads folder
app.use('/uploads', express.static('uploads'));



// Middleware to fetch user from JWT token
const fetchUser = (req, res, next) => {
  const token = req.header('authtoken');
  //console.log(token);
  if (!token) {
    return res.status(401).send({ error: 'Please authenticate using a valid token' });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    if(data){
      console.log(data);
    }
    req.user = data.user; // Assuming 'user' is the key in your JWT payload
    next();
  } catch (error) {
    console.error('JWT Verification Error:', error);
    return res.status(401).send({ error: 'Invalid token or unauthorized access' });
  }
};



// Routes

// User registration
// app.post('/register', [
//   body('username', 'Enter a valid username').isLength({ min: 3 }),
//   body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
// ], async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { username, password } = req.body;
//   try {
//     let user = await User.findOne({ username });
//     if (user) {
//       return res.status(400).json({ error: 'User already exists' });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const secPass = await bcrypt.hash(password, salt);

//     user = new User({
//       username,
//       password: secPass,
//       isAdmin: false // Set isAdmin based on your logic
//     });

//     await user.save();

//     const payload = {
//       user: {
//         id: user.id
//       }
//     };

//     const authToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '9h' });

//     res.json({ authToken });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Internal Server Error');
//   }
// });

// User registration
app.post('/register', [
  body('username', 'Enter a valid username').isLength({ min: 3 }),
  body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;
  try {
      let user = await User.findOne({ username });
      if (user) {
          return res.status(400).json({ error: 'User already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(password, salt);

      user = new User({
          username,
          password: secPass,
          isAdmin: false // Set isAdmin based on your logic
      });

      await user.save();

      const payload = {
          user: {
              id: user.id
          }
      };

      const authToken = jwt.sign(payload, JWT_SECRET,  {expiresIn: '12h'});

      res.json({ authToken });
  } catch (err) {
      console.error('Error occurred while registering user:', err.message);
      res.status(500).send('Internal Server Error');
  }
});


// // User login
app.post('/login', [
  body('username', 'Enter a valid username').isLength({ min: 3 }),
  body('password', 'Password cannot be blank').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: 'Invalid Credentials' });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    const authToken = jwt.sign(payload, JWT_SECRET, {expiresIn: '12h'});



    res.json({ authToken, user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});


//   app.post('/admin/login', async (req, res) => {
//     const { username, password } = req.body;

//     // Check admin credentials
//     if (username === adminCredentials.username && bcrypt.compareSync(password, adminCredentials.password)) {
//       const token = jwt.sign({ username, isAdmin: true }, JWT_SECRET, { expiresIn: '1h' });
//       res.json({ token });
//     } else {
//       res.status(401).json({ msg: 'Invalid credentials' });
//     }
//   });



// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/'); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // File renaming logic
  },
});


// File filter to accept only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed!'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter, dest: 'uploads/' });


// Endpoint to upload an image
app.post('/uploads', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Please upload an image' });
  }
  res.json({ img: `http://localhost:3000/uploads/${req.file.filename}` });
});



// Add new content (admin only)
app.post('/contents', fetchUser, upload.single('image'), [
  body('title', 'Enter a valid title').isLength({ min: 3 }),
  body('paragraph', 'Paragraph must be at least 5 characters').isLength({ min: 5 }),
  body('description', 'Description must be at least 5 characters').isLength({ min: 5 }),
  body('downloadLink1', 'Enter a valid download link').isURL(),
  body('Types'),
  body('downloadLink2', 'Enter a valid download link').isURL()
], async (req, res) => {

  const errors = validationResult(req);



  // const isAdmin = req.user && req.user.isAdmin; 
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }


  const { title, paragraph, description, downloadLink1, downloadLink2, Types } = req.body;
  const img = req.file ? `http://localhost:3000/uploads/${req.file.filename}` : '';


  try {
    const user = await User.findById(req.user.id);


    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: 'Access denied' });
    }


    const content = new Content({
      img,
      title,
      paragraph,
      description,
      downloadLink1,
      downloadLink2,
      Types,
      user: req.user.id
    });

    const savedContent = await content.save();
    res.json({ savedContent });
    


  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


//delete content
app.delete('/deletecontent', async (req, res) => {
  try {
    const content = await Content.findById(req.body.id);
    if (!content) {
      return res.status(404).json({ success: false, message: 'Content not found' });
    }

    // Correctly construct the file path
    const filename = `./uploads/${path.basename(content.img)}`;
    
    // Delete the associated image file if it exists
    if (fs.existsSync(filename)) {
      fs.unlinkSync(filename);
    } else {
      console.warn(`File not found: ${filename}`);
    }
    // Delete the content from the database
    await Content.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: 'Content removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error: content not removed' });
  }
});




// Get all content
app.get('/Getcontents', async (req, res) => {
  try {
    // Fetch all contents from database, sorted by creation time in descending order
    const contents = await Content.find().sort({ createdAt: -1 }).lean(); // Convert to plain JavaScript objects

    // Check if user is an admin
    const isAdmin = req.user && req.user.isAdmin; // Assuming user info is stored in req.user

    // Modify contents array to include canEdit flag based on admin status
    const contentsWithAdminFlag = contents.map((content) => ({
      ...content,
      canEdit: isAdmin || content.isAdmin
    }));

    res.json(contentsWithAdminFlag); // Send modified contents array as JSON response
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Update Content API
app.put('/editcontent/:id', fetchUser, upload.single('image'), async (req, res) => {
  try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ message: 'Invalid content ID' });
      }

      const { title, paragraph, description, downloadLink1, downloadLink2 } = req.body;
      const updatedContent = { title, paragraph, description, downloadLink1, downloadLink2 };

      if (req.file) {
          updatedContent.img = `http://localhost:3000/uploads/${req.file.filename}`;
      }

      const content = await Content.findByIdAndUpdate(id, updatedContent, { new: true });
      console.log(content);
      if (!content) {
          return res.status(404).json({ message: 'Content not found' });
      }

      res.json(content);
  } catch (err) {
      console.error('Server error:', err.message);
      res.status(500).json({ message: 'Server error', error: err.message });
  }
});


// app.patch('/editcontent/:id', fetchUser, async (req, res) => {
//   try {

//     res.send("hello")
//   } catch (error) {
//     console.log(error);
//   }
// })




//id
app.get('/postpage/:_id', async (req, res) => {
  const { _id } = req.params;
  try {
    const content = await Content.findById(_id);
    res.json(content);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});




// Check admin route
app.get('/checkAdmin', fetchUser, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send({ msg: 'User not found' });
    }

    res.send({ isAdmin: user.isAdmin });
  } catch (err) {
    res.status(500).send({ msg: 'Server error' });
  }
});




// search


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

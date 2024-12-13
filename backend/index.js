require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const cors = require('cors');
const multer = require('multer'); 
const app = express();

const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const Authadmin = require('./routes/Authadmin');
const Authuser = require('./routes/Authuser');

app.use(cors());
app.use(express.json());

connectDB();

app.use(bodyParser.json());

const storage = multer.memoryStorage(); 
const upload = multer({ storage });

app.get("/" , (req,res)=>{
    res.send("hello server");
})

app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/adminroute', Authadmin);
app.use('/api/userroute' , Authuser)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

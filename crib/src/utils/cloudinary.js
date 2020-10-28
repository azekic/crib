require('dotenv').config();
import {Cloudinary} from 'cloudinary-react'
const cloudinary = require('cloudinary/lib/cloudinary').v2; 
cloudinary.config({
    cloud_name: process.env.REACT_APP_CLOUDINARY_NAME,
    api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
    api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET
});

module.exports = { cloudinary };
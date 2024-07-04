// // models/Content.js
// import mongoose from 'mongoose';

// const contentSchema = new mongoose.Schema({
//     img: {
//         type: String,
//         required: true
//     },
//     title: {
//         type: String,
//         required: true
//     },
//     paragraph: {
//         type: String,
//         required: true
//     },
//     link: {
//         type: String,
//         required: true
//     }
// });

// export const Content = mongoose.model('Content', contentSchema);


//const mongoose = require('mongoose');
import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
    img: { type: String,  default:"" },
    title: { type: String, required: true },
    paragraph: { type: String, required: true },
    description: { type: String, required: true },
    downloadLink1: { type: String, required: true },
    downloadLink2: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });
const Content = mongoose.model('Content', contentSchema);
export default Content

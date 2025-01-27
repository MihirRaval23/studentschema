import mongoose from 'mongoose';

const teachschema = new mongoose.Schema({
    teacher_name: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    }
});

const teachmodel = mongoose.model('teach', teachschema);

export default teachmodel;

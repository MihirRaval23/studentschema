import mongoose from 'mongoose';

const activitiesschema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['Workshop', 'Seminar', 'Sports', 'Cultural', 'Other']  
    },
    stud_id: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'student' 
        }
    ]
});

const activitesmodel = mongoose.model('activites', activitiesschema);

export default activitesmodel;

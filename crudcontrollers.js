import studentmodel from "../models/crudschema.js";  
// import activitesmodel from "../models";
// import teachmodel from "../models/teach.js";


const getallRecords = async (req, res) => {
    try {
        const students = await studentmodel.find({}).populate('teacher_id').populate('activities');  
        res.status(200).json({
            message: "All students fetched successfully",
            students: students
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
};


const createnewrecord = async (req, res) => {
    try {
        const { name, age, city, fees, teacher_id, activities } = req.body;

        const newStudent = new studentmodel({
            name,
            age,
            city,
            fees,
            teacher_id,
            activities
        });

        await newStudent.save();

        const populatedStudent = await studentmodel.findById(newStudent._id).populate('teacher_id').populate('activities');

        res.status(201).json({
            message: "Student created successfully",
            student: populatedStudent
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
};


const readrecordbyid = async (req, res) => {
    try {
        const student = await studentmodel.findById(req.params.id)
            .populate('teacher_id') 
            .populate({
                path: 'activities',
                populate: {
                    path: 'stud_id',
                    model: 'student' 
                }
            });  

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({
            message: "Student details fetched successfully",
            student
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
};


const updaterecordbyid = async (req, res) => {
    try {
        const { name, age, city, fees, teacher_id, activities } = req.body;

        const student = await studentmodel.findById(req.params.id);
        
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        student.name = name || student.name;
        student.age = age || student.age;
        student.city = city || student.city;
        student.fees = fees || student.fees;
        student.teacher_id = teacher_id || student.teacher_id;
        student.activities = activities || student.activities;

        const updatedStudent = await student.save();

        const populatedStudent = await studentmodel.findById(updatedStudent._id)
            .populate('teacher_id')
            .populate({
                path: 'activities',
                populate: { path: 'stud_id', model: 'student' }
            });

        res.status(200).json({
            message: "Student updated successfully",
            student: populatedStudent
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
};



const deleterecordbyid = async (req, res) => {
    try {
        const student = await studentmodel.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
};

const getCombinedData = async (req, res) => {
    try {
        const students = await studentmodel.find().populate('teacher_id').populate('activities');  

        if (!students || students.length === 0) {
            return res.status(404).json({ message: "No students found" });
        }

        res.status(200).json({
            message: "Combined data fetched successfully",
            students
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
};

const getAlldata = async (req, res) => {
    try {
        const { teacher_id, activities, name, age, city, fees } = req.body;

       
        if (!teacher_id || !activities || activities.length === 0) {
            return res.status(400).json({ message: "teacher_id or activities are required." });
        }

        let student = await studentmodel.findOne({ teacher_id, activities }).populate({path: 'activities',
            populate: {path: 'stud_id',model: 'student'}
        }).populate('teacher_id');

        if (student) {
            student.name = name || student.name;
            student.age = age || student.age;
            student.city = city || student.city;
            student.fees = fees || student.fees;

            await student.save();

            student = await studentmodel.findById(student._id).populate({path: 'activities',populate: 
                    {path: 'stud_id', 
                    model: 'student'  
                }
            }).populate('teacher_id');

            return res.status(200).json({
                message: "Student updated successfully",
                student,
            });
        } else {

            student = new studentmodel({
                teacher_id,
                activities,
                name,
                age,
                city,
                fees,
            });

            await student.save();

            student = await studentmodel.findById(student._id).populate({
                path: 'activities',
                populate: {
                    path: 'stud_id', 
                    model: 'student'  
                }
            }).populate('teacher_id');

            return res.status(201).json({
                message: "Student created successfully",
                student,
            });
        }
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;

        const student = await studentmodel.findById(id)
            .populate('teacher_id') 
            .populate({
                path: 'activities',
                populate: {
                    path: 'stud_id',
                    model: 'student'
                }
            });

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({
            message: "Student details fetched successfully",
            student
        });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export { getallRecords, createnewrecord, updaterecordbyid, deleterecordbyid, readrecordbyid, getCombinedData,getAlldata,getStudentById};

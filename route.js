import express from 'express';
const route = express.Router()
import {getallRecords,createnewrecord,readrecordbyid,updaterecordbyid,deleterecordbyid,getCombinedData,getAlldata,getStudentById} from '../controllers/crudcontrollers.js';
import{createActivity,getActivities,getActivityById,updateActivity,deleteActivity} from "../controllers/activites.js"
import{createTeacher,getTeachers,getTeacherById,updateTeacher,deleteTeacher} from"../controllers/teach.js";

//  stud crud roughts
route.get('/get',getallRecords)
route.post('/create',createnewrecord)
route.get('/read/:id',readrecordbyid)
route.put('/update/:id',updaterecordbyid)
route.delete('/delete/:id',deleterecordbyid)
route.get('/combined',getCombinedData);
route.post('/alldata',getAlldata);
route.get('/student/:id',getStudentById)



// route.post('/combine',AddCombineData)
// route.get('/students',filterrecord)
// route.get('/students/sort',sortRecords)

// activities roughts

route.post('/activites',createActivity); 
route.get('/activites/get', getActivities);   
route.get('/activites/read/:id', getActivityById); 
route.put('/activites/update/:id', updateActivity); 
route.delete('/activites/delete/:id', deleteActivity);
//teach schema

route.post('/teach', createTeacher); 
route.get('/teach/get', getTeachers);   
route.get('/teach/read/:id', getTeacherById); 
route.put('/teach/update/:id', updateTeacher); 
route.delete('/teache/delete/:id', deleteTeacher); 

export{route}
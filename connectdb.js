import mongoosh from "mongoose";




const connectsdb= async(DATABASE_URL)=>{
    try {
        const DB_option = {
            name : 'mihir',
        }
        await mongoosh.connect(DATABASE_URL,DB_option);

        console.log('connected!')
    } catch (error) {
        console.log(error.message)
    }
}
export default connectsdb;
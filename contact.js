const mongoose=require  ('mongoose');
const studentRegister=mongoose.Schema({
    
        username: { type: String, required: true,unique:true },
        password: { type: String, required: true,unique:true },
        passwordConform : { type: String, required:true },
        phone: { type: String, required: true,unique:true,min:10 },
        email: { type: String, required: true, unique: true },
        branch: { type: String, required: true }
  



});

const Register=new mongoose.model ('Register',studentRegister)
module.exports=Register;
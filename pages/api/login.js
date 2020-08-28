import initDB from '../../helper/initDB';
import User from '../../models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
initDB();

export default async (req,res)=>{
    const {email,password} = req.body
    try{
        if(!email || !password){
            return res.status(422).json({error:"Please add all fields"})
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({error:"user not found"})
        }
        const doMatch =await bcrypt.compare(password,user.password)
        if(doMatch){
           const token = jwt.sign({userId:user._id},process.env.MONGO_SECRET,{expiresIn:'8d'})
           const {name,email,role} =user
           res.status(201).json({token,user:{name,email,role}})
        }else{
            return res.status(401).json({message:"email or password wrong"})
        }
        // res.status(201).json({message:"login success"})
    }catch(err){
        console.log(err)
    }
}

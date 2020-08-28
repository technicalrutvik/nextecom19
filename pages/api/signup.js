import initDB from '../../helper/initDB';
import User from '../../models/User'
import bcrypt from 'bcryptjs'
import Cart from '../../models/Cart'
initDB();

export default async (req,res)=>{
    const {name,email,password} = req.body
    try{
        if(!name || !email || !password){
            return res.status(422).json({error:"Please add all fields"})
        }
        const user = await User.findOne({email})
        if(user){
            return res.status(422).json({error:"user already exist with that email"})
        }
        const hashpass=await bcrypt.hash(password,12)
        const newUser =await new User({
            name,
            email,
            password:hashpass
        })
        // console.log(newUser)
        newUser.save((err,data)=>{
            if(err) return res.status(404).json({error:"err"})
            if(data){
                return res.status(201).json({user:data})
            }
        })
        await new Cart ({user:newUser._id}).save()
        // res.status(201).json({message:"signup success"})
    }catch(err){
        console.log(err)
    }
}

import jwt from 'jsonwebtoken'
import Cart from '../../models/Cart'
import Authenticated from '../../helper/Authenticated'
import initDB from '../../helper/initDB'
initDB()
export default async (req,res) => {
    switch(req.method){
        case "GET" :
            await fetchUserCart(req,res)
            break;
        case "PUT" :
            await addProduct(req,res)
            break;
        case "DELETE" :
            await removeProduct(req,res)
            break;
    }
}

// function Authenticated(icomponent){
//     return (req,res) => {
//         const {authorization} = req.headers
//         if(!authorization){
//           return res.status(404).json({error:"you must logged i"})
//         }
//         try{
//             const {userId} = jwt.verify(authorization,process.env.MONGO_SECRET)
//             req.userId = userId
//             return icomponent(req,res)
//         }catch(err){
//                 return res.status(404).json({error:"you must loggeed in "})
//         }
//     }
// }

const addProduct = Authenticated(async (req,res) => {
    const {quantity,productId} = req.body
    const cart = await Cart.findOne({user:req.userId})
    
    const pExist = cart.products.some(pdoc=>pdoc.product==productId)

    if(pExist){
        await Cart.findOneAndUpdate(
            {_id:cart._id,"products.product":productId},
            {$inc:{"products.$.quantity":quantity}}
            )
    }else{
        const newProduct = {quantity,product:productId}
        await Cart.findOneAndUpdate(
            {_id:cart._id},
            {$push:{products:newProduct}}
            )
    }
    res.status(200).json({message:"added to cart"})



})

const fetchUserCart = Authenticated(async (req,res) => {
    
    const cart = await Cart.findOne({user:req.userId})
                        .populate("products.product")
    res.status(200).json(cart.products)

})

const removeProduct = Authenticated(async(req,res)=>{
   const {productId} = req.body
 const cart =  await Cart.findOneAndUpdate(
       {user:req.userId},
       {$pull:{products:{product:productId}}},
       {new:true}
    ).populate("products.product") 
    res.status(200).json(cart.products)
})

// export default async (req,res) => {
//     const {authorization} = req.headers
//     // const au=authorization.split("")[1]
//     if(!authorization){
//         return res.status(404).json({error:"you must logged i"})
        
//     }
//     console.log(authorization)
//     try{
//     const {userId} = jwt.verify(authorization,process.env.MONGO_SECRET)
//     const cart = await Cart.findOne({user:userId})
//     res.status(200).json(cart.products)
//     console.log(cart)
//     }catch(err){
//         return res.status(404).json({error:"you must loggeed in "})
//     }

// }


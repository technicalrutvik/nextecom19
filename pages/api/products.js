// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import initDB from '../../helper/initDB'
import Product from '../../models/Product'
initDB()
export default async(req,res)=>{
  switch(req.method)
  {
    case "GET":
      await getAllProducts(req,res)
      break;
    case "POST":
     await saveProduct(req,res)
     break;
  }

}

const saveProduct = async (req,res)=>{
  const {name,price,description,mediaUrl} = req.body

  try{

  
  if(!name || !price || !description ||  !mediaUrl){
    return res.status(422).json({error:"Please add all fields"})
  }
const product = new Product({
   name,
   price,
   description,
   mediaUrl
 }).save()
 res.status(201).json(product)
}catch(err){
  res.status(500).json({error:"internal server error"})
  console.log(err)
}
}
const getAllProducts = async (req,res)=>{
  try{
    const products = await Product.find()
      res.status(200).json({products})
    
  }catch(err){
    res.status(500).json({error:"internal server error"})
    console.log(err)
  }
 
}




// export default (req, res) => {
//   res.statusCode = 200
//   res.json({ name: 'John Doe' })
// }x7Vm8IrEch1MEENf
//mongodb+srv://nextecom:<password>@nextecom.ti88i.mongodb.net/<dbname>?retryWrites=true&w=majority

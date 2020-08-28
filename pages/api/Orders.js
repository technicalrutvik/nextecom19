import initDB from '../../helper/initDB'
import Order from '../../models/Order'
import Cart from '../../models/Cart'
import Authenticated from '../../helper/Authenticated'

initDB()

export default Authenticated(async(req,res)=>{
    const orders =   await Order.find({user:req.userId}).populate("products.product")
    res.status(201).json(orders)
})
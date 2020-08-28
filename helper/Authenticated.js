import jwt from 'jsonwebtoken'
 function Authenticated(icomponent){
    return (req,res) => {
        const {authorization} = req.headers
        if(!authorization){
          return res.status(404).json({error:"you must logged i"})
        }
        try{
            const {userId} = jwt.verify(authorization,process.env.MONGO_SECRET)
            req.userId = userId
            return icomponent(req,res)
        }catch(err){
                console.log(err)
                return res.status(404).json({error:"you must loggeed in "})
        }
    }
}
export default Authenticated
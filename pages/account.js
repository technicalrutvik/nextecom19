import {parseCookies} from 'nookies'
import baseUrl from '../helper/baseUrl'
import {useEffect,useRef} from 'react'
import UserRoles from '../components/UserRoles'
const Account = ({orders}) =>{
    const orderCard= useRef(null)
    const cookie = parseCookies()
    const user = cookie.user ? JSON.parse(cookie.user):""
    // if(orders.length == 0){
    //     return(<div className="center-align container">
    //     <h2>you have not order history</h2>
    // </div>) 
    //  }
    useEffect(()=>{
        M.Collapsible.init(orderCard.current)
    },[])

    const OrderHistory= ()=>{
        return(
            <ul className="collapsible" ref={orderCard}>
                {orders.map(item=>{
                    return(
                        <li key={item._id}>
                        <div className="collapsible-header"><i className="material-icons">folder</i>{item.createdAt}</div>
                        <div className="collapsible-body">
                    <h5>Total ₹ { item.total}</h5>
                            {
                                item.products.map(pitem=>{
                                    return <h5 key={pitem._id}>{pitem.product.name} x {pitem.quantity}</h5>
                                })
                            }
                        </div>
                        </li>
                    )
                })}
               
        </ul>
        )
        
    }

    return(
        <div className="container">
            <div className="center-align white-text" style={{backgroundColor:"#1e88e5",paddingBottom:"10px",marginTop:"80px"}}>
    <h4>{user.name}</h4>
    <h4>{user.email}</h4>
    
            </div>
            <h4>Order History</h4>
            {orders.length == 0 ? 
            
            <div className="center-align container">
            <h2>you have not order history</h2>
            </div>

            : <OrderHistory/> }
               {user.role==='root' && <UserRoles/>} 
        </div>
    )
}

export async function getServerSideProps(ctx){
    const {token} =   parseCookies(ctx)
    if(!token){
        const {res} = ctx
        res.writeHead(302,{Location:"/login" })
        res.end()
    }
 const res =  await fetch(`${baseUrl}/api/Orders`,{
        headers:{
            'Authorization':token
            
        }
    })
    const res2 = await res.json()
    console.log(res2)
    return{
        props:{orders:res2}
    }
}

export default Account
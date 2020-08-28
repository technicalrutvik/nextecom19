import { useRouter } from "next/router";
import baseUrl from "../../helper/baseUrl";
import {useRef,useEffect,useState} from 'react'
import {parseCookies} from 'nookies'
import cookie from 'js-cookie'
const Product = ({ product }) => {
  const [quantity,setQuantity] = useState(1)
  const router = useRouter();
  const modalRef =useRef(null)
  const cookies = parseCookies()
  console.log(cookies)
  const user = cookies.user ? JSON.parse(cookies.user) : ""
  console.log(user)
  useEffect(()=>{
      M.Modal.init(modalRef.current)
  },[])
  if (router.isFallback) {
    return <h3>loading</h3>;
  }

  const AddToCart = async () => {
   const res = await fetch(`${baseUrl}/api/cart`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        "Authorization":cookies.token
      },
      body:JSON.stringify({
        quantity,
        productId:product.product._id
      })
    })
    const res2 = await res.json()
    // console.log(res2.message)
    if(res2.error){
      M.toast({html:res2.error,classes:"red"})
      cookie.remove('token')
      cookie.remove('user')
      router.push('/login')
    }
    M.toast({html:res2.message,classes:"green"})
  }

  const getModal = ()=>{
      return(
        <div id="modal1" className="modal" ref={modalRef}>
        <div className="modal-content">
          <h4>{product.product.name}</h4>
          <p>Are you sure? want to delete</p>
        </div>
        <div className="modal-footer">
        <button className="btn waves-effect waves-light #1e88e5 blue darken-1">
        Cancel <i className="material-icons left">cancel</i>
        </button>
        <button className="btn waves-effect waves-light red" onClick={()=>deleteProduct()}>
        Yes <i className="material-icons left">delete</i> 
      </button>
        </div>
      </div>
      )
  }
  const deleteProduct = async ()=>{
    const res = await fetch(`${baseUrl}/api/product/${product.product._id}`,{
      method:"DELETE"
    })
    await res.json()
    router.push('/')
  }
  return (
    <div className="container center-align">
      <h3>{product.product.name}</h3>
      <img src={product.product.mediaUrl} style={{ width: "30%" }}></img>
      <h5>{product.product.price}</h5>
      <input
        type="number"
        min='1'
        style={{ width: "400px", margin: "10px" }}
        value={quantity}
        onChange={(e)=>setQuantity(Number(e.target.value))}
        placeholder="Quantity"
      />
      {user?
        <button type="submit" className="btn waves-effect waves-light #1e88e5 blue darken-1"
        onClick={()=>AddToCart()}
        >
        Add <i className="material-icons right">add</i>
      </button>
        :
        <button type="submit" className="btn waves-effect waves-light #1e88e5 blue darken-1"
        onClick={()=>router.push('/login')}
        >
      Login to  Add <i className="material-icons right">add</i>
      </button>
        }
      
      <p className="left-align"> {product.product.description}</p>
    {(user.role == 'admin' || user.role == 'root')  && 
       <button type="submit" data-target="modal1" className="modal-trigger btn waves-effect waves-light red ">
       Delete <i className="material-icons left">delete</i>
     </button>         }
      
        {getModal()}
    </div>
  );
};
//dd
export async function getServerSideProps({params:{id}}){
    const res = await fetch(`http://localhost:3000/api/product/${id}`)
    const data = await res.json()
    return {
        props:{product:data}
    }
}

// export async function getStaticProps({ params: { id } }) {
//   const res = await fetch(`${baseUrl}/api/product/${id}`);
//   const data = await res.json();
//   return {
//     props: { product: data },
//   };
// }
// export async function getStaticPaths() {
//   return {
//     paths: [{ params: { id: "5f40fb6bd86654e4f2812c35" } }],
//     fallback: true,
//   };
// }

export default Product;

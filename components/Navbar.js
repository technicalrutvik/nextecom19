import Link from 'next/link'
import {parseCookies} from 'nookies'
import { useRouter } from 'next/router'
import cookie from 'js-cookie'
const Navbar = () =>{
    const router =useRouter()
    const cookies = parseCookies()
    // const user1=JSON.parse(cookies.user)
    console.log(cookies.user)
    const user = cookies.user ? JSON.parse(cookies.user) :""
    console.log(user)
    // let user = false
    // if(token){
    //   user=true
    // }else{
    //   user=false
    // }
    function isActive(route){
        //console.log(router,router.pathname)
        if(route==router.pathname){
            return "active"
        }
        else ""
    }
    return (
        <nav>
        <div className="nav-wrapper #1e88e5 blue darken-1">
          <Link  href="/" ><a className="brand-logo left">MyStore</a></Link>
          <ul id="nav-mobile" className="right">
          <li className={isActive('/cart')}><Link href="/cart"><a>cart</a></Link></li>
         
         {(user.role == "root" || user.role == "admin")  &&  <li className={isActive('/create')}><Link href="/create"><a>create</a></Link></li>}

            {
              user ? 
              <>
              <li className={isActive('/account')}><Link href="/account"><a>Account</a></Link></li>
                      <li ><button className="btn red" onClick={()=>{
                        cookie.remove('token')
                        cookie.remove('user')
                        router.push('/login')
                      }}>logout</button></li>
                      </>
                  :  
                  <>
                  <li className={isActive('/login')}><Link href="/login"><a>login</a></Link></li>
                  <li className={isActive('/signup')}><Link href="/signup"><a>signup</a></Link></li>
                  </>
            }
           
          </ul>
        </div>
      </nav>
    )
}
export default Navbar;
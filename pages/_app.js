// import '../styles/globals.css'

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default MyApp


import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {
 
     return (
       <>
        <Layout>
            <Component {...pageProps} />
       </Layout>
      </>
     )
  
}

export default MyApp

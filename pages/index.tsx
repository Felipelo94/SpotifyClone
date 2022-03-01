import type { NextPage } from 'next'
import Head from 'next/head'
import Sidebar from '../components/Sidebar'

const Home: NextPage = () => {
  return (
    
    <div className="bg-black h-screen overflow-hidden"> 
      <Head>
        <title>Music App</title>        
      </Head>     
     
      <main className=''>
        <Sidebar/>
        {/* MainSeccion*/}
      </main>

      <div>
        {/*Footer/player*/}
      </div>
      </div>

  )
}

export default Home

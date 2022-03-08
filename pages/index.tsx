import Head from 'next/head'
import Sidebar from '../components/organismos/sidebar/Sidebar'
import Center from '../components/organismos/center/Center'
import Player from '../components/organismos/player/Player'
import { getSession } from 'next-auth/react'

export default function Home() {
  return (
    <div className="h-screen overflow-hidden bg-black">
      <Head>
        <title>Music App</title>
      </Head>

      <main className="flex flex-col md:flex-row">
        <Sidebar />
        <Center />
      </main>

      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props: { session },
  }
}

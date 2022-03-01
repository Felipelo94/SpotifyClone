import { useEffect, useState } from 'react'
import useSpotify from '../hooks/useSpotify'
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from '@heroicons/react/outline'
import { signOut, useSession } from 'next-auth/react'
import { useRecoilState } from 'recoil'
import { playlistIdState } from '../atoms/playlistAtom'

function Sidebar() {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const [playlist, setPlaylist] = useState([])
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)
  console.log('you picked playlist >>>>>', playlistId)

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylist(data.body.items)
      })
    }
  }, [session, spotifyApi])

  console.log(playlist)

  return (
    <div className="text-xm flex w-screen flex-row overflow-y-scroll  border-r border-gray-900 p-5 pb-6 text-gray-500 scrollbar-hide md:inline-flex md:max-w-[12rem] lg:max-w-[15rem] lg:text-sm  ">
      <div className=" flex w-full items-center justify-evenly sm:w-full md:flex-col md:items-start md:justify-start md:space-y-4">
        <button
          onClick={() => setPlaylistId('37i9dQZEVXbMDoHDwVN2tF')}
          className="flex items-center space-x-2 hover:text-white "
        >
          <HomeIcon className="h-5 w-5" />
          <p className="hidden md:inline">Home</p>
        </button>
        <button
          onClick={() => setPlaylistId('11WrOV9QMQ36oXSVLjt7lP')}
          className="flex items-center space-x-2 hover:text-white "
        >
          <HeartIcon className="h-5 w-5" />
          <p className="hidden md:inline">Favs</p>
        </button>

        <button className="flex items-center space-x-2 hover:text-white ">
          <SearchIcon className="h-5 w-5" />
          <p className="hidden md:inline">Search</p>
        </button>

        <button
          className="items-center space-x-2 hover:text-white md:flex md:hidden "
          onClick={() => signOut()}
        >
          <p>Log Out</p>
        </button>
        <hr className="hidden items-center space-x-2 border-t-[0.1px] border-gray-900 hover:text-white md:inline" />

        <button className="hidden items-center space-x-2 hover:text-white md:flex ">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>

        <button className="hidden items-center space-x-2 hover:text-white md:flex ">
          <RssIcon className="h-5 w-5" />
          <p>Your Episodes</p>
        </button>

        <button className="hidden items-center space-x-2 hover:text-white md:flex ">
          <HeartIcon className="h-5 w-5" />
          <p>Liked Songs</p>
        </button>
        <hr className="hidden items-center space-x-2 border-t-[0.1px] border-gray-900 hover:text-white md:flex" />
        <div className="hidden flex-col md:flex">
          {playlist.map((playlist) => (
            <p
              key={playlist.id}
              onClick={() => setPlaylistId(playlist.id)}
              className="cursor-pointer items-start hover:text-white"
            >
              {playlist.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar

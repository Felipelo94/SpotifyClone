import { ChevronDownIcon } from '@heroicons/react/outline'
import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { shuffle } from 'lodash'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  playlistIdState,
  playlistState,
} from '../../atoms/playlist/playlistAtom'
import useSpotify from '../../hooks/useSpotify'
import Songs from '../../moleculas/songs/Songs'

const colors = [
  'from-indigo-300',
  'from-blue-300',
  'from-green-300',
  'from-red-300',
  'from-yellow-300',
  'from-pink-300',
  'from-purple-300',
]

function Center() {
  const spotifyApi = useSpotify()
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const { data: session } = useSession()
  const [color, setColor] = useState(null)
  const playlistId = useRecoilValue(playlistIdState)
  const [playlist, setPlaylist] = useRecoilState(playlistState)

  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [playlistId])

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body)
      })
      .catch((err) => console.log('Something went wrong!', err))
  }, [spotifyApi, playlistId])

  return (
    <div className="h-screen flex-grow overflow-y-scroll text-white scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div>
          <div className="flex">{/* <SearchBar /> */}</div>
          <div
            onClick={signOut}
            className=" hidden  cursor-pointer items-center space-x-3 rounded-full bg-gray-900 p-1  pr-2 opacity-90 hover:opacity-80 md:flex"
          >
            <img
              className="h-10 w-10 rounded-full"
              src={session?.user.image}
              alt="useravatar"
            />
            <h2>{session?.user.name}</h2>
            <ChevronDownIcon className="h-5 w-5" />
          </div>
        </div>
      </header>
      <section
        className={`flex h-80 items-end  space-x-7 bg-gradient-to-b p-8 ${color} to-black text-white`}
      >
        <img
          className="h-44 w-44 shadow-2xl"
          src={playlist?.images?.[0]?.url}
          alt="Playlist Cover"
        />
        <div>
          <p>Playlist</p>
          <h1 className="text 2xl font-bold md:text-3xl xl:text-5xl">
            {playlist?.name}
          </h1>
        </div>
      </section>
      <div>
        <Songs />
      </div>
    </div>
  )
}

export default Center

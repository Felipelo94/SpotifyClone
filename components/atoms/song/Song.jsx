import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import useSpotify from '../../hooks/useSpotify'
import { millisToMinutesAndSeconds } from '../../lib/time'
import { currentTrackIdState, isFav, isPlayingState } from './songAtom'
import { HeartIcon } from '@heroicons/react/outline'
import { TrashIcon } from '@heroicons/react/solid'

function Song({ order, track, fav, onDelete }) {
  const spotifyApi = useSpotify()
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)

  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const [isFavorite, setIsFavorite] = useState(isFav)

  const getMe = () => {
    spotifyApi.getMe().then(
      function (data) {
        console.log('Some information about the authenticated user', data.body)
      },
      function (err) {
        console.log('Something went wrong!', err)
      }
    )
  }

  const addTrack = () => {
    spotifyApi
      .addTracksToPlaylist('11WrOV9QMQ36oXSVLjt7lP', [`${track.track.uri}`])
      .then(
        function (data) {
          console.log('Added tracks to playlist!', track)
        },
        function (err) {
          console.log(`'Something went wrong!'`, err)
        }
      )
  }

  const deleteTrack = () => {
    var tracks = [{ uri: `${track.track.uri}` }]
    var playlistId = '11WrOV9QMQ36oXSVLjt7lP'

    spotifyApi.removeTracksFromPlaylist(playlistId, tracks).then(
      function (data) {
        onDelete(track.track.uri)
        console.log('Song Removed')
      },
      function (err) {
        console.log('Something went wrong!', err)
      }
    )
  }
  const playSong = () => {
    setCurrentTrackId(track.track.id)

    spotifyApi.play({
      uris: [track.track.uri],
    })
  }

  return (
    <div className="grid  grid-cols-2 rounded-lg py-4 px-5 text-gray-500 hover:bg-gray-900">
      <div className="item-center  flex space-x-4 ">
        <p>{order + 1}</p>
        <img
          data-testid="album-cover"
          onClick={playSong}
          className="h-10 w-10 cursor-pointer"
          src={track.track.album.images[0].url}
          alt="Song Album Cover"
        />

        <div>
          <p className="w-36 truncate text-white lg:w-64 ">
            {track.track.name}
          </p>
          <p className="w-40 ">{track.track.artists[0].name}</p>
        </div>
      </div>
      <div className="ml-auto flex items-center justify-between md:ml-0">
        <p className="hidden w-40 truncate md:inline">
          {track.track.album.name}
        </p>
        <div className="m-1 h-5 w-5 items-center justify-center">
          {fav === true ? (
            <TrashIcon onClick={deleteTrack} />
          ) : (
            <HeartIcon onClick={addTrack} />
          )}
        </div>
        <p className="hidden sm:inline">
          {millisToMinutesAndSeconds(track.track.duration_ms)}
        </p>
      </div>
    </div>
  )
}

export default Song

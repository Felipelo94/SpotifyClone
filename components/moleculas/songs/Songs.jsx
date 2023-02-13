import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { playlistState } from '../../atoms/playlist/playlistAtom'
import Song from '../../atoms/song/Song'

function Songs() {
  const playlist = useRecoilValue(playlistState)

  const [songRemoved, setSongRemoved] = useState(null)

  const isFav = playlist && playlist.id === '11WrOV9QMQ36oXSVLjt7lP'

  return (
    <div className=" flex flex-col space-y-1 px-8 pb-28 text-white">
      {playlist?.tracks.items.map((track, i) => (
        <Song
          key={i}
          track={track}
          order={i}
          fav={isFav}
          onDelete={(id) => setSongRemoved(id)}
        />
      ))}
    </div>
  )
}

export default Songs

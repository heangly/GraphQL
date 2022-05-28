import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import Song from './Song'

const SongList = (props) => {
  const renderSongs = () => {
    if (props.data.loading) {
      return <p>Loading...</p>
    }

    return props.data.songs.map((song) => (
      <Song key={song.id} title={song.title} />
    ))
  }

  return (
    <div>
      <h1>Lyrical</h1>
      <ul className='collection'>{renderSongs()}</ul>
      <button>Create song</button>
    </div>
  )
}

const query = gql`
  {
    songs {
      id
      title
    }
  }
`

export default graphql(query)(SongList)

import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'

import Song from './Song'

class SongList extends Component {
  constructor() {
    super()
  }

  renderSongs() {
    if (this.props.data.loading) {
      return <p>Loading...</p>
    }

    return this.props.data.songs.map((song) => (
      <Song key={song.id} title={song.title} />
    ))
  }

  render() {
    return (
      <div>
        <h1>Lyrical</h1>
        <ul className='collection'>{this.renderSongs.call(this)}</ul>
        <Link className='btn-floating btn-large red right' to='/songs/new'>
          <i className='material-icons'>add</i>
        </Link>
      </div>
    )
  }
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

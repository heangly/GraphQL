import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'

import fetchSongsQuery from '../../queries/fetchSongs'

class SongList extends Component {
  constructor() {
    super()
  }

  deleteHandler(id) {
    this.props
      .mutate({
        variables: { id }
      })
      .then(() => this.props.data.refetch())
  }

  renderSongs() {
    if (this.props.data.loading) {
      return <p>Loading...</p>
    }

    return this.props.data.songs.map((song) => (
      <li key={song.id} className='collection-item'>
        <span
          onClick={() => this.props.history.push(`/songs/${song.id}/detail`)}
        >
          {song.title}
        </span>
        <i
          className='material-icons'
          onClick={this.deleteHandler.bind(this, song.id)}
        >
          delete
        </i>
      </li>
    ))
  }

  render() {
    return (
      <div>
        <h1>All Songs</h1>
        <ul className='collection'>{this.renderSongs.call(this)}</ul>
        <Link className='btn-floating btn-large red right' to='/songs/new'>
          <i className='material-icons'>add</i>
        </Link>
      </div>
    )
  }
}

const mutationQuery = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`

export default graphql(mutationQuery)(graphql(fetchSongsQuery)(SongList))

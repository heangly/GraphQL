import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'

import query from '../../queries/fetchSong'
import LyricCreate from '../Lyric/LyricCreate'
import LyricList from '../Lyric/LyricList'

class SongDetail extends Component {
  constructor() {
    super()
  }

  renderSong() {
    if (this.props.data.loading) {
      return <p>Loading...</p>
    }

    return (
      <div>
        <h3>{this.props.data.song.title}</h3>
        <LyricList lyrics={this.props.data.song.lyrics} />
      </div>
    )
  }

  render() {
    return (
      <div>
        <Link to='/'>Back</Link>
        {this.renderSong()}
        <LyricCreate songId={this.props.match.params.id} />
      </div>
    )
  }
}

export default graphql(query, {
  options: (props) => {
    return { variables: { id: props.match.params.id } }
  }
})(SongDetail)

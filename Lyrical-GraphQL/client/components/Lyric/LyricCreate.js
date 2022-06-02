import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

class LyricCreate extends Component {
  constructor() {
    super()
    this.state = { content: '' }
  }

  submitHandler(e) {
    e.preventDefault()
    if (this.state.content.trim().length === 0) return

    this.props
      .mutate({
        variables: {
          content: this.state.content,
          songId: this.props.songId
        }
      })
      .then(() => this.setState({ content: '' }))
  }

  render() {
    return (
      <form onSubmit={this.submitHandler.bind(this)}>
        <label>Add a lyric</label>
        <input
          type='text'
          value={this.state.content}
          onChange={(e) => this.setState({ content: e.target.value })}
        />
      </form>
    )
  }
}

const mutation = gql`
  mutation AddLyricToSong($songId: ID!, $content: String!) {
    addLyricToSong(songId: $songId, content: $content) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`

export default graphql(mutation)(LyricCreate)

import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'

class SongCreate extends Component {
  constructor() {
    super()
    this.state = { title: '' }
  }

  submitHandler(event) {
    event.preventDefault()

    if (this.state.title.trim().length === 0) return

    this.props
      .mutate({
        variables: {
          title: this.state.title
        }
      })
      .then(() => {
        this.props.history.push('/')
      })
      .catch(() => {})
  }

  render() {
    return (
      <div>
        <Link to='/'>Back</Link>
        <h3>Create a New Song</h3>
        <form onSubmit={this.submitHandler.bind(this)}>
          <label htmlFor='title'>Song Title:</label>
          <input
            id='title'
            type='text'
            onChange={(e) => this.setState({ title: e.target.value })}
            value={this.state.title}
          />
        </form>
      </div>
    )
  }
}

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`

export default graphql(mutation)(SongCreate)

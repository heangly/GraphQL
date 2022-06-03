import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import query from '../queries/CurrentUser'

class Header extends Component {
  constructor() {
    super()
    this.state = { user: null }
  }

  render() {
    console.log(this.props.data.user)
    return <div>Header</div>
  }
}

export default graphql(query)(Header)

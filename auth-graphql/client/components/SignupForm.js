import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import AuthForm from './AuthForm'
import mutation from '../mutations/Signup'
import query from '../queries/CurrentUser'

class SignupForm extends Component {
  constructor(props) {
    super(props)
    this.state = { errors: [] }
  }

  onSubmit({ email, password }) {
    this.props
      .mutate({
        variables: { email, password },
        refetchQueries: [{ query }]
      })
      .then(() => this.setState({ errors: [] }))
      .catch((err) => {
        const errors = err.graphQLErrors.map((err) => err.message)
        this.setState({ errors })
      })
  }

  render() {
    return (
      <div>
        <h3>Sign Up</h3>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.onSubmit.bind(this)}
        />
      </div>
    )
  }
}

export default graphql(mutation)(SignupForm)

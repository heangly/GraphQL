import React, { Component } from 'react'

class AuthForm extends Component {
  constructor(props) {
    super(props)
    this.state = { email: '', password: '' }
  }

  onSubmitHandler(e) {
    e.preventDefault()
    if (
      this.state.email.trim().length === 0 ||
      this.state.password.trim().length === 0
    ) {
      return
    }
    this.props.onSubmit(this.state)
    this.setState({ email: '', password: '' })
  }

  render() {
    return (
      <div className='row'>
        <form className='col s4' onSubmit={this.onSubmitHandler.bind(this)}>
          <div className='input-field'>
            <input
              placeholder='email'
              type='text'
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>

          <div className='input-field'>
            <input
              placeholder='password'
              type='password'
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </div>

          {this.props.errors.length > 0 &&
            this.props.errors.map((err) => (
              <div className='errors' key={err}>
                {err}
              </div>
            ))}

          <button className='btn'>Submit</button>
        </form>
      </div>
    )
  }
}

export default AuthForm

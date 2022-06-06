import React, { Component } from 'react'

class AuthForm extends Component {
  constructor() {
    super()
    this.onSubmitHandler.bind(this)
    this.state = { email: '', password: '' }
  }

  onSubmitHandler(e) {
    e.preventDefault()
    console.log(submit)
  }

  render() {
    return (
      <div className='row'>
        <form className='col s4' onSubmit={this.onSubmitHandler}>
          <div className='input-field'>
            <label>Email</label>
            <input
              type='text'
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>

          <div className='input-field'>
            <label>password</label>
            <input
              type='password'
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </div>

          <button className='btn'>Submit</button>
        </form>
      </div>
    )
  }
}

export default AuthForm

import { gql, useMutation } from '@apollo/client'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { storeUser } from '../redux/slices/auth'

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`

const LoginScreen = () => {
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const { username, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onChange = (e) => {
    setFormData((preState) => ({
      ...preState,
      [e.target.name]: e.target.value
    }))
  }

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      const { username, token } = result.data.login
      dispatch(storeUser({ username, token }))
      navigate('/')
    },

    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors)
    },

    variables: formData
  })

  const onSubmit = (e) => {
    e.preventDefault()
    loginUser()
  }

  return (
    <>
      <h3 className='text-center my-5'>Login</h3>

      {loading ? (
        <h5 className='my-5 text-center'>Logging in...</h5>
      ) : (
        <section
          className='form'
          style={{ maxWidth: '700px', margin: '0 auto' }}
        >
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                id='username'
                name='username'
                value={username}
                placeholder='Enter your username'
                onChange={onChange}
              />
            </div>

            <div className='form-group'>
              <input
                type='password'
                className='form-control'
                id='password'
                name='password'
                value={password}
                placeholder='Enter your password'
                onChange={onChange}
              />
            </div>

            <div className='form-group'>
              <button type='submit' className='btn btn-block btn-info'>
                Sign In
              </button>
            </div>
          </form>

          {Object.keys(errors).length > 0 && (
            <div className='alert alert-danger' role='alert'>
              {Object.values(errors).map((value) => (
                <li key={value}>{value}</li>
              ))}
            </div>
          )}
        </section>
      )}
    </>
  )
}

export default LoginScreen

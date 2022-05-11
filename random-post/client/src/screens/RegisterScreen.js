import { gql, useMutation } from '@apollo/client'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { storeUser } from '../redux/slices/auth'

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`

const RegisterScreen = () => {
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const { username, email, password, confirmPassword } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onChange = (e) => {
    setFormData((preState) => ({
      ...preState,
      [e.target.name]: e.target.value
    }))
  }

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      const { username, token } = result.data.register
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
    registerUser()
  }

  return (
    <>
      <h3 className='text-center my-5'>Register</h3>

      {loading ? (
        <h5 className='my-5 text-center'>Register new user...</h5>
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
                type='email'
                className='form-control'
                id='email'
                name='email'
                value={email}
                placeholder='Enter your email'
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
              <input
                type='password'
                className='form-control '
                id='confirmPassword'
                name='confirmPassword'
                value={confirmPassword}
                placeholder='Confirm your password'
                onChange={onChange}
              />
            </div>

            <div className='form-group'>
              <button type='submit' className='btn btn-block btn-info'>
                Sign Up
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

export default RegisterScreen

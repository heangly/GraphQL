import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
    }
  }
`
const CreatePostScreen = () => {
  const [errors, setErrors] = useState({})
  const [body, setBody] = useState('')

  const { token } = useSelector((state) => state.auth.user)
  const navigate = useNavigate()

  useEffect(() => {
    !token && navigate('/login')
  }, [token, navigate])

  const [createNewPost, { loading }] = useMutation(CREATE_POST, {
    variables: body,

    update(_, result) {
      // const { username, body } = result.data.createPost
      navigate('/')
    },

    onError(err) {
      console.log(err)
      setErrors('Cannot Create Post')
    }
  })

  const onSubmit = (e) => {
    e.preventDefault()
    createNewPost()
  }

  return (
    <>
      <Link to='/' className='btn btn-secondary'>
        go back
      </Link>
      <h3 className='text-center my-5'>Create New Post</h3>

      {loading ? (
        <h5 className='my-5 text-center'>Creating new post...</h5>
      ) : (
        <section
          className='form'
          style={{ maxWidth: '700px', margin: '0 auto' }}
        >
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <textarea
                rows='3'
                className='form-control'
                id='body'
                name='body'
                value={body}
                placeholder='Enter your content'
                onChange={(e) => setBody(e.target.value)}
              />
            </div>

            <div className='form-group'>
              <button type='submit' className='btn btn-primary'>
                Create Post
              </button>
            </div>
          </form>

          {Object.keys(errors).length > 0 && (
            <div className='alert alert-danger' role='alert'>
              {errors}
            </div>
          )}
        </section>
      )}
    </>
  )
}

export default CreatePostScreen

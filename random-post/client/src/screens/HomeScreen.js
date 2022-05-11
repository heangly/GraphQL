import React, { useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'
import PostCard from '../components/PostCard'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const FETCH_POSTS_QUERY = gql`
  query {
    getPosts {
      id
      body
      createdAt
      username
    }
  }
`

const HomeScreen = () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY)
  const { username, token } = useSelector((state) => state.auth.user)
  const navigate = useNavigate()

  useEffect(() => {
    !token && navigate('/login')
  }, [token, navigate])

  return (
    <div className='container'>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h6 className='alert alert-success mb-4'>Hello, {username}!</h6>
        <Link
          to='/create-post'
          className='btn btn-info'
          style={{ alignSelf: 'baseline', padding: '10px 30px' }}
        >
          Create Post
        </Link>
      </div>

      <h3 className='text-center'>All Posts</h3>
      <div className='row mt-3'>
        <div className='container'>
          <div className='col-12'>
            {loading ? (
              <h5 className='my-5'>Loading posts...</h5>
            ) : (
              data.getPosts?.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeScreen

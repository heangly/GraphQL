import React, { useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'
import PostCard from '../components/PostCard'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

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
  const { token } = useSelector((state) => state.auth.user)
  const navigate = useNavigate()

  useEffect(() => {
    !token && navigate('/login')
  }, [token, navigate])

  return (
    <div className='container text-center'>
      <h4>All Posts</h4>
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

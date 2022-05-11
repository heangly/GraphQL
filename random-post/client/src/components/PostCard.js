import React from 'react'
import moment from 'moment'

const PostCard = ({ post }) => {
  const editHandler = () => {}

  const deleteHandler = () => {}

  return (
    <div className='card my-5' style={{ width: '30rem', margin: '0 auto' }}>
      <div className='card-body'>
        <p className='card-text' style={{ fontSize: '1.1rem' }}>
          {post.body}
        </p>

        <small
          className='text-muted d-block my-3 mt-4'
          style={{ alignContent: 'end', textAlign: 'end' }}
        >
          <p className='card-text'>Posted by: {post.username}</p>
          {moment(post.createdAt).fromNow()}
        </small>
        <button className='btn btn-primary btn-sm mr-3' onClick={editHandler}>
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={deleteHandler}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default PostCard

import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const LyricList = ({ lyrics, mutate }) => {
  const clickHandler = (id, likes) => {
    mutate({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id,
          __typename: 'LyricType',
          likes: likes + 1
        }
      }
    })
  }

  return (
    <ul className='collection'>
      {lyrics.map((lyric) => (
        <li className='collection-item' key={lyric.id}>
          {lyric.content}
          <div className='vote-box'>
            <i
              className='material-icons'
              onClick={clickHandler.bind(null, lyric.id, lyric.likes)}
            >
              thumb_up
            </i>
            {lyric.likes}
          </div>
        </li>
      ))}
    </ul>
  )
}

const mutation = gql`
  mutation LikeLyric($id: ID!) {
    likeLyric(id: $id) {
      id
      likes
      content
      song {
        title
      }
    }
  }
`

export default graphql(mutation)(LyricList)

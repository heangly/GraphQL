import React from 'react'
import { Route, Switch } from 'react-router-dom'

import SongList from '../components/Song/SongList'
import SongCreate from './Song/SongCreate'

const App = () => {
  return (
    <div className='container'>
      <Switch>
        <Route exact path='/' component={SongList} />
        <Route path='/songs/new' component={SongCreate} />
      </Switch>
    </div>
  )
}

export default App

import React from 'react'
import { Route, Switch } from 'react-router-dom'

import SongList from '../components/Song/SongList'
import SongCreate from './Song/SongCreate'
import SongDetail from './Song/SongDetail'

const App = () => {
  return (
    <div className='container'>
      <Switch>
        <Route exact path='/' component={SongList} />
        <Route path='/songs/new' component={SongCreate} />
        <Route path='/songs/:id' component={SongDetail} />
      </Switch>
    </div>
  )
}

export default App

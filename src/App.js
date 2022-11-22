import './App.css';

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

const App = () => {

  const pageSize = 5
  const apiKey = process.env.REACT_APP_NEWS_API

  const [progress, setProgress] = useState(0)

  /*state = {
    progress: 0
  }
  setProgress = (progress) => {
    setState({
      progress: progress
  })
  } */

    return (
      <Router>
        <div>
          <Navbar />
        </div>
        <div>
          <LoadingBar
            color='#f11946'
            progress={progress}
            height={3}
          />
        </div>
        <Routes>
          <Route exact path='/'
            element={<News apiKey={apiKey} setProgress={setProgress} key="all" country="in" pageSize={pageSize} category='general' />} />
          <Route exact path='/business'
            element={<News apiKey={apiKey} setProgress={setProgress} key="business" country="in" pageSize={pageSize} category='business' />} />
          <Route exact path='/entertainment'
            element={<News apiKey={apiKey} setProgress={setProgress} key="entertainment" country="in" pageSize={pageSize} category='entertainment' />} />
          <Route exact path='/general'
            element={<News apiKey={apiKey} setProgress={setProgress} key="general" country="in" pageSize={pageSize} category='general' />} />
          <Route exact path='/health'
            element={<News apiKey={apiKey} setProgress={setProgress} key="health" country="in" pageSize={pageSize} category='health' />} />
          <Route exact path='/science'
            element={<News apiKey={apiKey} setProgress={setProgress} key="science" country="in" pageSize={pageSize} category='science' />} />
          <Route exact path='/sports'
            element={<News apiKey={apiKey} setProgress={setProgress} key="sports" country="in" pageSize={pageSize} category='sports' />} />
          <Route exact path='/technology'
            element={<News apiKey={apiKey} setProgress={setProgress} key="technology" country="in" pageSize={pageSize} category='technology' />} />
        </Routes>
      </Router>
    )
}

export default App
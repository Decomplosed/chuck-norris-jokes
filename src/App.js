import React, { useEffect, useState } from 'react'
import {
  AppBar,
  CssBaseline,
  Container,
  Typography,
  Tab,
  Tabs,
  CircularProgress,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import JokeCard from './JokeCard'

const useStyles = makeStyles({})

function App() {
  const [jokes, setJokes] = useState([])
  const [jokesToShow, setJokesToShow] = useState([])
  const [likedJokes, setLikedJokes] = useState([])
  const [currentTab, setCurrentTab] = useState(0)

  const classes = useStyles()

  useEffect(() => {
    fetch('https://api.icndb.com/jokes')
      .then((res) => res.json())
      .then((res) => {
        setJokes(res.value)
        setJokesToShow(res.value.slice(0, 10))
        observeElement()
      })
      .catch((err) => console.log(err))
    // eslint-disable-next-line
  }, [])

  const likeJoke = (id) => {
    if (likedJokes.find((joke) => joke.id === id)) return
    const likedJoke = jokes.find((joke) => joke.id === id)
    setLikedJokes([likedJoke, ...likedJokes])
  }

  const unlikeJoke = (id) => {
    const newLikedJokes = likedJokes.filter((joke) => joke.id !== id)
    setLikedJokes(newLikedJokes)
  }

  const changeTab = (event, value) => {
    setCurrentTab(value)
  }

  const addMoreJokes = () => {
    setJokesToShow(jokes.slice(0, jokesToShow.length + 10))
  }

  const observeElement = (bottomJoke) => {
    if (!bottomJoke) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting === true) {
          addMoreJokes()
        }
      },
      {
        treshold: 1,
      }
    )

    observer.observe(bottomJoke)
  }

  useEffect(() => {
    const bottomJokeEl = document.getElementById(
      `joke-${jokesToShow.length - 1}`
    )
    observeElement(bottomJokeEl)
  }, [jokesToShow])

  return (
    <div className='App'>
      <CssBaseline>
        <Container>
          <Typography variant='h1' align='center'>
            Chuck Norris Jokes
          </Typography>
          <AppBar position='sticky' style={{ marginBottom: 20 }}>
            <Tabs value={currentTab} onChange={changeTab} centered>
              <Tab label='Home' id='home-tab' aria-controls='home-panel' />
              <Tab label='Likes' id='like-tab' aria-controls='like-panel' />
            </Tabs>
          </AppBar>
          <div role='tabpanel' hidden={currentTab !== 0}>
            {jokesToShow.map((joke, index) => {
              return (
                <JokeCard
                  key={joke.id}
                  joke={joke}
                  likeJoke={likeJoke}
                  unlikeJoke={unlikeJoke}
                  index={index}
                />
              )
            })}
          </div>
          <div role='tabpanel' hidden={currentTab !== 1}>
            {likedJokes.map((joke) => (
              <JokeCard
                key={joke.id}
                joke={joke}
                likeJoke={likeJoke}
                unlikeJoke={unlikeJoke}
              />
            ))}
          </div>
        </Container>
      </CssBaseline>
    </div>
  )
}

export default App

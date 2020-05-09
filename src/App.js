import React, { useEffect, useState } from 'react'
import {
  AppBar,
  Card,
  CardContent,
  CardActions,
  Chip,
  CssBaseline,
  Container,
  Typography,
  Tab,
  Tabs,
  Button,
} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  card: {
    marginBottom: 20,
  },
  cardContent: {
    paddingBottom: 5,
  },
  cardActions: {
    padding: '16px',
  },
})

const Category = withStyles({
  root: {
    marginTop: 10,
    marginBottom: 10,
  },
})(Chip)

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
      })
      .catch((err) => console.log(err))
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

  return (
    <div className='App'>
      <CssBaseline>
        <Container>
          <Typography variant='h1' align='center'>
            Chuck Norris Jokes
          </Typography>
          <AppBar>
            <Tabs value={currentTab} onChange={changeTab}>
              <Tab label='Home' id='home-tab' aria-controls='home-panel' />
              <Tab label='Likes' id='like-tab' aria-controls='like-panel' />
            </Tabs>
          </AppBar>
          <div role='tabpanel' hidden={currentTab !== 0}>
            {jokesToShow.map((joke) => (
              <Card key={joke.id} className={classes.card}>
                <CardContent className={classes.cardContent}>
                  {joke.categories.length > 0 ? (
                    joke.categories.map((cat) => (
                      <Category label={cat} variant='outlined' />
                    ))
                  ) : (
                    <Category label='regular' variant='outlined' />
                  )}
                  <Typography>{joke.joke}</Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() => likeJoke(joke.id)}
                  >
                    Like
                  </Button>
                  <Button
                    variant='contained'
                    color='default'
                    onClick={() => unlikeJoke(joke.id)}
                  >
                    Unlike
                  </Button>
                </CardActions>
              </Card>
            ))}
          </div>
          <div role='tabpanel' hidden={currentTab !== 1}>
            <h1>Likes</h1>
          </div>
        </Container>
      </CssBaseline>
    </div>
  )
}

export default App

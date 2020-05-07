import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardActions,
  CssBaseline,
  Container,
  Typography,
  Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

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

const likeJoke = (id) => {
  console.log('Liking joke ', id)
}

const unlikeJoke = (id) => {
  console.log('Unliking joke ', id)
}

function App() {
  const [jokes, setJokes] = useState([])
  const [jokesToShow, setJokesToShow] = useState([])
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

  return (
    <div className='App'>
      <CssBaseline>
        <Container>
          <Typography variant='h1' align='center'>
            Chuck Norris Jokes
          </Typography>
          {jokesToShow.map((joke) => (
            <Card key={joke.id} className={classes.card}>
              <CardContent className={classes.cardContent}>
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
        </Container>
      </CssBaseline>
    </div>
  )
}

export default App

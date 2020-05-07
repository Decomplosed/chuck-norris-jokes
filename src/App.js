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
    padding: '24px',
  },
})

function App() {
  const [jokes, setJokes] = useState([])
  const classes = useStyles()

  useEffect(() => {
    fetch('https://api.icndb.com/jokes')
      .then((res) => res.json())
      .then((res) => {
        setJokes(res.value)
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
          {jokes.map((joke) => (
            <Card key={joke.id} className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography>{joke.joke}</Typography>
              </CardContent>
              <CardActions>
                <Button variant='contained' color='primary'>
                  Like
                </Button>
                <Button variant='contained' color='secondary'>
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

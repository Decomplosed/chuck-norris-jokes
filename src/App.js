import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardActions,
  CssBaseline,
  Container,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

function App() {
  const [jokes, setJokes] = useState([])

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
            <Card>
              <CardContent>
                <Typography>{joke.joke}</Typography>
              </CardContent>
            </Card>
          ))}
        </Container>
      </CssBaseline>
    </div>
  )
}

export default App

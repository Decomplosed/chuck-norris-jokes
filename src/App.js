import React, { useEffect } from 'react'
import {
  Card,
  CardContent,
  CardActions,
  CssBaseline,
  Container,
  Typography,
} from '@material-ui/core'

function App() {
  useEffect(() => {
    fetch('https://api.icndb.com/jokes')
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className='App'>
      <CssBaseline>
        <Container>
          <Typography variant='h1' align='center'>
            Chuck Norris Jokes
          </Typography>
        </Container>
      </CssBaseline>
    </div>
  )
}

export default App

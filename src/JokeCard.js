import React from 'react'

export default function JokeCard() {
  return (
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
  )
}

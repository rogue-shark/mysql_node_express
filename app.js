import express from 'express'

const app = express()

app.get('/notes', (req, res) => {
    res.send('Hello World!')
})

//handle error
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something went wrong');
});

app.listen(8080, () => {
    console.log(`Listening to port: 8080`)
})

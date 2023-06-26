import express from 'express'
import { getAllNotes, getNote, createNote } from './database.js';

const app = express()

app.get('/notes', async (req, res) => {
    const notes = await getAllNotes()
    res.send(notes)
})

//handle error
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something went wrong');
});

app.listen(8080, () => {
    console.log(`Listening to port: 8080`)
})

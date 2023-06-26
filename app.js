import express from 'express'
import { getAllNotes, getNote, createNote } from './database.js';

const app = express()

app.use(express.json()) // POSTing as JSON on post route

app.get('/notes', async (req, res) => {
    const notes = await getAllNotes()
    res.send(notes)
})

app.get('/notes/:id', async (req, res) => {
    const id = req.params.id
    const note = await getNote(id)
    res.send(note)
})

app.post('/notes', async (req, res) => {
    const {title, contents} = req.body
    const note = await createNote(title, contents)
    res.status(201).send(note)
})

//handle error
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something went wrong');
});

app.listen(8080, () => {
    console.log(`Listening to port: 8080`)
})

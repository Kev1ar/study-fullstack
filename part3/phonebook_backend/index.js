const express = require('express')
const cors = require('cors')
var morgan = require('morgan')
const app = express()

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan (
  function (tokens, req, res) {
    console.log(req.body)
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      JSON.stringify(req.body)
    ].join(' ')
  }

))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]




app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
   if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

const generateRandomId = (n) => {
  return Math.floor(Math.random() * n)
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).json({ 
            error: 'name or number missing' 
        })
    }
    if(persons.find(person => person.name === body.name)){
        return response.status(400).json({ 
            error: 'name must be unique' 
        })
    }

    const newPerson = {
        id: generateRandomId(10000).toString(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(newPerson)

    response.json(newPerson)
})

app.get('/info', (request, response) => {
  const requestTime = new Date();
  console.log(requestTime);
  response.send(`
    <p>Phonebook has info for ${persons.length}</p>
    <p>${requestTime}</p>
    `);
})


app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(note => note.id !== id)

  response.status(204).end()
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

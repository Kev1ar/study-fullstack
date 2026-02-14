require('dotenv').config()

const express = require('express')
const cors = require('cors')
var morgan = require('morgan')
const app = express()

const Contact = require('./models/contact')

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
  Contact.find({}).then (contacts => {
    response.json(contacts)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
    Contact.findById(request.params.id)
      .then(contact => {
        if (!contact) {
          return response.status(404).json({ error: 'contact not found' })
        }

        response.json(contact)
      })
      .catch(error => next(error))
})


app.post('/api/persons', (request, response, next) => {
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).json({ 
            error: 'name or number missing' 
        })
    }

    // if(persons.find(person => person.name === body.name)){
    //     return response.status(400).json({ 
    //         error: 'name must be unique' 
    //     })
    // }
    
    const newContact = new Contact({
        name: body.name,
        number: body.number
    })

    newContact.save().then(savedContact => {
      response.json(savedContact)
    }).catch(error => next(error))
})

app.get('/info', (request, response) => {
  const requestTime = new Date();
  console.log(requestTime);
  response.send(`
    <p>Phonebook has info for ${persons.length}</p>
    <p>${requestTime}</p>
    `);
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Contact.findById(request.params.id)
    .then(contact => {
      if (!contact) {
        return response.status(404).end()
      }

      contact.name = name
      contact.number = number

      return contact.save().then((updatedContact) => {
        response.json(updatedContact)
      })
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
  Contact.findByIdAndDelete(request.params.id)
     .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

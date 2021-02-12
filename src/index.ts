import express from 'express'
import patientRouter from './routes/patientsRouter'
import diagnosesRouter from './routes/diagnosesRouter'
import dotenv from 'dotenv'
import cors from 'cors'
const path = require('path')

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api', function (req, res) {
  res.send('Example')
})

app.use(express.static('public'))

app.use('/api/patients', patientRouter)

app.use('/api/diagnoses', diagnosesRouter)

const port = process.env.PORT || 3000

app.listen(port)

console.log(`Server started on port ${port}`)

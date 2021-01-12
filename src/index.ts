import Express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { graphConfig } from './graphql-config'
import cors from 'cors'

const app = Express()
const port = process.env.port ? process.env.port : 3000

app.use(cors())

app.use('/api', graphqlHTTP(graphConfig))

app.listen(port, (): void => {
  console.log(`Server is listening at http://localhost:${port}/api`)
})

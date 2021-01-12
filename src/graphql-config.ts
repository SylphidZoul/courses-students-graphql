import { GraphQLSchema } from 'graphql'
import { Options } from 'express-graphql'
import { makeExecutableSchema } from 'graphql-tools'
import { typeDefs } from './schema'
import resolvers from './resolvers'

const schema: GraphQLSchema = makeExecutableSchema({ typeDefs, resolvers })
const isDev = process.env.NODE_ENV !==  'production'

export const graphConfig: Options = {
  schema,
  rootValue: resolvers,
  graphiql: isDev,
  customFormatErrorFn: (err) => {
    return ({ message: err.message })
  }
}

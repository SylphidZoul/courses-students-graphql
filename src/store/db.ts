import { Db, MongoClient } from 'mongodb'

const mongoURL: string = process.env.MONGO_URI
const mongoName: string = process.env.MONGO_NAME 

let connection: Db

const connectDB = async (): Promise<Db> => {
  if (connection) return connection

  let client: MongoClient
  try {
    client = await MongoClient.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    connection = client.db(mongoName)
  } catch (error) {
    console.error('Could not connect to db', mongoURL, error)
    process.exit()
  }

  return connection
}

export default connectDB

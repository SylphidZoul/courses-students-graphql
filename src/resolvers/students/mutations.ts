import { Db, DeleteWriteOpResultObject, InsertOneWriteOpResult, ObjectID } from 'mongodb'
import connectDB from '../../store/db'
import errorHandler from '../../lib/errorHandler'

export default {
  createPerson: async (_: any, { input }: { input: Student }): Promise<Student> => {
    const newStudent: Student = { ...input }
    let db: Db
    let response: InsertOneWriteOpResult<any>
    try {
      db = await connectDB()
      response = await db.collection('students').insertOne(input)
      newStudent._id = response.insertedId
    } catch (error) {
      errorHandler('', error)
    }

    return newStudent
  },

  editPerson: async (_: any, { _id, input }: { _id: string, input: Student }): Promise<Student> => {
    let db: Db
    let student: Student|null = {}

    try {
      db = await connectDB()
      await db.collection('students').updateOne(
        { _id: new ObjectID(_id) },
        { $set: input }
      )
      student = await db.collection('students').findOne(
        { _id: new ObjectID(_id) }
      )
    } catch (error) {
      errorHandler('', error)
    }

    if (student === null) return errorHandler('The student was not found.')
    
    return student
  },

  deletePerson: async (_: any, { _id }: { _id: string }): Promise<string> => {
    let db: Db
    let student: DeleteWriteOpResultObject = { result: { ok: undefined, n: undefined } }
    try {
      db = await connectDB()
      student = await db.collection('students').deleteOne(
        { _id: new ObjectID(_id) })
    } catch (error) {
      errorHandler('', error)
    }

    const response: string = `Student with id: ${_id} ${
      student.deletedCount !== undefined && student.deletedCount > 0
      ? 'has been deleted.'
      : 'was not deleted.'
    }`

    return response
  }
}

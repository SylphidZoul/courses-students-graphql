import { Db, ObjectID } from 'mongodb'
import errorHandler from '../../lib/errorHandler'
import connectDB from '../../store/db'

export default {
  getPeople: async (): Promise<Student[]> => {
    let db: Db
    let students: Student[] = []

    try {
      db = await connectDB()
      students = await db.collection('students').find().toArray()
    } catch (error) {
      errorHandler('', error)
    }

    return students
  },

  getPerson: async (_: any, { id }: { id: string }): Promise<Student|never> => {
    let db: Db
    let student: Student | null = {}

    try {
      db = await connectDB()
      student = await db.collection('students').findOne({ _id: new ObjectID(id) })
    } catch (error) {
      errorHandler('', error)
    }

    if (student === null) return errorHandler('Student was not found.')

    return student
  }
}

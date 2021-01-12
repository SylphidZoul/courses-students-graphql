import { Db, ObjectID } from 'mongodb'
import errorHandler from '../../lib/errorHandler'
import connectDB from '../../store/db'

export default {
  getCourses: async (): Promise<Course[]> => {
    let db: Db
    let courses: Course[] = []
    try {
      db = await connectDB()
      courses = await db.collection('courses').find().toArray()
    } catch (error) {
      errorHandler('', error)
    }

    return courses
  },

  getCourse: async (_: any, { id }: { id: string }): Promise<Course|never> => {
    let db: Db
    let course: Course | null = {}

    try {
      db = await connectDB()
      course = await db.collection('courses').findOne({ _id: new ObjectID(id) })
    } catch (error) {
      errorHandler('', error)
    }

    if (course === null) return errorHandler('Course was not found.')

    return course
  }
}

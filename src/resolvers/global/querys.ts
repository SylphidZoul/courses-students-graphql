import { Db } from 'mongodb'
import errorHandler from '../../lib/errorHandler'
import connectDB from '../../store/db'

export default {
  searchItems: async (_: any, { keyword }: { keyword: string }): Promise<Array<Student|Course>> => {
    let db: Db
    let courses: Course[]
    let people: Student[]
    let items: Array<Course|Student> = []
    
    try {
      db = await connectDB()
      courses = await db.collection('courses').find({
        $text: { $search: keyword }
      }).toArray()
      people = await db.collection('students').find({
        $text: { $search: keyword }
      }).toArray()
      items = [...courses, ...people]
    } catch (error) {
      errorHandler('', error)
    }

    return items
  }
}
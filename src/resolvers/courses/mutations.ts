import { Db, DeleteWriteOpResultObject, InsertOneWriteOpResult, ObjectID } from 'mongodb'
import connectDB from '../../store/db'
import errorHandler from '../../lib/errorHandler'

export default {
  createCourse: async (_: any, { input }: { input: Course }): Promise<Course> => {
    const defaults = {
      teacher: '',
      topic: ''
    }

    const newCourse: Course = { ...defaults, ...input }
    let db: Db
    let response: InsertOneWriteOpResult<any>

    try {
      db = await connectDB()
      response = await db.collection('courses').insertOne(input)
      newCourse._id = response.insertedId
    } catch (error) {
      errorHandler('', error)
    }

    return newCourse
  },

  editCourse: async (_: any, { _id, input }: { _id: string, input: Course }): Promise<Course | never> => {
    let db: Db
    let course: Course | null = {}

    try {
      db = await connectDB()
      await db.collection('courses').updateOne(
        { _id: new ObjectID(_id) },
        { $set: input }
      )
      course = await db.collection('courses').findOne(
        { _id: new ObjectID(_id) }
      )
    } catch (error) {
      errorHandler(error)
    }

    if (course === null) return errorHandler(`Course with id: "${_id}", was not found.`)

    return course
  },

  deleteCourse: async (_: any, { _id }: { _id: string }): Promise<string> => {
    let db: Db
    let course = {} as DeleteWriteOpResultObject
    try {
      db = await connectDB()
      course = await db.collection('courses').deleteOne(
        { _id: new ObjectID(_id) })
    } catch (error) {
      errorHandler(error)
    }

    const response: string = `Course with id: ${_id} ${
      course.deletedCount !== undefined && course.deletedCount > 0
      ? 'has been deleted.'
      : 'was not deleted.'
    }`

    return response
  },

  addPeople: async (_: any, { courseID, personID }: { courseID: string, personID: string}): Promise<Course | null> => {
    let db: Db
    let person: Student | null
    let course: Course | null = {}
    const CourseID = new ObjectID(courseID)
    const PersonID = new ObjectID(personID)

    try {
      db = await connectDB()
      course = await db.collection('courses').findOne({ _id: CourseID })
      person = await db.collection('students').findOne({ _id: PersonID })

      if (course === null || person === null) return errorHandler('Course or student not found.')

      await db.collection('courses').updateOne(
        { _id: CourseID },
        { $addToSet: { people: PersonID } }
      )
    } catch (error) {
      errorHandler(error)
    }

    return course
  }
}

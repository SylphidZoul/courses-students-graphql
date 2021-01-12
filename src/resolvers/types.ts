import connectDB from '../store/db'
import errorHandler from '../lib/errorHandler'
import { Db, ObjectID } from 'mongodb'

export default {
  Course: {
    people: async ({ people }: { people: string[] | undefined }): Promise<Student[]|[]> => {
      let db: Db, ids: ObjectID[]
      let peopleData: Student[] = []

      try {
        db = await connectDB()
        ids = people ? people.map((id: string) => new ObjectID(id)) : []
        peopleData = ids.length > 0
          ? await db.collection('students').find({ _id: { $in: ids } }).toArray()
          : []
      } catch (error) {
        errorHandler('', error)
      }

      return peopleData
    }
  },

  Person: {
    __resolveType: (person: Student) => {
      if ('phone' in person) {
        return 'Monitor'
      }
      return 'Student'
    } 
  },

  GlobalSearch: {
    __resolveType: (item: Course|Student) => {
      if ('title' in item) return 'Course'
      if ('phone' in item) return 'Monitor'
      return 'Student'
    }
  }
}

import StudentsQuerys from './students/querys'
import CoursesQuerys from './courses/querys'
import StudentsMutations from './students/mutations'
import CoursesMutations from './courses/mutations'
import GlobalQuery from './global/querys'
import types from './types'
import { IResolvers } from 'graphql-tools'

const Query = { ...CoursesQuerys, ...StudentsQuerys, ...GlobalQuery }
const Mutation = { ...CoursesMutations, ...StudentsMutations}

const resolvers: IResolvers = { Query, Mutation, ...types }

export default resolvers

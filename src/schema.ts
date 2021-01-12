import { ITypeDefinitions } from "graphql-tools";

export const typeDefs: ITypeDefinitions = `
"Validates the types of level"
  enum Level {
    beginner
    intermediate
    advanced
  }

  union GlobalSearch = Course | Student | Monitor

  type Course {
    _id: ID!
    title: String!
    teacher: String
    description: String!
    topic: String @deprecated
    people: [Student]
    level: Level
  }

  interface Person {
    _id: ID!
    name: String!
    email: String!
  }

  type Student implements Person {
    _id: ID!
    name: String!
    email: String!
    avatar: String 
  }

  type Monitor implements Person {
    _id: ID!
    name: String!
    email: String!
    phone: String
  }

  type Query {
  "Return all courses"
    getCourses: [Course]
  "Return a course"
    getCourse(id: ID!): Course
  "Return all students"
    getPeople: [Person]
  "Return a student"
    getPerson(id: ID!): Person
  "Executes a global search"
    searchItems(keyword: String!): [GlobalSearch]
  }

  input CourseInput {
    title: String!
    teacher: String
    description: String!
    topic: String
    level: Level
  }

  input CourseEditInput {
    title: String
    teacher: String
    description: String
    topic: String
  }

  input PersonInput {
    name: String!
    email: String!
    phone: String
    avatar: String
  }

  input PersonEditInput {
    name: String
    email: String
    phone: String
    avatar: String
  }

  type Mutation {
    "Creates a course"
    createCourse(input: CourseInput!): Course
    "Edits a course"
    editCourse(_id: ID!, input: CourseEditInput!): Course
    "Creates a student"
    createPerson(input: PersonInput!): Person
    "Edits a student"
    editPerson(_id: ID!, input: PersonEditInput!): Person
    "Deletes a course"
    deleteCourse(_id: ID!): String
    "Deletes a student"
    deletePerson(_id: ID!): String
    "Adds a student in a course"
    addPeople(courseID: ID!, personID: ID!): Course
  }
`
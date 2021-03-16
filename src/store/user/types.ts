import { Course } from '../course/types'

export type UserType = 'student' | 'teacher'
interface UserInfo {
  firstName: string
  lastName: string
  userType: UserType
}

export interface LoginStudentResponse {
  message: string
  dataResponse: Student
}
export interface LoginTeacherResponse {
  message: string
  dataResponse: Teacher
}

export interface StoredLocalStorageUser {
  type: UserType
  data<T>(): T
}
export interface Student {
  studentId: number
  year: number
  academicYear: number
  faculty: string
  major: string
  advisor: string
  studentInfo: UserInfo
}

export interface Teacher {
  teacherId: number
  teacherInfo: UserInfo
  teacherEmail: string
}

export interface UserState {
  loginUserType: UserType | null
  student: Student | null
  teacher: Teacher | null
  myCourses: Course[]
}

export type UserActionTypes =
  | { type: 'SET_USER_TYPE'; payload: UserType | null }
  | { type: 'SET_STUDENT'; payload: Student | null }
  | { type: 'SET_TEACHER'; payload: Teacher | null }
  | { type: 'SET_MY_COURSES'; payload: Course[] }
  | { type: 'ADD_MY_COURSES'; payload: Course }
  | { type: 'DELETE_MY_COURSE'; payload: number }

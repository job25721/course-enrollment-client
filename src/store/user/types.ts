export type UserType = 'student' | 'teacher'
interface UserInfo {
  firstName: string
  lastName: string
  userType: UserType
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
  loginUser: UserType
  student: Student | null
  teacher: Teacher | null
}

export type UserActionTypes =
  | { type: 'SET_USER_TYPE'; payload: UserType }
  | { type: 'SET_STUDENT'; payload: Student }
  | { type: 'SET_TEACHER'; payload: Teacher }

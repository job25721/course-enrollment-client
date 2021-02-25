export interface Student {
  studentId: number
  firstName: string
  lastName: string
  year: number
  academicYear: number
  faculty: string
  major: string
  advisor: string
}

export interface Instructor {}

export interface UserState {
  loginUser: Student | Instructor | null
}

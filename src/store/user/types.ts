type UserType = 'student' | 'teacher'
interface UserInfo {
  firstName: string
  lastName: string
  userType: UserType
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
  loginUser: Student | Teacher | null
}

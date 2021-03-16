import { ApiCourseResponse, Course } from '../store/course/types'
import {
  LoginStudentResponse,
  LoginTeacherResponse,
  Student,
  Teacher,
} from '../store/user/types'
import api from './api'

const teacher = {
  login: (email: string) =>
    api
      .post<LoginTeacherResponse>('/user/teacher/login', { tEmail: email })
      .then((res) => res.data),
  getMyInfo: (email: string) =>
    api
      .get<Teacher | null>('/user/teacher/my', { params: { email } })
      .then((res) => res.data),
  getMyAddedCourses: (email: string) =>
    api
      .get<Course[]>('/user/teacher/courses', { params: { email } })
      .then((res) => res.data),
}

const student = {
  login: (stdId: number) =>
    api
      .post<LoginStudentResponse>('/user/std/login', { stdId })
      .then((res) => res.data),
  getMyInfo: (sid: number) =>
    api
      .get<Student | null>('/user/std/my', { params: { sid } })
      .then((res) => res.data),
  getMyEnrolledCourses: (sid: number) =>
    api
      .get<Course[]>('/user/std/courses', {
        params: {
          sid,
        },
      })
      .then((res) => res.data),
  enrollCourse: (cid: number, secId: number, sid: number) =>
    api
      .post<ApiCourseResponse>(
        '/user/std/enroll',
        {},
        {
          params: {
            cid,
            secId,
            sid,
          },
        }
      )
      .then((res) => res.data),
  dropCourse: (cid: number, secId: number, sid: number) =>
    api
      .post<ApiCourseResponse>(
        '/user/std/drop',
        {},
        {
          params: {
            cid,
            secId,
            sid,
          },
        }
      )
      .then((res) => res.data),
}

export { teacher, student }

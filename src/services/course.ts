import { ApiCourseResponse, Course } from '../store/course/types'
import api from './api'

const getAllCourses = () =>
  api.get<Course[]>('/courses').then((res) => res.data)

const getCourseById = (id: number) =>
  api
    .get<Course | null>('/course', {
      params: {
        cid: id,
      },
    })
    .then((res) => res.data)

const addNewCourse = (course: Course) =>
  api.post<ApiCourseResponse>('/courses', course).then((res) => res.data)

const removeCourse = (id: number) =>
  api
    .post<ApiCourseResponse>(`/course/delete?cid=${id}`)
    .then((res) => res.data)

export { getAllCourses, getCourseById, addNewCourse, removeCourse }

import { Input } from '../../src/components/Input'
import Navbar from '../../src/components/Navbar'
import { SearchOutline } from 'react-ionicons'
import { CourseCard } from '../../src/components/course/Card'
import { Dispatch, useEffect, useState } from 'react'
import { Course as CourseType } from '../../src/store/course/types'
import { getAllCourses } from '../../src/services/course'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, StoreEvent } from 'src/store'
import { student as studentService } from 'src/services/user'

const Course = () => {
  const dispatch = useDispatch<Dispatch<StoreEvent>>()
  const [err, setErr] = useState<string | null>(null)
  const { loginUserType, student } = useSelector(
    (state: RootState) => state.user
  )
  const { courses } = useSelector((state: RootState) => state.course)

  useEffect(() => {
    const fetchNyCourse = async () => {
      if (loginUserType === 'student' && student) {
        try {
          const enrolled = await studentService.getMyEnrolledCourses(
            student.studentId
          )
          dispatch({ type: 'SET_MY_COURSES', payload: enrolled })
        } catch (err) {
          setErr(err.message)
        }
      }
    }
    fetchNyCourse()
  }, [student])

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getAllCourses()
        setErr(null)
        dispatch({ type: 'SET_COURSE', payload: res })
      } catch (err) {
        setErr(err.message)
      }
    }

    fetchCourses()
  }, [])
  return (
    <Navbar>
      <h1 className="text-4xl py-2">Open courses</h1>
      <div className="flex items-center">
        <Input
          placeholder="Search..."
          className="rounded-3xl py-2 focus:border-blue-300 shadow-sm my-2"
        />
        <button className="px-4 py-4 rounded-3xl focus:outline-none">
          <SearchOutline />
        </button>
      </div>
      <div className="my-2 sm:h-5/6 h-3/4 overflow-auto w-full sm:w-4/5 lg:w-2/4">
        {err
          ? err
          : courses.map((course) => (
              <CourseCard course={course} key={course.courseId} />
            ))}
      </div>
    </Navbar>
  )
}

export default Course

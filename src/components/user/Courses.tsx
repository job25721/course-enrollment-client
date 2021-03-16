import { Dispatch, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { student, teacher } from 'src/services/user'
import { RootState, StoreEvent } from 'src/store'

import { UserCourseCard } from '../course/Card'

export const StudentCourses = () => {
  const dispatch = useDispatch<Dispatch<StoreEvent>>()
  const user = useSelector((state: RootState) => state.user.student)
  const { myCourses } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    const getMyEnroll = async () => {
      if (user) {
        const res = await student.getMyEnrolledCourses(user.studentId)
        dispatch({ type: 'SET_MY_COURSES', payload: res })
      }
    }
    getMyEnroll()
  }, [user])

  return (
    <>
      <div className="pt-4">
        <p className="text-lg">Enrolled courses SEMESTER 2/2564</p>
        <p>
          หน่วยกิตรวม{' '}
          {myCourses
            .map((course) => course.credit)
            .reduce((acc, cur) => acc + cur, 0)}
          /22 หน่วยกิต
        </p>
        <p>Your expected GPAX : 4.00</p>
      </div>
      <div className="my-2 sm:h-4/5 h-4/6 overflow-auto w-full sm:w-4/5 lg:w-2/4">
        {myCourses.map((course) => (
          <UserCourseCard
            type="student"
            course={course}
            key={course.courseId}
          />
        ))}
      </div>
    </>
  )
}

export const TeacherCourses = () => {
  const dispatch = useDispatch<Dispatch<StoreEvent>>()
  const user = useSelector((state: RootState) => state.user.teacher)
  const { myCourses } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    const getMyEnroll = async () => {
      if (user) {
        const res = await teacher.getMyAddedCourses(user.teacherEmail)
        dispatch({ type: 'SET_MY_COURSES', payload: res })
      }
    }
    getMyEnroll()
  }, [user])

  return (
    <>
      <div className="my-2 sm:h-4/5 h-4/6 overflow-auto w-full sm:w-4/5 lg:w-2/4">
        {myCourses.map((course) => (
          <UserCourseCard
            type="teacher"
            course={course}
            key={course.courseId}
          />
        ))}
      </div>
    </>
  )
}

import { Dispatch, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { student, teacher } from 'src/services/user'
import { RootState, StoreEvent } from 'src/store'

import { UserCourseCard, maxCredit } from '../course/Card'
export interface ExpectGpa {
  id: number
  gpa: number
  credit: number
}
export const StudentCourses = () => {
  const dispatch = useDispatch<Dispatch<StoreEvent>>()
  const user = useSelector((state: RootState) => state.user.student)
  const { myCourses } = useSelector((state: RootState) => state.user)
  const [expectGpa, setExpected] = useState<ExpectGpa[]>([])

  const [GPAX, setGpax] = useState(0.0)

  useEffect(() => {
    const getMyEnroll = async () => {
      if (user) {
        const res = await student.getMyEnrolledCourses(user.studentId)
        dispatch({ type: 'SET_MY_COURSES', payload: res })
      }
    }
    getMyEnroll()
  }, [user])
  useEffect(() => {
    const expectedObj = expectGpa
      .map(({ gpa, credit }) => ({
        sum: gpa === -1 ? 0 : gpa * credit,
        allCredit: gpa === -1 ? 0 : credit,
      }))
      .reduce(
        (acc, cur) => ({
          sum: acc.sum + cur.sum,
          allCredit: acc.allCredit + cur.allCredit,
        }),
        { sum: 0, allCredit: 0 }
      )
    if (expectedObj.allCredit === 0) setGpax(0)
    else setGpax(expectedObj.sum / expectedObj.allCredit)
  }, [expectGpa])

  useEffect(() => {
    setExpected(
      myCourses.map((c) => ({ id: c.courseId, gpa: -1, credit: c.credit }))
    )
  }, [myCourses])

  return (
    <>
      <div className="pt-4">
        <p className="text-lg">Enrolled courses SEMESTER 2/2564</p>
        <p>
          หน่วยกิตรวม{' '}
          {myCourses
            .map((course) => course.credit)
            .reduce((acc, cur) => acc + cur, 0)}
          /{maxCredit} หน่วยกิต
        </p>
        <p>Your expected GPAX : {GPAX.toFixed(2)}</p>
      </div>
      <div className="my-2 sm:h-4/5 h-4/6 overflow-auto w-full sm:w-4/5 lg:w-2/4">
        {myCourses.map((course) => (
          <UserCourseCard
            type="student"
            course={course}
            ctx={{ expected: expectGpa, setExpected }}
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

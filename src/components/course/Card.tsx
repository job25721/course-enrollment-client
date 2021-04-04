import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, StoreEvent } from 'src/store'
import { UserType } from 'src/store/user/types'
import { Course, CourseSection } from '../../store/course/types'
import { AlertDialog, AlertTypes } from '../AlertDialog'
import { Button } from '../Button'
import { Modal } from '../Modal'
import { student as studentService } from 'src/services/user'
import { removeCourse } from 'src/services/course'
import { ExpectGpa } from '../user/Courses'
export const maxCredit = 22
export const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  const { courseId, name, credit, sections, lecturer } = course
  const dispatch = useDispatch<Dispatch<StoreEvent>>()
  const [openModal, setModalOpen] = useState<boolean>(false)
  const { loginUserType, student, myCourses } = useSelector(
    (state: RootState) => state.user
  )
  const [alertMessage, setMessage] = useState<{
    message: string
    type: AlertTypes
    open: boolean
  }>({ message: '', type: 'success', open: false })

  const enroll = async (sectionId: number) => {
    if (loginUserType === 'student' && student) {
      try {
        const res = await studentService.enrollCourse(
          courseId,
          sectionId,
          student.studentId
        )
        dispatch({ type: 'UPDATE_COURSE', payload: res.dataResponse })
        dispatch({ type: 'ADD_MY_COURSES', payload: res.dataResponse })
        setMessage({
          ...alertMessage,
          open: true,
          message: res.message,
          type: 'success',
        })
      } catch (err) {
        setMessage({
          ...alertMessage,
          open: true,
          message: err.message,
          type: 'danger',
        })
      }
    }
  }

  return (
    <>
      <AlertDialog
        title={alertMessage.message}
        hasCancel={false}
        isOpen={alertMessage.open}
        type={alertMessage.type}
        onConfirm={() => setMessage({ ...alertMessage, open: false })}
      />
      <Modal
        title="Section manager"
        isOpen={openModal}
        onCancel={() => setModalOpen(false)}
      >
        {myCourses
          .map((course) => course.credit)
          .reduce((acc, cur) => acc + cur, 0) === maxCredit && (
          <p className="text-red-500">*หน่วยกิตเต็ม</p>
        )}
        <h1 className="text-lg">
          {courseId} - {name}
        </h1>
        <div className="p-3 overflow-x-auto">
          <table style={{ width: 380 }} className="table-fixed text-center">
            <thead>
              <tr>
                <th>no.</th>
                <th>day</th>
                <th>time</th>
                <th>room</th>
                <th>enrolled</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sections.map((sec) => (
                <tr key={sec.sectionId}>
                  <td>{sec.sectionId}</td>
                  <td>{sec.day}</td>
                  <td>{sec.time}</td>
                  <td>{sec.room}</td>
                  <td>
                    {sec.enrolledPerson.length}/
                    {sec.seat + sec.enrolledPerson.length}
                  </td>
                  <td>
                    {student && (
                      <Button
                        onClick={() => enroll(sec.sectionId)}
                        disabled={
                          myCourses.some(
                            (course) => course.courseId === courseId
                          ) ||
                          sec.enrolledPerson.length === sec.seat ||
                          myCourses
                            .map((course) => course.credit)
                            .reduce((acc, cur) => acc + cur, 0) === maxCredit
                        }
                        className="mx-2 bg-green-300"
                      >
                        <span className="text-sm">Enroll</span>
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>
      <div className="shadow-sm mb-4 rounded-lg w-full h-36 p-3 bg-white flex flex-col sm:flex-row">
        <div className="flex flex-col justify-start sm:justify-around sm:px-2">
          <p>
            {courseId} - {name}
          </p>
          <p>credits : {credit}</p>
          <p>
            lecturer : {lecturer.teacherInfo.firstName}{' '}
            {lecturer.teacherInfo.lastName}
          </p>
        </div>
        <div className="flex flex-1 items-center sm:px-4 sm:justify-end">
          <Button
            onClick={() => setModalOpen(true)}
            style={{ backgroundColor: '#4BABDC' }}
          >
            Sections
          </Button>
        </div>
      </div>
    </>
  )
}
type Grade = 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D+' | 'D' | 'F' | 'W'
interface Gpa {
  key: Grade
  value: number
}
const GPA: Gpa[] = [
  { key: 'A', value: 4.0 },
  { key: 'B+', value: 3.5 },
  { key: 'B', value: 3.0 },
  { key: 'C+', value: 2.5 },
  { key: 'C', value: 2.0 },
  { key: 'D+', value: 1.5 },
  { key: 'D', value: 1.0 },
  { key: 'F', value: 0 },
  { key: 'W', value: -1 },
]
interface UserCourseCardProps {
  course: Course
  type: UserType
  ctx?: {
    expected: ExpectGpa[]
    setExpected: Dispatch<SetStateAction<ExpectGpa[]>>
  }
}
export const UserCourseCard: React.FC<UserCourseCardProps> = ({
  course,
  type = 'student',
  ctx,
}) => {
  const dispatch = useDispatch<Dispatch<StoreEvent>>()
  const [sectionsModal, setSectionModal] = useState<boolean>(false)
  const [openModal, setModalOpen] = useState<boolean>(false)
  const [alertMessage, setMessage] = useState<{
    message: string
    type: AlertTypes
    open: boolean
    completeData?: number
  }>({ message: '', type: 'success', open: false })
  const { student } = useSelector((state: RootState) => state.user)

  const { firstName, lastName } = course.lecturer.teacherInfo

  const [sectionDetail, setSecDetail] = useState<CourseSection>()

  const deleteCourse = async () => {
    try {
      setModalOpen(false)
      console.log(course.courseId)

      const res = await removeCourse(course.courseId)
      dispatch({ type: 'REMOVE_COURSE', payload: res.dataResponse.courseId })

      setMessage({
        message: res.message,
        type: 'success',
        open: true,
        completeData: res.dataResponse.courseId,
      })
    } catch (err) {
      setMessage({ message: err.message, type: 'danger', open: true })
    }
  }

  const drop = async () => {
    try {
      setModalOpen(false)
      if (type === 'student' && student) {
        const secId = course.sections.find((sec) =>
          sec.enrolledPerson.find((p) => p.studentId === student?.studentId)
        )?.sectionId
        if (secId) {
          const res = await studentService.dropCourse(
            course.courseId,
            secId,
            student?.studentId
          )
          setMessage({
            message: res.message,
            type: 'success',
            open: true,
            completeData: res.dataResponse.courseId,
          })
        }
      }
    } catch (err) {
      console.log(err)
      setMessage({ message: err.message, type: 'danger', open: true })
    }
  }

  useEffect(() => {
    const secDetail = course.sections.find((sec) =>
      sec.enrolledPerson.find((s) => s.studentId === student?.studentId)
    )
    setSecDetail(secDetail)
  }, [])

  return (
    <>
      {type === 'teacher' && (
        <Modal
          title={`${course.courseId} - ${course.name}`}
          isOpen={sectionsModal}
          onCancel={() => setSectionModal(false)}
        >
          <div className="overflow-x-auto">
            <table style={{ width: 380 }} className="table-fixed text-center">
              <thead>
                <tr>
                  <th>no.</th>
                  <th>day</th>
                  <th>time</th>
                  <th>room</th>
                  <th>enrolled</th>
                </tr>
              </thead>
              <tbody>
                {course.sections.map((sec) => (
                  <tr key={sec.sectionId}>
                    <td>{sec.sectionId}</td>
                    <td>{sec.day}</td>
                    <td>{sec.time}</td>
                    <td>{sec.room}</td>
                    <td>
                      {sec.enrolledPerson.length}/
                      {sec.seat + sec.enrolledPerson.length}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal>
      )}
      <AlertDialog
        title={alertMessage.message}
        isOpen={alertMessage.open}
        type={alertMessage.type}
        onConfirm={() => {
          setMessage({ ...alertMessage, open: false })
          if (alertMessage.completeData) {
            dispatch({
              type: 'DELETE_MY_COURSE',
              payload: alertMessage.completeData,
            })
          }
        }}
        hasCancel={false}
      />
      <AlertDialog
        isOpen={openModal}
        type="danger"
        onConfirm={type === 'student' ? drop : deleteCourse}
        onCancel={() => setModalOpen(false)}
        title={type === 'student' ? 'Drop ?' : 'Delete ?'}
        content={`Do you want to ${type === 'student' ? 'drop' : 'delete'} ${
          course.courseId
        } - ${course.name}`}
      />

      <div className="shadow-sm mb-4 rounded-lg w-full h-max p-3 bg-white flex flex-col sm:flex-row">
        <div className="flex flex-col justify-start sm:justify-around sm:px-2">
          <p>
            {course.courseId} - {course.name}
          </p>
          {type === 'student' && sectionDetail && (
            <>
              <p>Section : {sectionDetail.sectionId}</p>
              <p>Day : {sectionDetail.day}</p>
              <p>Time : {sectionDetail.time}</p>
              <p>Room : {sectionDetail.room}</p>
            </>
          )}
          <p>Credits : {course.credit}</p>
          <p>
            Lecturer : {firstName} {lastName}
          </p>
        </div>

        <div className={`flex  flex-1 items-center sm:px-4 sm:justify-end`}>
          {type === 'teacher' && (
            <Button
              className="bg-blue-400 mx-2"
              onClick={() => setSectionModal(true)}
            >
              Sections
            </Button>
          )}
          <div className="flex flex-col items-end">
            <label>Expected GPA</label>
            <select
              value={ctx?.expected.find((c) => c.id === course.courseId)?.gpa}
              onChange={({ target }) =>
                ctx?.setExpected(
                  ctx.expected.map((item) =>
                    item.id === course.courseId
                      ? { ...item, gpa: parseFloat(target.value) }
                      : item
                  )
                )
              }
              className="px-4 py-2 rounded shadow-sm focus:outline-none cursor-pointer mb-2"
            >
              {GPA.map(({ key, value }) => (
                <option key={key} value={value}>
                  {key}
                </option>
              ))}
            </select>
            <Button onClick={() => setModalOpen(true)} className="bg-red-400">
              {type === 'student' ? 'Drop' : 'Delete'}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

import { Dispatch, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, StoreEvent } from 'src/store'
import { UserType } from 'src/store/user/types'
import { Course } from '../../store/course/types'
import { AlertDialog, AlertTypes } from '../AlertDialog'
import { Button } from '../Button'
import { Modal } from '../Modal'
import { student as studentService } from 'src/services/user'

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
        <h1 className="text-lg">
          {courseId} - {name}
        </h1>
        <div className="p-3">
          <table className="table-fixed">
            <thead>
              <tr>
                <th className="w-2/4">section</th>
                <th className="w-full">enrolled</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sections.map((sec) => (
                <tr key={sec.sectionId}>
                  <td>{sec.sectionId}</td>
                  <td>
                    {sec.enrolledPerson.length}/{sec.seat}
                  </td>
                  <td>
                    {student && (
                      <Button
                        onClick={() => enroll(sec.sectionId)}
                        disabled={
                          myCourses.some(
                            (course) => course.courseId === courseId
                          ) || sec.enrolledPerson.length === sec.seat
                        }
                        px={2}
                        py={1}
                        bg="green-300"
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

export const UserCourseCard: React.FC<{ course: Course; type: UserType }> = ({
  course,
  type = 'student',
}) => {
  const dispatch = useDispatch<Dispatch<StoreEvent>>()
  const [openModal, setModalOpen] = useState<boolean>(false)
  const [alertMessage, setMessage] = useState<{
    message: string
    type: AlertTypes
    open: boolean
    completeData?: number
  }>({ message: '', type: 'success', open: false })
  const { student } = useSelector((state: RootState) => state.user)

  const { firstName, lastName } = course.lecturer.teacherInfo

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

  return (
    <>
      <AlertDialog
        title={alertMessage.message}
        isOpen={alertMessage.open}
        type={alertMessage.type}
        onConfirm={() => {
          if (alertMessage.completeData) {
            setMessage({ ...alertMessage, open: false })
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
        onConfirm={drop}
        onCancel={() => setModalOpen(false)}
        title={type === 'student' ? 'Drop ?' : 'Close ?'}
        content={`Do you want to ${type === 'student' ? 'drop' : 'close'} ${
          course.courseId
        } - ${course.name}`}
      />

      <div className="shadow-sm mb-4 rounded-lg w-full h-36 p-3 bg-white flex flex-col sm:flex-row">
        <div className="flex flex-col justify-start sm:justify-around sm:px-2">
          <p>
            {course.courseId} - {course.name}
          </p>
          <p>credits : {course.credit}</p>
          <p>
            lecturer : {firstName} {lastName}
          </p>
        </div>
        <div className="flex flex-1 items-center sm:px-4 sm:justify-end">
          <Button onClick={() => setModalOpen(true)} className="bg-red-400">
            {type === 'student' ? 'Drop' : 'Close'}
          </Button>
        </div>
      </div>
    </>
  )
}

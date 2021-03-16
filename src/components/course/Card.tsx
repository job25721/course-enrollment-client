import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'
import { UserType } from 'src/store/user/types'
import { Course } from '../../store/course/types'
import { AlertDialog } from '../AlertDialog'
import { Button } from '../Button'
import { Modal } from '../Modal'

export const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  const { courseId, name, credit, sections, lecturer } = course
  const [openModal, setModalOpen] = useState<boolean>(false)
  const { student, myCourses } = useSelector((state: RootState) => state.user)

  return (
    <>
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
                        onClick={() => alert()}
                        disabled={myCourses.some(
                          (course) => course.courseId === courseId
                        )}
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
  const [openModal, setModalOpen] = useState<boolean>(false)
  const { firstName, lastName } = course.lecturer.teacherInfo
  return (
    <>
      <AlertDialog
        isOpen={openModal}
        type="danger"
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

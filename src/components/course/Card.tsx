import { useState } from 'react'
import { Course } from '../../store/course/types'
import { AlertDialog } from '../AlertDialog'
import { Button } from '../Button'
import { Modal } from '../Modal'

export const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  const { courseId, name, credit, sections, lecturer } = course
  const [openModal, setModalOpen] = useState<boolean>(false)

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
              <th className="w-2/4">section</th>
              <th className="w-full">enrolled</th>
              <th></th>
            </thead>
            <tbody>
              {sections.map((sec) => (
                <tr key={sec.sectionId}>
                  <td>{sec.sectionId}</td>
                  <td>
                    {sec.enrolledPerson.length}/{sec.seat}
                  </td>
                  <td>
                    <Button px={2} py={1} bg="green-300">
                      <span className="text-sm">Enroll</span>
                    </Button>
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

export const UserCourseCard = () => {
  const [openModal, setModalOpen] = useState<boolean>(false)

  return (
    <>
      <AlertDialog
        isOpen={openModal}
        type="danger"
        onCancel={() => setModalOpen(false)}
        title="Drop ?"
        content="Do you want to drop 261497 - Sel Topic in Comp Soft"
      />

      <div className="shadow-sm mb-4 rounded-lg w-full h-36 p-3 bg-white flex flex-col sm:flex-row">
        <div className="flex flex-col justify-start sm:justify-around sm:px-2">
          <p>261497 - Sel Topic in Comp Soft</p>
          <p>credits : 3</p>
          <p>lecturer : Chinawat Isradisaikul</p>
        </div>
        <div className="flex flex-1 items-center sm:px-4 sm:justify-end">
          <Button onClick={() => setModalOpen(true)} className="bg-red-400">
            Drop
          </Button>
        </div>
      </div>
    </>
  )
}

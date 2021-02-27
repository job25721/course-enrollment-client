import { useState } from 'react'
import { Button } from '../Button'
import { Modal } from '../Modal'

export const CourseCard = () => {
  const [openModal, setModalOpen] = useState<boolean>(false)
  return (
    <>
      <Modal
        title="Section manager"
        isOpen={openModal}
        onCancel={() => setModalOpen(false)}
      >
        <h1 className="text-lg">261497 - Sel Topic in comp Soft</h1>
        <div className="p-3">
          <table className="table-fixed">
            <thead>
              <th className="w-2/4">section</th>
              <th className="w-full">enrolled</th>
              <th></th>
            </thead>
            <tbody>
              <tr>
                <td>001</td>
                <td>2/10</td>
                <td>
                  <Button px={2} py={1} bg="green-300">
                    <span className="text-sm">Enroll</span>
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal>
      <div className="shadow-sm mb-4 rounded-lg w-full h-36 p-3 bg-white flex flex-col sm:flex-row">
        <div className="flex flex-col justify-start sm:justify-around sm:px-2">
          <p>261497 - Sel Topic in Comp Soft</p>
          <p>credits : 3</p>
          <p>lecturer : Chinawat Isradisaikul</p>
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

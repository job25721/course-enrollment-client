import { useRouter } from 'next/router'
import { Dispatch, useEffect, useState } from 'react'
import { AddOutline, RemoveCircleOutline } from 'react-ionicons'
import { useDispatch, useSelector } from 'react-redux'
import { AlertDialog, AlertTypes } from 'src/components/AlertDialog'
import { Button } from 'src/components/Button'
import { Input } from 'src/components/Input'
import { Modal } from 'src/components/Modal'
import Navbar from 'src/components/Navbar'
import { addNewCourse } from 'src/services/course'
import { RootState, StoreEvent } from 'src/store'
import { Course, CourseSection, Day } from 'src/store/course/types'

const AddCourse = () => {
  const dispatch = useDispatch<Dispatch<StoreEvent>>()
  const router = useRouter()
  const days: Day[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'M-Th', 'Tu-F']
  const currentTeacher = useSelector((state: RootState) => state.user.teacher)
  const initialSectionState: CourseSection = {
    sectionId: -1,
    seat: -1,
    day: 'M-Th',
    time: '',
    enrolledPerson: [],
    room: '',
  }
  const initialCourseState: Course = {
    courseId: -1,
    name: '',
    sections: [],
    lecturer: currentTeacher
      ? currentTeacher
      : {
          teacherId: 0,
          teacherInfo: { firstName: '', lastName: '', userType: 'teacher' },
          teacherEmail: '',
        },
    credit: -1,
  }
  const [open, setOpen] = useState<boolean>(false)
  const [alertModal, setAlert] = useState<{
    message: string
    type: AlertTypes
    isOpen: boolean
    action?: Function
  }>({
    message: '',
    type: 'danger',
    isOpen: false,
  })
  const [newCourse, setCourse] = useState<Course>(initialCourseState)
  const [section, setSection] = useState<CourseSection>(initialSectionState)
  const [time, setTime] = useState({
    start: '',
    end: '',
  })

  useEffect(() => {
    setSection({ ...section, time: `${time.start}-${time.end}` })
  }, [time])

  const AddSection = () => {
    try {
      if (
        section.sectionId === initialSectionState.sectionId ||
        section.time === initialSectionState.time ||
        section.room === initialSectionState.room ||
        section.seat === initialSectionState.seat
      ) {
        throw new Error('please fill the correct data')
      }

      if (
        newCourse.sections.find((sec) => sec.sectionId === section.sectionId)
      ) {
        throw new Error('this section id has already exist')
      }
      setCourse({ ...newCourse, sections: [...newCourse.sections, section] })
      setOpen(false)
    } catch (err) {
      setAlert({ message: err.message, isOpen: true, type: 'danger' })
    }
  }
  const onSubmit = async () => {
    try {
      if (
        newCourse.courseId === initialCourseState.courseId ||
        newCourse.credit === initialCourseState.credit ||
        newCourse.name === initialCourseState.name
      ) {
        throw new Error('please fill the correct data')
      }
      if (newCourse.sections.length === 0) {
        throw new Error('please add section at least 1 section')
      }
      const res = await addNewCourse(newCourse)
      dispatch({ type: 'ADD_COURSE', payload: res.dataResponse })
      setAlert({
        message: res.message,
        isOpen: true,
        type: 'success',
        action: () => router.push('/course'),
      })
    } catch (err) {
      setAlert({ message: err.message, isOpen: true, type: 'danger' })
    }
  }
  return (
    <Navbar>
      <AlertDialog
        type={alertModal.type}
        isOpen={alertModal.isOpen}
        title={alertModal.message}
        hasCancel={false}
        onConfirm={() => {
          setAlert({ message: '', type: 'danger', isOpen: false })
          if (alertModal.action) {
            alertModal.action()
          }
        }}
      />
      <Modal title="ADD SECTION" isOpen={open} onCancel={() => setOpen(false)}>
        <div className="flex flex-col">
          <label>Section id</label>
          <Input
            type="number"
            className="shadow-sm bg-gray-100 py-2 w-full my-1"
            value={section.sectionId === -1 ? '' : section.sectionId}
            onChange={({ target }) =>
              setSection({ ...section, sectionId: target.valueAsNumber })
            }
          />
          <label>Day</label>
          <select
            value={section.day}
            onChange={({ target }) =>
              setSection({ ...section, day: target.value })
            }
            className="px-3 py-3 bg-gray-100 my-1 rounded-md shadow-sm focus:outline-none"
          >
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
          <label>Start time</label>
          <input
            className="px-3 py-2 bg-gray-100 my-1 rounded-md shadow-sm focus:outline-none"
            type="time"
            value={time.start}
            onChange={({ target }) => setTime({ ...time, start: target.value })}
          />

          <label>End time</label>
          <input
            className="px-3 py-2 bg-gray-100 rounded-md my-1 shadow-sm focus:outline-none"
            type="time"
            value={time.end}
            onChange={({ target }) => setTime({ ...time, end: target.value })}
          />

          <label>Room</label>
          <input
            className="px-3 py-2 bg-gray-100 rounded-md my-1 shadow-sm focus:outline-none"
            value={section.room}
            onChange={({ target }) =>
              setSection({ ...section, room: target.value })
            }
          />

          <label>Seat</label>
          <input
            className="px-3 py-2 bg-gray-100 my-1 rounded-md shadow-sm focus:outline-none"
            type="number"
            value={section.seat === -1 ? '' : section.seat}
            onChange={({ target }) =>
              setSection({ ...section, seat: target.valueAsNumber })
            }
          />
        </div>
        <div className="flex flex-row justify-end mt-2">
          <Button
            className="bg-red-50 text-red-400"
            onClick={() => {
              setSection(initialSectionState)
              setOpen(false)
            }}
          >
            Discard
          </Button>
          <Button
            className="bg-green-50 text-green-400 ml-2"
            onClick={AddSection}
          >
            Submit
          </Button>
        </div>
      </Modal>
      <h1 className="text-4xl">ADD NEW COURSE</h1>
      <div className="mt-5 sm:mt-10">
        <Input
          value={newCourse.courseId === -1 ? '' : newCourse.courseId}
          onChange={({ target }) =>
            setCourse({ ...newCourse, courseId: target.valueAsNumber })
          }
          placeholder="Course id"
          type="number"
          className="shadow-sm py-2 mx-0 sm:mx-2 my-2 w-full sm:w-72"
        />
        <Input
          value={newCourse.name}
          onChange={({ target }) =>
            setCourse({ ...newCourse, name: target.value })
          }
          placeholder="Course name"
          className="shadow-sm py-2 my-2 mx-0 sm:mx-2 w-full sm:w-72"
        />
        <Input
          value={newCourse.credit === -1 ? '' : newCourse.credit}
          onChange={({ target }) =>
            setCourse({ ...newCourse, credit: target.valueAsNumber })
          }
          placeholder="Credit"
          type="number"
          className="shadow-sm py-2 my-2 mx-0 sm:mx-2 w-full sm:w-72"
        />
      </div>
      <div className="mt-5">
        <h1 className="text-xl">Sections</h1>
        <ul className="px-8 list-disc">
          {newCourse.sections.map((sec) => (
            <div className="flex flex-row" key={sec.sectionId}>
              <li>
                {sec.sectionId < 10 ? '00' : sec.sectionId < 100 ? '0' : null}
                {sec.sectionId}- {sec.day} {sec.time} ROOM :{sec.room} Seat{' '}
                {sec.seat}
              </li>
              <button
                onClick={() =>
                  setCourse({
                    ...newCourse,
                    sections: newCourse.sections.filter(
                      (cSec) => cSec.sectionId !== sec.sectionId
                    ),
                  })
                }
                className="mx-2 focus:outline-none"
              >
                <RemoveCircleOutline color="red" />
              </button>
            </div>
          ))}
        </ul>
      </div>
      <button
        className="mt-2 flex flex-row items-center focus:outline-none bg-gray-500 rounded-md shadow-sm p-2 text-white"
        onClick={() => setOpen(true)}
      >
        <AddOutline color="#fff" />
        <p className="text-sm">ADD SECTION</p>
      </button>
      <div className="h-1/3 sm:h-2/3 flex sm:justify-start items-end justify-evenly ">
        <button
          className="mt-2 w-full sm:w-100 mx-2flex flex-row items-center focus:outline-none bg-green-500 rounded-md shadow-sm p-2 text-white"
          onClick={onSubmit}
        >
          Submit
        </button>
      </div>
    </Navbar>
  )
}

export default AddCourse

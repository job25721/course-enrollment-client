import { useState } from 'react'
import { useSelector } from 'react-redux'
import { StudentCourses, TeacherCourses } from 'src/components/user/Courses'
import { StudentInfo, TeacherInfo } from 'src/components/user/Info'
import { RootState } from 'src/store'
import { Button } from '../src/components/Button'
import Navbar from '../src/components/Navbar'

type ProfileTabs = 'Info' | 'Courses'

const User = () => {
  const [currentTab, setCurrent] = useState<ProfileTabs>('Info')
  const { loginUserType } = useSelector((state: RootState) => state.user)
  return (
    <Navbar>
      <div className="sm:justify-start flex justify-around">
        <Button
          onClick={() => setCurrent('Info')}
          className="sm:mx-2 mx-0"
          bg={currentTab === 'Info' ? 'blue-400' : 'gray-200'}
          px={10}
        >
          Info
        </Button>
        <Button
          onClick={() => setCurrent('Courses')}
          className="sm:mx-2 mx-0"
          bg={currentTab === 'Courses' ? 'green-300' : 'gray-200'}
        >
          Your courses
        </Button>
      </div>
      {currentTab === 'Info' ? (
        <div className="flex flex-col sm:items-start items-center">
          <h1 className="text-4xl my-4">Your Information</h1>
          <div
            style={{ width: 'fit-content' }}
            className="bg-white p-6 rounded-md shadow-sm"
          >
            {loginUserType === 'student' ? <StudentInfo /> : <TeacherInfo />}
          </div>
        </div>
      ) : loginUserType === 'student' ? (
        <StudentCourses />
      ) : (
        <TeacherCourses />
      )}
    </Navbar>
  )
}

export default User

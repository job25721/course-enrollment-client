import { useState } from 'react'
import { Button } from '../components/Button'
import { CourseCard, UserCourseCard } from '../components/course/Card'
import Navbar from '../components/Navbar'

type ProfileTabs = 'Info' | 'Courses'

const User = () => {
  const [currentTab, setCurrent] = useState<ProfileTabs>('Info')
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
            <p>ชื่อ : ปฐมพร นามสกุล : ปั๋นแก้ว</p>
            <p>ชั้นปีที่ : 4</p>
            <p>คณะ : วิศวกรรมศาสตร์</p>
            <p>หลักสูตร : วิศวกรรมคอมพิวเตอร์</p>
            <p>ปีที่เข้าศึกษา : 2560</p>
            <p>รหัสนักศึกษา : 600610748</p>
            <p>อาจารย์ที่ปรึกษา : ผศ.ดร.ลัชนา ระมิงค์วงค์</p>
          </div>
        </div>
      ) : (
        <>
          {/* <h1 className="text-4xl my-4">Your courses</h1> */}
          <div className="pt-4">
            <p className="text-lg">Enrolled courses SEMESTER 2/2564</p>
            <p>หน่วยกิตรวม 9/22 หน่วยกิต</p>
            <p>Your expected GPAX : 4.00</p>
          </div>
          <div className="my-2 sm:h-4/5 h-4/6 overflow-auto w-full sm:w-4/5 lg:w-2/4">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <UserCourseCard key={i.toString()} />
            ))}
          </div>
        </>
      )}
    </Navbar>
  )
}

export default User

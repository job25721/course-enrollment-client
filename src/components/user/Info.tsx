import { useEffect, useState } from 'react'
import { Student, Teacher } from 'src/store/user/types'

export const StudentInfo = () => {
  const [user, setUser] = useState<Student | null>(null)

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user && JSON.parse(user).type === 'student') {
      setUser(JSON.parse(user).data)
    }
  }, [])

  if (user) {
    return (
      <>
        <p>
          {user.studentInfo.firstName} {user.studentInfo.lastName}
        </p>
        <p>ชั้นปีที่ : {user.year}</p>
        <p>คณะ : {user.faculty}</p>
        <p>หลักสูตร : {user.major}</p>
        <p>ปีที่เข้าศึกษา : {user.academicYear}</p>
        <p>รหัสนักศึกษา : {user.studentId}</p>
        <p>อาจารย์ที่ปรึกษา : {user.advisor}</p>
      </>
    )
  }

  return null
}

export const TeacherInfo = () => {
  const [user, setUser] = useState<Teacher | null>(null)

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user && JSON.parse(user).type === 'teacher') {
      setUser(JSON.parse(user).data)
    }
  }, [])

  if (user) {
    return (
      <>
        <p>
          {user.teacherInfo.firstName} {user.teacherInfo.lastName}
        </p>
        <p>{user.teacherEmail}</p>
      </>
    )
  }

  return null
}

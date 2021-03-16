import { useState } from 'react'
import { LogInOutline } from 'react-ionicons'
import { Button } from '../src/components/Button'
import { Input } from '../src/components/Input'
import { useRouter } from 'next/router'
import { UserType } from '../src/store/user/types'
import { student, teacher } from 'src/services/user'

const Index = () => {
  const [loginId, setLogin] = useState<string>('')
  const [placeholder, setPlaceholder] = useState<UserType>('student')

  const router = useRouter()

  const login = async (e) => {
    e.preventDefault()
    try {
      if (placeholder === 'student' && loginId !== '') {
        const res = await student.login(+loginId)
        if (res.message === 'Login Successful') {
          const stdInfo = await student.getMyInfo(+loginId)
          localStorage.setItem('user', JSON.stringify(stdInfo))
          router.push('/course')
        }
      } else if (placeholder === 'teacher' && loginId !== '') {
        await teacher.login(loginId)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="container mx-auto h-screen flex flex-col justify-center items-center">
      <img src="/logo.png" alt="" />
      <div className="flex my-4">
        <Button
          onClick={() => setPlaceholder('student')}
          mx={2}
          style={{ backgroundColor: '#4BABDC' }}
        >
          Student
        </Button>
        <Button
          onClick={() => setPlaceholder('teacher')}
          mx={2}
          style={{ backgroundColor: '#9ABF53' }}
        >
          Teacher
        </Button>
      </div>
      <form onSubmit={login} className="flex">
        <Input
          type="text"
          className="rounded-3xl w-auto"
          placeholder={`type a ${placeholder} id...`}
          value={loginId}
          onChange={(e) => setLogin(e.currentTarget.value)}
        />
        <button type="submit" className="p-2 focus:outline-none">
          <LogInOutline height="30px" width="30px" color="#9ABF53" />
        </button>
      </form>
    </div>
  )
}

export default Index

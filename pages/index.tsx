import { FormEvent, useEffect, useState } from 'react'
import { LogInOutline } from 'react-ionicons'
import { Button } from '../src/components/Button'
import { Input } from '../src/components/Input'
import { useRouter } from 'next/router'
import { UserType } from '../src/store/user/types'
import { student, teacher } from 'src/services/user'
import { AlertDialog, AlertTypes } from 'src/components/AlertDialog'

const Index = () => {
  const router = useRouter()
  const [loginId, setLogin] = useState<string>('')
  const [placeholder, setPlaceholder] = useState<UserType>('student')
  const [loginMessage, setMessage] = useState<{
    message: string
    type: AlertTypes
    open: boolean
  }>({ message: '', type: 'success', open: false })

  useEffect(() => {
    if (localStorage.getItem('user')) {
      router.push('/course')
    }
  }, [])

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      let res
      if (loginId !== '') {
        if (placeholder === 'student') {
          res = await student.login(+loginId)
        } else if (placeholder === 'teacher') {
          res = await teacher.login(loginId)
        }
        if (res) {
          if (res.message === 'Login Successful') {
            localStorage.setItem(
              'user',
              JSON.stringify({ type: placeholder, data: res.dataResponse })
            )
          }
          setMessage({
            message: res.message,
            type: res.message === 'Login Successful' ? 'success' : 'danger',
            open: true,
          })
        }
      }
    } catch (err) {
      setMessage({
        message: err.message,
        type: 'danger',
        open: true,
      })
    }
  }

  return (
    <div className="container mx-auto h-screen flex flex-col justify-center items-center">
      <AlertDialog
        isOpen={loginMessage.open}
        title={loginMessage.message}
        type={loginMessage.type}
        hasCancel={false}
        onConfirm={() => {
          if (loginMessage.type === 'success') {
            router.push('/course')
          } else {
            setMessage({ ...loginMessage, open: false })
          }
        }}
      />
      <img src="/logo.png" alt="" />
      <div className="flex my-4">
        <Button
          onClick={() => {
            setPlaceholder('student')
            setLogin('')
          }}
          className="mx-2"
          style={{ backgroundColor: '#4BABDC' }}
        >
          Student
        </Button>
        <Button
          onClick={() => {
            setPlaceholder('teacher')
            setLogin('')
          }}
          className="mx-2"
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

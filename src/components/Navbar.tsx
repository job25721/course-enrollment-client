import { useRouter } from 'next/router'
import { Dispatch, useEffect, useState } from 'react'

import {
  HomeOutline,
  PersonOutline,
  PersonCircleOutline,
  LogOutOutline,
  AddOutline,
  LogInOutline,
} from 'react-ionicons'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, StoreEvent } from 'src/store'
import { AlertDialog, AlertTypes } from './AlertDialog'

const Navbar: React.FC = ({ children }) => {
  const router = useRouter()
  const { pathname } = router

  const dispatch = useDispatch<Dispatch<StoreEvent>>()
  const { student, teacher } = useSelector((state: RootState) => state.user)
  const [alertModal, setAlert] = useState<{
    message: string
    type: AlertTypes
    isOpen: boolean
    toPage: string
  }>({
    message: '',
    type: 'danger',
    isOpen: false,
    toPage: '',
  })
  useEffect(() => {
    const localStoredUser = localStorage.getItem('user')
    if (localStoredUser) {
      const user = JSON.parse(localStoredUser)
      dispatch({ type: 'SET_USER_TYPE', payload: user.type })
      if (user.type === 'student') {
        dispatch({ type: 'SET_STUDENT', payload: user.data })
        dispatch({ type: 'SET_TEACHER', payload: null })
      } else {
        dispatch({ type: 'SET_TEACHER', payload: user.data })
        dispatch({ type: 'SET_STUDENT', payload: null })
      }
    }
  }, [])

  const confirmChangePage = (page: string) => {
    if (pathname === '/course/add') {
      setAlert({
        message: 'Do you want to discard all and change page',
        isOpen: true,
        type: 'warning',
        toPage: page,
      })
      return
    }
    return router.push(`/${page}`)
  }
  return (
    <div
      className="flex flex-col-reverse h-screen bg-blue- w-full sm:flex-row"
      style={{ backgroundColor: '#f5f5f5' }}
    >
      <div className="bg-white justify-around  items-center flex flex-row shadow-md w-full h-20 sm:flex-col sm:w-20 sm:h-full sm:justify-center sm:shadow-md">
        <button
          onClick={() => confirmChangePage('course')}
          className="my-4 focus:outline-none"
        >
          <HomeOutline
            {...(pathname === '/course'
              ? { height: '30px', width: '30px' }
              : { color: 'rgb(200,200,200)' })}
          />
        </button>
        {teacher && (
          <button
            onClick={() => confirmChangePage('course/add')}
            className="my-4 focus:outline-none"
          >
            <AddOutline
              {...(pathname === '/course/add'
                ? { height: '30px', width: '30px' }
                : { color: 'rgb(200,200,200)' })}
            />
          </button>
        )}
        {(student || teacher) && (
          <button
            onClick={() => confirmChangePage('user')}
            className="my-4 focus:outline-none"
          >
            <PersonOutline
              {...(pathname === '/user'
                ? { height: '30px', width: '30px' }
                : { color: 'rgb(200,200,200)' })}
            />
          </button>
        )}
      </div>
      <div className="w-full h-full p-4 overflow-auto">
        <div className="flex sm:mb-0 mb-4 items-center relative sm:absolute sm:right-5">
          {teacher || student ? (
            <>
              <div>
                <PersonCircleOutline width="50px" height="50px" />
              </div>
              <div className="px-2 flex-1 sm:flex-initial">
                <p>
                  {(student &&
                    `${student.studentInfo.firstName} ${student.studentInfo.lastName}`) ||
                    (teacher &&
                      `${teacher.teacherInfo.firstName} ${teacher.teacherInfo.lastName}`)}
                </p>
                <p>{student ? 'Student' : 'Teacher'}</p>
              </div>
              <div className="px-2">
                <button
                  className="focus:outline-none"
                  onClick={() => router.push('/')}
                >
                  <LogOutOutline
                    onClick={() => {
                      localStorage.removeItem('user')
                      router.push('/')
                    }}
                    color="red"
                    width="30px"
                    height="30px"
                  />
                </button>
              </div>
            </>
          ) : (
            <>
              <span className="px-2">Login</span>
              <LogInOutline
                onClick={() => router.push('/')}
                color="green"
                width="35px"
                height="35px"
              />
            </>
          )}
        </div>
        <AlertDialog
          isOpen={alertModal.isOpen}
          type={alertModal.type}
          title={alertModal.message}
          onCancel={() => setAlert({ ...alertModal, isOpen: false })}
          onConfirm={() => router.push(`/${alertModal.toPage}`)}
        />
        {children}
      </div>
    </div>
  )
}

export default Navbar

import { type } from 'os'
import { useState } from 'react'
import { HomeOutline, SearchOutline } from 'react-ionicons'
type ActiveNav = 'Home' | 'User'

const Course = () => {
  const [activeNav, setActiveNav] = useState<ActiveNav>('Home')
  return (
    <div className="flex flex-col-reverse h-screen w-full sm:flex-row ">
      <div className="bg-white justify-center items-center flex flex-col shadow-md w-full h-20 sm:w-20 sm:h-full">
        <button
          onClick={() => setActiveNav('Home')}
          className="my-2 focus:outline-none"
        >
          <HomeOutline
            {...(activeNav === 'Home'
              ? { height: '30px', width: '30px' }
              : { color: '#f5f5f5' })}
          />
        </button>
        <button
          onClick={() => setActiveNav('User')}
          className="my-2 focus:outline-none"
        >
          <SearchOutline
            {...(activeNav === 'User'
              ? { height: '30px', width: '30px' }
              : { color: '#f5f5f5' })}
          />
        </button>
      </div>
      <div className="w-full h-full"></div>
    </div>
  )
}

export default Course

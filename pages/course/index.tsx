import { Input } from '../../components/Input'
import Navbar from '../../components/Navbar'
import { SearchOutline } from 'react-ionicons'
import { CourseCard } from '../../components/course/card'
import { useState } from 'react'
const Course = () => {
  const [c, setc] = useState([1])
  return (
    <Navbar>
      <h1 className="text-5xl py-2">Open courses</h1>
      <div className="flex items-center">
        <Input
          placeholder="Search..."
          className="rounded-3xl py-2 focus:border-blue-300 shadow-sm my-2"
        />
        <button
          onClick={() => setc([...c, 0])}
          className="px-4 py-4 rounded-3xl focus:outline-none"
        >
          <SearchOutline />
        </button>
      </div>
      <div className="my-2 h-4/5 overflow-auto w-full sm:w-4/5  lg:w-2/4">
        {c.map((_, i) => (
          <CourseCard key={i.toString()} />
        ))}
      </div>
    </Navbar>
  )
}

export default Course

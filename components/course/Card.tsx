import { Button } from '../Button'

export const CourseCard = () => {
  return (
    <div className="shadow-sm mb-4 rounded-lg w-full h-36 p-3 bg-white flex flex-col sm:flex-row">
      <div className="flex flex-col justify-start sm:justify-around sm:px-2">
        <p>261497 - Sel Topic in Comp Soft</p>
        <p>credits : 3</p>
        <p>lecturer : Chinawat Isradisaikul</p>
      </div>
      <div className="flex flex-1 items-center sm:px-4 sm:justify-end">
        <Button bg="#4BABDC">Sections</Button>
      </div>
    </div>
  )
}

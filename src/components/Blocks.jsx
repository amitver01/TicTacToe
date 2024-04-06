import React from 'react'

const Blocks = ({ onClick , value}) => {
  return (
 <>
  <div onClick={onClick} className="border border-gray-800 w-32 h-32 text-center bg-red-500 text-7xl dark:text-white rounded-xl flex items-center justify-center"
  >
    {value}
  </div>
 </>
  )
}

export default Blocks
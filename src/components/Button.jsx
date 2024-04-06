import React from 'react'

const Button = ({onClick , text}) => {
  return (
    <button className="mt-4 px-8 py-3 bg-zinc-900 font-bold tracking-[.50em] text-white rounded-xl"
    onClick={onClick}
    >
        {text}
    </button>
  )
}

export default Button
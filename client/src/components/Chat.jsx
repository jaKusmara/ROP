import React from 'react'

export default function Chat() {
  return (
    <div className='flex w-full'>
      <div className='bg-zinc-800 w-1/5'>
        <h1>friendlist</h1>
      </div>
      <div className='bg-zinc-700 w-4/5 flex flex-col'>
        <div className='h-full'>

        </div>
        <div className='flex flex-row justify-center items-center bg-slate-400 p-3'>
          <input type="text" />
          <button>Send</button>
        </div>
      </div>
    </div>
  )
}

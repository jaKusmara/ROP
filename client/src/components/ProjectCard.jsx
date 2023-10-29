import React from 'react'

export default function ProjectCard({project}) {
  return (
    <div className='flex flex-col bg-slate-500'>
        <div>{project.title}</div>
    </div>
  )
}

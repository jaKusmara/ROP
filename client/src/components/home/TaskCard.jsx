import React from 'react'

export default function TaskCard({task}) {
    console.log(task)
  return (
    <div className="border h-fit p-2 m-2">
    <h1>{task.title}</h1>
    <h1>{task.list_title}</h1>
    <h2>{task.project_title}</h2>
    <div>{task.description}</div>
    </div>
  )
}

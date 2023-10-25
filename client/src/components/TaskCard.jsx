export default function TaskCard({task}) {
  return (
    <div className='flex flex-col w-1/4 h-1/4 bg-slate-500'>
        <span>{task.title || task.task.title}</span>
        <div></div>
    </div>
  )
}

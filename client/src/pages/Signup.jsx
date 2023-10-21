import RegistrationForm from "../components/SignUpForm"

function Registration() {
  return (
    <div className="flex">
      <div className="w-3/5 p-4 bg-zinc-900 h-screen"></div>
      <div className="w-2/5 p-4 bg-indigo-950 h-screen flex items-center justify-center">
        <RegistrationForm />
      </div>
    </div>
  )
}

export default Registration

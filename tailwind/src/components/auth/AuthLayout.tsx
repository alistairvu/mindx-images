import { ReactNode } from "react"

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
      <div className="container space-y-4">{children}</div>
    </div>
  )
}

const Section: React.FC = ({ children }) => {
  return (
    <div className="px-4 py-2 bg-white border border-gray-100 shadow rounded-md space-y-2">
      {children}
    </div>
  )
}

AuthLayout.Section = Section

export default AuthLayout

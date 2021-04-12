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
    <div className="px-4 py-2 space-y-2 bg-white border border-gray-100 rounded-md shadow">
      {children}
    </div>
  )
}

AuthLayout.Section = Section

export default AuthLayout

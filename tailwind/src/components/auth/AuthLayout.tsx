import { ReactNode } from "react"

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-gray-200 h-screen w-screen flex items-center justify-center">
      <div className="container space-y-4">{children}</div>
    </div>
  )
}

const Section: React.FC = ({ children }) => {
  return (
    <div className="bg-white shadow border border-gray-100 rounded-md py-2 px-4 space-y-2">
      {children}
    </div>
  )
}

AuthLayout.Section = Section

export default AuthLayout

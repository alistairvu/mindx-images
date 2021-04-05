/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react"
import { Link } from "react-router-dom"

const AppHeader: React.FC = () => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState<boolean>(false)

  return (
    <header className="sm:flex sm:justify-between sm:items-center shadow py-2 px-2 md:px-4">
      <div className="flex justify-between items-center">
        <Link
          to="/"
          className="font-bold text-2xl p-2 rounded hover:bg-gray-100"
        >
          MindX Images
        </Link>

        <button
          className="block sm:hidden w-8 h-8 p-1 hover:bg-gray-100 rounded focus:outline-none focus:ring"
          onClick={() => setIsHamburgerOpen((prev) => !prev)}
        >
          {isHamburgerOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      <div
        className={` ${
          isHamburgerOpen ? "flex flex-col items-start" : "hidden"
        } sm:flex sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0`}
      >
        <a
          href="#"
          className="block font-semibold text-blue-600 text-lg py-2 px-4 rounded hover:bg-gray-100"
        >
          Sign up
        </a>
        <a
          href="#"
          className="block font-semibold text-blue-600 text-lg py-2 px-4 rounded hover:bg-gray-100"
        >
          Login
        </a>
      </div>

      {/* <div
        className={` ${
          isHamburgerOpen ? "flex flex-col items-start" : "hidden"
        } sm:flex sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0`}
      >
        <h2 className="block text-lg py-2 px-4">Hello, User!</h2>
        <a
          href="#"
          className="block font-semibold text-lg py-2 px-4 rounded hover:bg-gray-100"
        >
          Logout
        </a>
        <a
          href="#"
          className="block font-bold text-lg py-2 px-4 rounded hover:bg-gray-100"
        >
          Upload
        </a>
      </div> */}
    </header>
  )
}

export default AppHeader

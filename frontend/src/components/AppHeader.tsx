import { useState, useContext } from "react"
import { Link } from "react-router-dom"
import { Menu, Transition } from "@headlessui/react"
import { UserContext } from "../context/userContext"

const AppHeader: React.FC = () => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState<boolean>(false)
  const { currentUser, resetCurrentUser } = useContext(UserContext)

  const renderNavOptions = () => {
    if (!currentUser.isLoggedIn) {
      return (
        <>
          <Link
            to="/signup"
            className="block font-semibold text-blue-600 text-lg py-2 px-4 rounded hover:bg-gray-100"
            onClick={() => setIsHamburgerOpen(false)}
          >
            Sign up
          </Link>
          <Link
            to="/login"
            className="block font-semibold text-blue-600 text-lg py-2 px-4 rounded hover:bg-gray-100"
          >
            Login
          </Link>
        </>
      )
    }

    return (
      <Menu as="div" className="relative focus:outline-none focus:ring">
        {({ open }) => (
          <>
            <Menu.Button className="block text-lg py-2 px-4 rounded hover:bg-gray-100 focus:outline-none">
              Hello, {currentUser.user.email}!
            </Menu.Button>
            <Transition
              show={open}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                static
                className={`absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg md:w-48 bg-white focus:outline-none`}
              >
                <Link to="/upload">
                  <Menu.Item
                    as="a"
                    className="block font-semibold text-lg py-2 px-4 rounded hover:bg-gray-100 focus:outline-none"
                  >
                    Upload
                  </Menu.Item>
                </Link>
                <Link to="/login">
                  <Menu.Item
                    as="a"
                    onClick={resetCurrentUser}
                    className="block font-semibold text-lg py-2 px-4 rounded hover:bg-gray-100 focus:outline-none"
                  >
                    Logout
                  </Menu.Item>
                </Link>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    )
  }

  return (
    <header className="sm:flex sm:justify-between sm:items-center shadow py-2 px-2 md:px-4 sticky">
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
          isHamburgerOpen ? "flex flex-col flex-grow items-start" : "hidden"
        } sm:flex sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0`}
      >
        {renderNavOptions()}
      </div>
    </header>
  )
}

export default AppHeader

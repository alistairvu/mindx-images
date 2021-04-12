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
            className="block px-4 py-2 text-lg font-semibold text-blue-600 rounded hover:bg-gray-100"
            onClick={() => setIsHamburgerOpen(false)}
          >
            Sign up
          </Link>
          <Link
            to="/login"
            className="block px-4 py-2 text-lg font-semibold text-blue-600 rounded hover:bg-gray-100"
          >
            Login
          </Link>
        </>
      )
    }

    return (
      <Menu as="nav" className="relative focus:outline-none focus:ring">
        {({ open }) => (
          <>
            <Menu.Button className="block px-4 py-2 text-lg rounded hover:bg-gray-100 focus:outline-none">
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
                    className="block px-4 py-2 text-lg font-semibold rounded hover:bg-gray-100 focus:outline-none"
                  >
                    Upload
                  </Menu.Item>
                </Link>
                <Link to="/login">
                  <Menu.Item
                    as="a"
                    onClick={resetCurrentUser}
                    className="block px-4 py-2 text-lg font-semibold rounded hover:bg-gray-100 focus:outline-none"
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
    <header className="sticky px-2 py-2 shadow-md md:px-4">
      <div className="max-w-xl mx-auto sm:max-w-6xl sm:flex sm:justify-between sm:items-center">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="p-2 text-2xl font-bold rounded hover:bg-gray-100"
          >
            MindX Images
          </Link>

          <button
            className="block w-8 h-8 p-1 rounded sm:hidden hover:bg-gray-100 focus:outline-none focus:ring"
            onClick={() => setIsHamburgerOpen((prev) => !prev)}
          >
            {isHamburgerOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
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
                className="w-6 h-6"
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

        <nav
          className={` ${
            isHamburgerOpen ? "flex flex-col flex-grow items-start" : "hidden"
          } sm:flex sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0`}
        >
          {renderNavOptions()}
        </nav>
      </div>
    </header>
  )
}

export default AppHeader

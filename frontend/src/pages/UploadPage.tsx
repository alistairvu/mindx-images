import { useContext, useEffect, useRef } from "react"
import { useHistory } from "react-router-dom"
import { UserContext } from "../context/userContext"

const UploadPage: React.FC = () => {
  const fileNameRef = useRef<HTMLElement>(null)

  const {
    currentUser: { isLoggedIn },
  } = useContext(UserContext)
  const history = useHistory()

  useEffect(() => {
    if (!isLoggedIn) {
      history.replace("/login")
    }
  }, [isLoggedIn, history])

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0]
    console.log(file)
    if (fileNameRef.current) {
      fileNameRef.current.innerHTML = file.name
    }
  }

  return (
    <div className="container">
      <h1 className="text-3xl font-bold">Create a Post</h1>
      <form>
        <label className="block my-1">
          <span>Title</span>
          <input type="text" className="input" required />
        </label>

        <label className="block my-1">
          <span>Description</span>
          <textarea className="input" required />
        </label>

        <label className="block mt-1 mb-2">
          <p className="mb-2">Image</p>
          <label className="px-4 py-2 mr-4 font-semibold text-white bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-500">
            <span>Select an image</span>
            <input
              type="file"
              className="hidden"
              onChange={handleFileSelected}
              required
            />
          </label>
          <span ref={fileNameRef}>Choose a file</span>
        </label>

        <button
          type="submit"
          className="w-full px-4 py-2 mt-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default UploadPage

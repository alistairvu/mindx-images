import { useRef } from "react"

const UploadPage: React.FC = () => {
  const fileNameRef = useRef<HTMLElement>(null)

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
          <label className="bg-blue-600 hover:bg-blue-500 font-semibold text-white py-2 px-4 rounded-lg mr-4 cursor-pointer">
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
          className="mt-2 bg-blue-600 hover:bg-blue-500 font-semibold text-white py-2 px-4 w-full rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default UploadPage

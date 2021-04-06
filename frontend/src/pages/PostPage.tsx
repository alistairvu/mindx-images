const PostPage: React.FC = () => {
  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <figure className="md:col-span-2">
          <img
            src="https://designshack.net/wp-content/uploads/placeholder-image.png"
            alt=""
          />
        </figure>
        <section className="flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold">Comments</h1>
            <ul className="overscroll-y-contain">
              <li>
                <span className="font-semibold">john@example.com:</span> Hello
              </li>
            </ul>
          </div>
          <form className="p-2 shadow rounded-md space-y-2">
            <input
              className="input"
              type="text"
              placeholder="Enter your comment..."
            />
            <button className="font-semibold text-white py-2 px-4 bg-blue-600 hover:bg-blue-500 rounded-lg">
              Add comment
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}

export default PostPage

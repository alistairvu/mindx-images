const HomeCard: React.FC = () => {
  return (
    <div className="w-full bg-white shadow-md rounded-md space-y-2">
      <img
        src="https://designshack.net/wp-content/uploads/placeholder-image.png"
        alt=""
        className="rounded-t-md"
      />
      <div className="py-2 px-4 space-y-4">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold">Placeholder Title</h1>
          <p>Placeholder Description</p>
        </div>
        <p className="text-gray-400">placeholder@example.com</p>
      </div>
    </div>
  )
}

export default HomeCard

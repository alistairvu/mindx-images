interface HomePaginationProps {
  pageCount: number
  pageNumber: number
}

const HomePagination: React.FC<HomePaginationProps> = ({
  pageCount,
  pageNumber,
}) => {
  const renderButtons = () => {
    const buttons = []

    for (let i = 1; i <= pageCount; i++) {
      const colors =
        i === pageNumber
          ? "text-white bg-blue-500 border-blue-500 hover:border-blue-600"
          : "border-gray-200 hover:bg-gray-50"
      if (i === 1) {
        buttons.push(
          <button
            className={`w-8 h-8 border ${
              pageCount === 1 ? "rounded" : "rounded-r-none"
            } ${colors}`}
          >
            {i}
          </button>
        )
      } else if (i === 4) {
        buttons.push(
          <button className={`w-8 h-8 border rounded-l-none ${colors}`}>
            {i}
          </button>
        )
      } else {
        buttons.push(
          <button
            className={`w-8 h-8 border-t border-b rounded-none ${colors}`}
          >
            {i}
          </button>
        )
      }
    }

    return buttons
  }

  return <div className="mt-4">{renderButtons()}</div>
}

export default HomePagination

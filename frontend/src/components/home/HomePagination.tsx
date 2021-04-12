import { useHistory } from "react-router-dom"

interface HomePaginationProps {
  pageCount: number
  pageNumber: number
  handlePageChange: (page: number) => void
}

const HomePagination: React.FC<HomePaginationProps> = ({
  pageCount,
  pageNumber,
  handlePageChange,
}) => {
  const history = useHistory()

  const renderButtons = () => {
    const paginationButtons = []

    for (let i = 1; i <= pageCount; i++) {
      const colors =
        i === pageNumber
          ? "text-white bg-blue-500 border-blue-500 hover:border-blue-600"
          : "border-gray-200 hover:bg-gray-50"

      if (i === 1) {
        paginationButtons.push(
          <button
            className={`w-8 h-8 border ${
              pageCount === 1 ? "rounded" : "rounded-r-none border-r-0"
            } ${colors} focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        )
      } else if (i === pageCount) {
        paginationButtons.push(
          <button
            className={`w-8 h-8 border rounded-l-none ${colors} focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        )
      } else {
        paginationButtons.push(
          <button
            className={`w-8 h-8 border border-r-0 rounded-none focus:outline-none ${colors} focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        )
      }
    }

    return paginationButtons
  }

  return <div className="mt-4">{renderButtons()}</div>
}

export default HomePagination

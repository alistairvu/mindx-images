import { HomeCard } from "../components/home"

const HomePage: React.FC = () => {
  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <HomeCard />
      </div>
    </div>
  )
}

export default HomePage

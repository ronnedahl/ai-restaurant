import Header from './components/Header/Header'
import Menu from './components/Menu/Menu'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItemCount={0} />
      <Menu />
    </div>
  )
}

export default App
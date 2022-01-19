import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import './App.css'
import HomePage from './components/Home.page'
import RQSuperHeroesPage from './components/RQSuperHeroes.page'
import SuperHeroesPage from './components/SuperHeroes.page'
import RQActorNamePage from './components/RQActorName.page'

const queryClient = new QueryClient()
console.log(queryClient)

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/super-heroes'>Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to='/rq-super-heroes'>RQ Super Heroes</Link>
              </li>
              <li>
                <Link to='/rq-actor-name'>RQ Actor Name</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path='/super-heroes' element={<SuperHeroesPage />}></Route>
            <Route
              path='/rq-super-heroes'
              element={<RQSuperHeroesPage />}
            ></Route>
            <Route path='/rq-actor-name' element={<RQActorNamePage />}></Route>
            <Route path='/' element={<HomePage />}></Route>
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App

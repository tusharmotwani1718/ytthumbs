import { Outlet } from 'react-router-dom'
import { Header } from './components/index.js'


const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout;

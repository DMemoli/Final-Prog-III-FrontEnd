import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './modules/Home'
import Login from './modules/Login'
import Logout from './modules/Logout'
import Layout from './modules/Layout'
import NotFound from './modules/NotFound'
import Contact from './modules/Contact'
import About from './modules/About'
import ListarUsuarios from './modules/Usuarios/ListarUsuarios'
import EditarUsuario from './modules/Usuarios/EditarUsuario'
import CreateUser from './components/CreateUser'
import Usuarios from './modules/Usuarios'
import ListShows from './modules/Plays/Shows'
import EditPlay from './modules/Plays/EditPlay'
import EditTheaters from './modules/Plays/Theaters/EditTheaters'
import Comprar from './modules/Comprar'
import ComprarObra from './modules/Comprar/ComprarObra'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Logout />} />
            <Route path="contact" element={<Contact />}>
              <Route path=":type" element={<Contact />} />
            </Route>
            {/* Rutas protegidas */}
            <Route element={<ProtectedRoute />}>
              <Route path="about" element={<About />} />
              <Route path="admin">
                <Route index element={<Usuarios />} />
                <Route path='list' element={<ListarUsuarios />} />
                <Route path='create' element={<CreateUser />} />
                <Route path='editar/:id' element={<EditarUsuario />} />
              </Route>
              <Route path='shows/:id' element={<ListShows />}></Route>
              <Route path="theaters">
                <Route path='edit/:id' element={<EditTheaters />} />
              </Route>
              <Route path="plays">
                <Route path='edit/:id' element={<EditPlay />} />
              </Route>
              <Route path="comprar">
                <Route index element={<Comprar />} />
                <Route path='obra/:id' element={<ComprarObra />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

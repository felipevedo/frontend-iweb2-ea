import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import TipoEquipo from './pages/TipoEquipo';
import CreateOrEditTipoEquipo from './pages/TipoEquipo/CreateOrEditTipoEquipo';
import EstadoEquipo from './pages/EstadoEquipo';
import CreateOrEstadoEquipo from './pages/EstadoEquipo/CreateOrEditEstadoEquipo';
import Marca from './pages/Marca';
import CreateOrEditMarca from './pages/Marca/CreateOrEditMarca';
import Usuario from './pages/Usuario';
import CreateOrEditUsuario from './pages/Usuario/CreateOrEditUsuario';
import Inventario from './pages/Inventario';
import CreateOrEditInventario from './pages/Inventario/CreateOrEditInventario';

function App() {
  return (
    <div className="inventario-iud">
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/tipo-de-equipo/crear-o-editar/:id' element={<CreateOrEditTipoEquipo />} />
          <Route path='/tipo-de-equipo/crear-o-editar' element={<CreateOrEditTipoEquipo />} />
          <Route path='/tipo-de-equipo' element={<TipoEquipo />} />
          <Route path='/estado-de-equipo/crear-o-editar/:id' element={<CreateOrEstadoEquipo />} />
          <Route path='/estado-de-equipo/crear-o-editar' element={<CreateOrEstadoEquipo />} />
          <Route path="/estado-de-equipo" element={<EstadoEquipo />} />
          <Route path='/usuarios/crear-o-editar/:id' element={<CreateOrEditUsuario />} />
          <Route path='/usuarios/crear-o-editar' element={<CreateOrEditUsuario />} />
          <Route path="/usuarios" element={<Usuario />} />
          <Route path='/marcas/crear-o-editar/:id' element={<CreateOrEditMarca />} />
          <Route path='/marcas/crear-o-editar' element={<CreateOrEditMarca />} />
          <Route path="/marcas" element={<Marca />} />
          <Route path='/inventario/crear-o-editar/:serial' element={<CreateOrEditInventario />} />
          <Route path='/inventario/crear-o-editar' element={<CreateOrEditInventario />} />
          <Route path="/inventario" element={<Inventario />} />
        </Routes>
      </Layout>
    </div>
  )
}

export default App;

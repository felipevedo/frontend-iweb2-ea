import { Link } from 'react-router-dom';

function Layout({ children }) {
  return (
    <div className="container">
      <div className="row">
        <ul className="d-flex iud-navigation-bar">
          <li className="me-2"><Link to="/">Home</Link></li>
          <li className="me-2"><Link to="/tipo-de-equipo">Tipo de Equipo</Link></li>
          <li className="me-2"><Link to="/estado-de-equipo">Estado de Equipo</Link></li>
          <li className="me-2"><Link to="/usuarios">Usuarios</Link></li>
          <li className="me-2"><Link to="/marcas">Marcas</Link></li>
          <li className="me-2"><Link to="/inventario">Inventario</Link></li>
        </ul>
      </div>
      <div className="row">
        <div className="col gx-5">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout;

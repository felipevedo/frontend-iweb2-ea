import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsuarios, deleteUsuario } from "../../api/helper";

function Usuario() {
  const [usuarios, setUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataValid, setIsDataValid] = useState(true);

  const setupUsuarios = async () => {
    setIsLoading(true);
    const {
      data: { data },
    } = await getUsuarios();

    setUsuarios(data);
    setIsLoading(false);
  };

  const handleDelete = async (id) => {
    setIsLoading(true);

    await deleteUsuario(id);

    setIsDataValid((prev) => !prev);
  };

  useEffect(() => {
    setupUsuarios();
  }, [isDataValid]);

  return (
    <main>
      <h1 className="pt-2 pb-3">Usuarios</h1>
      <div className="row">
        <div className="col">
          <Link to="crear-o-editar">
            <div className="btn btn-primary">Crear nuevo</div>
          </Link>
        </div>
      </div>
      <div className="row">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Email</th>
              <th scope="col">Estado</th>
              <th scope="col">Fecha de creación</th>
              <th scope="col">Fecha de actualización</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <div class="spinner-border text-info"></div>}
            {!usuarios?.length && (
              <p className="mt-2">No hay resultados para mostrar</p>
            )}
            {usuarios.map((t) => (
              <tr key={t.id}>
                <th scope="row">{t.id}</th>
                <td>{t.nombre}</td>
                <td>{t.email}</td>
                <td>{t.estado ? "activo" : "inactivo"}</td>
                <td>{new Date(t.fechaCreacion).toDateString()}</td>
                <td>{new Date(t.fechaActualizacion).toDateString()}</td>
                <td>
                  <Link to={`crear-o-editar/${t.id}`}>
                    <button className="btn btn-primary">Editar</button>
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(t.id)}
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default Usuario;

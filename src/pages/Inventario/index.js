import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getUsuarios,
  getMarcas,
  getEstados,
  getTipos,
  getInventario,
  deleteInventario,
} from "../../api/helper";

function Inventario() {
  const [inventario, setInventario] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [estados, setEstados] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataValid, setIsDataValid] = useState(true);

  const setupInventario = async () => {
    setIsLoading(true);

    const {
      data: { data },
    } = await getInventario();
    setInventario(data);

    const usuariosResponse = await getUsuarios();
    setUsuarios(usuariosResponse.data.data);

    const marcasResponse = await getMarcas();
    setMarcas(marcasResponse.data.data);

    const estadosResponse = await getEstados();
    setEstados(estadosResponse.data.data);

    const tiposResponse = await getTipos();
    setTipos(tiposResponse.data.data);

    setIsLoading(false);
  };

  const handleDelete = async (serial) => {
    setIsLoading(true);

    await deleteInventario(serial);

    setIsDataValid((prev) => !prev);
  };

  useEffect(() => {
    setupInventario();
  }, [isDataValid]);

  return (
    <main>
      <h1 className="pt-2 pb-3">Inventario</h1>
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
              <th scope="col">Serial</th>
              <th scope="col">Modelo</th>
              <th scope="col">Descripción</th>
              <th scope="col">Foto</th>
              <th scope="col">Color</th>
              <th scope="col">Fecha de compra</th>
              <th scope="col">Precio</th>
              <th scope="col">Usuario a cargo</th>
              <th scope="col">Marca</th>
              <th scope="col">Estado</th>
              <th scope="col">Tipo</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <div class="spinner-border text-info" />}
            {!inventario?.length && (
              <p className="mt-2">No hay resultados para mostrar</p>
            )}
            {!isLoading &&
              inventario.map((t) => (
                <tr key={t.serial}>
                  <th scope="row">{t.serial}</th>
                  <td>{t.modelo}</td>
                  <td>{t.descripcion}</td>
                  <td>
                    <img src={t.urlFoto} className="img-thumbnail" />
                  </td>
                  <td>
                    <span
                      style={{
                        display: "block",
                        height: "15px",
                        width: "15px",
                        backgroundColor: `${t.color}`,
                      }}
                    />
                  </td>
                  <td>{new Date(t.fechaCompra).toDateString()}</td>
                  <td>{t.precio}</td>
                  <td>
                    {usuarios.find((u) => u.id === t.idUsuarioACargo)?.nombre}
                  </td>
                  <td>{marcas.find((u) => u.id === t.idMarca)?.nombre}</td>
                  <td>{estados.find((u) => u.id === t.idEstado)?.nombre}</td>
                  <td>{tipos.find((u) => u.id === t.idTipo)?.nombre}</td>
                  <td>
                    <Link to={`crear-o-editar/${t.serial}`}>
                      <button className="btn btn-primary">Editar</button>
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(t.serial)}
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

export default Inventario;

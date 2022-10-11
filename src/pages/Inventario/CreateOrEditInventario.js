import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getInventarioById,
  createInventario,
  updateInventario,
  getUsuarios,
  getMarcas,
  getEstados,
  getTipos,
} from "../../api/helper";

function CreateOrEditInventario() {
  const { serial } = useParams();
  const isEdition = !!serial;

  const [model, setModel] = useState("");
  const [description, setDescription] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [color, setColor] = useState("");
  const [buyDate, setBuyDate] = useState("");
  const [price, setPrice] = useState("");

  const [usuarios, setUsuarios] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [estados, setEstados] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [userId, setUserId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [stateId, setStateId] = useState("");
  const [typeId, setTypeId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (isEdition) => {
    const apiCall = isEdition ? updateInventario : createInventario;

    const data = {
      serial,
      model,
      description,
      photoUrl,
      color,
      buyDate,
      price,
      userId,
      brandId,
      stateId,
      typeId,
    };

    try {
      setSuccessMessage("");
      setErrorMessage("");
      setIsLoading(true);
      const {
        data: { message },
      } = await apiCall(data);

      setSuccessMessage(message);
    } catch (e) {
      console.log("My error log", e);

      setErrorMessage(e.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);

        // setup users selection
        const {
          data: { data: _usuarios },
        } = await getUsuarios();
        setUsuarios(_usuarios.filter((u) => u.estado));

        // setup brands selection
        const {
          data: { data: _marcas },
        } = await getMarcas();
        setMarcas(_marcas.filter((m) => m.estado));

        // setup states selection
        const {
          data: { data: _estados },
        } = await getEstados();
        setEstados(_estados.filter((e) => e.estado));

        // setup types selection
        const {
          data: { data: _tipos },
        } = await getTipos();
        setTipos(_tipos.filter((e) => e.estado));
      } catch (e) {
        console.log("My error log", e);
      } finally {
        setIsLoading(false);
      }

      if (isEdition && serial) {
        try {
          setIsLoading(true);
          const {
            data: { data },
          } = await getInventarioById(serial);

          const {
            modelo,
            descripcion,
            urlFoto,
            color,
            fechaCompra,
            precio,
            idUsuarioACargo,
            idMarca,
            idEstado,
            idTipo,
          } = data[0];

          const _fechaCompra = fechaCompra.split("T")[0];

          setModel(modelo);
          setDescription(descripcion);
          setPhotoUrl(urlFoto);
          setColor(color);
          setBuyDate(_fechaCompra);
          setPrice(precio);
          setUserId(idUsuarioACargo);
          setBrandId(idMarca);
          setStateId(idEstado);
          setTypeId(idTipo);
        } catch (e) {
          console.log("My error log", e);
        } finally {
          setIsLoading(false);
        }
      }
    })();
  }, []);

  return (
    <main>
      <h1 className="mb-5">{isEdition ? "Editar" : "Crear"} Inventario</h1>
      {isLoading && <div className="spinner-border text-info"></div>}
      {successMessage && (
        <div className="bg-success p-2 text-white mb-3">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="bg-danger p-2 text-white mb-3">{errorMessage}</div>
      )}
      <div className="row">
        <div className="col-1">
          <p className="text-start">Modelo</p>
        </div>
        <div className="col-2">
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-1">
          <p className="text-start">Descripción</p>
        </div>
        <div className="col-2">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-1">
          <p className="text-start">Url de Foto</p>
        </div>
        <div className="col-2">
          <input
            type="text"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-1">
          <label htmlFor="colorInput" className="form-label">
            Color
          </label>
        </div>
        <div className="col-2">
          <input
            type="color"
            className="form-control form-control-color"
            id="colorInput"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
      </div>
      <div className="row align-items-start">
        <div className="col-1">
          <p className="text-start">Fecha de compra</p>
        </div>
        <div className="col-2">
          <input
            type="date"
            value={buyDate}
            onChange={(e) => setBuyDate(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-1">
          <p className="text-start">Precio</p>
        </div>
        <div className="col-2">
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-1">
          <p className="text-start">Usuario</p>
        </div>
        <div className="col-2">
          <select value={userId} onChange={(e) => setUserId(e.target.value)}>
            <option value="">--Seleccione una opcion--</option>
            {usuarios.map((u) => (
              <option value={u.id}>{u.nombre}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col-1">
          <p className="text-start">Marca</p>
        </div>
        <div className="col-2">
          <select value={brandId} onChange={(e) => setBrandId(e.target.value)}>
            <option value="">--Seleccione una opcion--</option>
            {marcas.map((b) => (
              <option value={b.id}>{b.nombre}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col-1">
          <p className="text-start">Estado</p>
        </div>
        <div className="col-2">
          <select value={stateId} onChange={(e) => setStateId(e.target.value)}>
            <option value="">--Seleccione una opcion--</option>
            {estados.map((s) => (
              <option value={s.id}>{s.nombre}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col-1">
          <p className="text-start">Tipo</p>
        </div>
        <div className="col-2">
          <select value={typeId} onChange={(e) => setTypeId(e.target.value)}>
            <option value="">--Seleccione una opcion--</option>
            {tipos.map((t) => (
              <option value={t.id}>{t.nombre}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col">
          {isEdition ? (
            <button
              className="btn-success"
              onClick={() => onSubmit(true)}
              disabled={isLoading}
            >
              Guardar
            </button>
          ) : (
            <button
              className="btn-primary"
              onClick={() => onSubmit(false)}
              disabled={isLoading}
            >
              Crear
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

export default CreateOrEditInventario;

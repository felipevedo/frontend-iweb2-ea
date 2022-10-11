import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUsuarioById, createUsuario, updateUsuario } from '../../api/helper';

function CreateOrEditUsuario() {
  const { id } = useParams();
  const isEdition = !!id;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [updateDate, setUpdateDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (isEdition) => {
    const apiCall = isEdition ? updateUsuario : createUsuario;

    const data = {
      id,
      name,
      email,
      status: status === 'active',
      createdDate,
      updateDate,
    }

    try {
      setSuccessMessage('');
      setErrorMessage('');
      setIsLoading(true);
      const { data: { message }} = await apiCall(data);

      setSuccessMessage(message);
      
    } catch (e) {
      console.log('My error log', e);

      setErrorMessage(e.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async function () {
      if (isEdition && id) {
        try {
          setIsLoading(true);
          const { data: { data } } = await getUsuarioById(id);
          const { nombre, email, estado, fechaCreacion, fechaActualizacion } = data[0];

          const _createdDate = fechaCreacion.split('T')[0];
          const _updateDate = fechaActualizacion.split('T')[0];
          
          setName(nombre);
          setEmail(email);
          setStatus(estado ? 'active' : 'inactive');
          setCreatedDate(_createdDate);
          setUpdateDate(_updateDate);
           
        } catch (e) {
          console.log('My error log', e);
        } finally {
          setIsLoading(false);
        }
      }
    })()
  }, []);

  return (
    <main>
      <h1 className="mb-5">{isEdition ? 'Editar' : 'Crear'} Usuario</h1>
      {isLoading && (
        <div class="spinner-border text-info">
      </div>
      )}
      {successMessage && (
        <div class="bg-success p-2 text-white mb-3">{successMessage}</div>
      )}
      {errorMessage && (
        <div class="bg-danger p-2 text-white mb-3">{errorMessage}</div>
      )}
      <div className="row">
        <div className="col-1">
          <p className="text-start">Nombre</p>
        </div>
        <div className="col-2">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
      </div>
      <div className="row">
        <div className="col-1">
          <p className="text-start">Email</p>
        </div>
        <div className="col-2">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>
      <div className="row align-items-start">
        <div className="col-1">
          <p className="text-start">Estado</p>
        </div>
        <div className="col-2">
          <div className="d-flex flex-row">
            <div className="form-check me-2">
              <input 
              className="form-check-input" 
              type="radio" 
              name="status" 
              id="activeStatus" 
              value="active" 
              checked={status === 'active'} 
              onChange={(e) => setStatus(e.target.value)}
              />
              <label className="form-check-label" htmlFor="activeStatus">
                Activo
              </label>
            </div>
            <div className="form-check">
              <input 
              className="form-check-input" 
              type="radio" 
              name="status" 
              id="inactiveStatus" 
              value="inactive"
              checked={status === 'inactive'} 
              onChange={(e) => setStatus(e.target.value)}
              />
              <label className="form-check-label" htmlFor="inactiveStatus">
                Inactivo
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="row align-items-start">
        <div className="col-1">
          <p className="text-start">Fecha de Creación</p>
        </div>
        <div className="col-2">
          <input type="date" value={createdDate} onChange={(e) => setCreatedDate(e.target.value)} />
        </div>
      </div>
      <div className="row">
        <div className="col-1">
          <p className="text-start">Fecha de Actualización</p>
        </div>
        <div className="col-2">
          <input type="date" value={updateDate} onChange={(e) => setUpdateDate(e.target.value)} />
        </div>
      </div>
      <div className="row">
        <div className="col">
          {isEdition ? (
            <button className="btn-success" onClick={() => onSubmit(true)} disabled={isLoading}>
              Guardar
            </button>
          ) : (
            <button className="btn-primary" onClick={() => onSubmit(false)} disabled={isLoading}>
              Crear
            </button>
          )}
        </div>
      </div>
    </main>
  )
}

export default CreateOrEditUsuario;

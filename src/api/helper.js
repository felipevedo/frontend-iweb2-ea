import axios from "axios";

const host = process.env.REACT_APP_API_URL || "http://localhost:3001";

// tipos
export const getTipos = () => {
  return axios.get(`${host}/equipos/tipos`);
};

export const getTipoById = (id) => {
  return axios.get(`${host}/equipos/tipos`, { params: { id } });
};

export const createTipoEquipo = (data) => {
  return axios.post(`${host}/equipos/tipos`, data);
};

export const updateTipoEquipo = (data) => {
  return axios.put(`${host}/equipos/tipos`, data);
};

export const deleteTipoEquipo = (id) => {
  return axios.delete(`${host}/equipos/tipos`, { data: { id } });
};

// estados
export const getEstados = () => {
  return axios.get(`${host}/equipos/estados`);
};

export const getEstadoById = (id) => {
  return axios.get(`${host}/equipos/estados`, { params: { id } });
};

export const createEstadoEquipo = (data) => {
  return axios.post(`${host}/equipos/estados`, data);
};

export const updateEstadoEquipo = (data) => {
  return axios.put(`${host}/equipos/estados`, data);
};

export const deleteEstadoEquipo = (id) => {
  return axios.delete(`${host}/equipos/estados`, { data: { id } });
};

// marcas
export const getMarcas = () => {
  return axios.get(`${host}/marcas`);
};

export const getMarcaById = (id) => {
  return axios.get(`${host}/marcas`, { params: { id } });
};

export const createMarca = (data) => {
  return axios.post(`${host}/marcas`, data);
};

export const updateMarca = (data) => {
  return axios.put(`${host}/marcas`, data);
};

export const deleteMarca = (id) => {
  return axios.delete(`${host}/marcas`, { data: { id } });
};

// usuarios
export const getUsuarios = () => {
  return axios.get(`${host}/usuarios`);
};

export const getUsuarioById = (id) => {
  return axios.get(`${host}/usuarios`, { params: { id } });
};

export const createUsuario = (data) => {
  return axios.post(`${host}/usuarios`, data);
};

export const updateUsuario = (data) => {
  return axios.put(`${host}/usuarios`, data);
};

export const deleteUsuario = (id) => {
  return axios.delete(`${host}/usuarios`, { data: { id } });
};

// inventario
export const getInventario = () => {
  return axios.get(`${host}/inventarios`);
};

export const getInventarioById = (serial) => {
  return axios.get(`${host}/inventarios`, { params: { serial } });
};

export const createInventario = (data) => {
  return axios.post(`${host}/inventarios`, data);
};

export const updateInventario = (data) => {
  return axios.put(`${host}/inventarios`, data);
};

export const deleteInventario = (serial) => {
  return axios.delete(`${host}/inventarios`, { data: { serial } });
};

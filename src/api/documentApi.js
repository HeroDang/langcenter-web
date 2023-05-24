import { doc } from 'prettier';
import axiosClient from './axiosClient';

const url = '/documents/';

const documentApi = {
  getAll: async () => {
    const res = await axiosClient.get(url);
    return res.data;
  },

  getById: async idDoc => {
    const res = await axiosClient.get(`${url}${idDoc}`);
    return res.data;
  },

  getByClass: async idClass => {
    const res = await axiosClient.get(`${url}class/${idClass}`);
    return res.data;
  },

  getByIdClass: idClass => {
    return axiosClient.get(`${url}class/${idClass}`);
  },

  create: async document => {
    const res = await axiosClient.post(`${url}create`, document);
    return res.data;
  },

  update: async document => {
    const res = await axiosClient.patch(`${url}update/${document.idDoc}`, document);
    return res.data;
  },

  delete: async idDoc => {
    const res = await axiosClient.delete(`${url}remove/${idDoc}`);
    return res.data;
  },
};

export default documentApi;

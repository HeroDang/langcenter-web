import axiosClient from './axiosClient';

const url = '/students';

const studentApi = {
  getAll: async () => {
    const res = await axiosClient.get(url);
    return res.data;
  },
  getById: async id => {
    return await axiosClient.get(`${url}/${id}`);
  },
  getByIdClass: idClass => {
    return axiosClient.get(`${url}/class/${idClass}`);
  },
  create: async data => {
    const res = await axiosClient.post(`${url}/create`, data);
    return res.data;
  },
  update: async data => {
    console.log(data);
    const res = await axiosClient.patch(`${url}/${data.idStudent}`, data);
    return res.data;
  },
  updateNew: async data => {
    const res = await axiosClient.patch(`${url}/updateNew/${data.idStudent}`, data);
    return res.data;
  },
  updateScore: async data => {
    return await axiosClient.post(`${url}/updateScore/`, data);
  },
  remove: async id => {
    const res = await axiosClient.delete(`${url}/${id}`);
    return res.data;
  },
};

export default studentApi;

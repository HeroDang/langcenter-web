import axiosClient from './axiosClient';

const authApi = {
  loginAccount: async user => {
    const res = await axiosClient.post('auth/sign-in-web', {
      user,
    });
    return res.data;
  },
  resetEmail: async username => {
    return await axiosClient.post('auth/send-mail', {
      username,
    });
  },
  updatePassword: data => {
    return axiosClient.post('auth/reset-password', data);
  },
};
export default authApi;

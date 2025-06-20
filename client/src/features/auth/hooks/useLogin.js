import { useMutation } from '@tanstack/react-query';
import apiInstance from '../../../lib/apiInstance';

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await apiInstance.post('/auth/login', data);
      return res.data;
    },
  });
};

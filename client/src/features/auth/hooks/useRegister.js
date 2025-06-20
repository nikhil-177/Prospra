import { useMutation } from '@tanstack/react-query';
import apiInstance from '../../../lib/apiInstance';

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await apiInstance.post('/auth/register', data);
      return res.data;
    },
  });
};

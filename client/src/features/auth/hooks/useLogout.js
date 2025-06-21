import { useMutation } from '@tanstack/react-query';
import apiInstance from '../../../lib/apiInstance';

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const res = await apiInstance.post(
        '/auth/logout',
        {},
        { withCredentials: true }
      );
      return res.data;
    },
  });
};

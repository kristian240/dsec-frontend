import { post } from '@/utils/network';

export const logout = () => post('/api/users/logout');

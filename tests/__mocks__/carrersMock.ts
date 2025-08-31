import { careersData } from '@/data/careersData';

export const careersMock = careersData.map((p) => ({
  ...p,
  logo: '/mock.webp',
}));

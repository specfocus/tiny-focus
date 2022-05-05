import prisma from 'prisma/client';

export const createUser = (data: any) =>
  prisma.user.create({
    data: {
      ...data,
    },
  });

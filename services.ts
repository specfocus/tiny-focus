import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDrafts = (): Promise<any> =>
  prisma.post.findMany({
    where: { published: false },
    include: { author: true }
  });

export const getFeeds = (): Promise<any> =>
  prisma.post.findMany({
    where: { published: true },
    include: { author: true }
  });

export const getFilterPosts = (searchString: string): Promise<any> =>
  prisma.post.findMany({
    where: {
      OR: [
        {
          title: {
            contains: searchString,
          },
        },
        {
          content: {
            contains: searchString,
          },
        },
      ],
    },
  });

export const createPost = ({ title, content, authorEmail }: any): Promise<any> =>
  prisma.post.create({
    data: {
      title,
      content,
      published: false,
      author: { connect: { email: authorEmail } },
    },
  });

export const deletePost = ({ id }: any): Promise<any> =>
  prisma.post.delete({
    where: {
      id: Number(id),
    },
  });

export const getPost = ({ id }: any): Promise<any> =>
  prisma.post.findUnique({
    where: {
      id: Number(id),
    },
    include: { author: true }
  });

export const publish = ({ id }: any): Promise<any> =>
  prisma.post.update({
    where: { id: Number(id) },
    data: { published: true },
  });

export const createUser = (data: any) =>
  prisma.user.create({
    data: {
      ...data,
    },
  });
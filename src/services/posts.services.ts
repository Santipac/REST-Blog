import { Post } from '@prisma/client'
import { prisma } from '..'

export type returnedValue =
  | { success: boolean; data: Post }
  | { success: boolean; data: Post[] }
  | { success: boolean; data: string }

interface GetAllPost {
  success: boolean
  data: Post[]
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class PostService {
  public static async create({
    title,
    brief,
    body,
    publishedAt,
    imageURL,
    authorId,
  }: Post): Promise<returnedValue> {
    try {
      const created = await prisma.post.create({
        data: {
          title,
          brief,
          body,
          imageURL,
          publishedAt,
          author: {
            connect: { id: authorId },
          },
        },
      })
      return {
        success: true,
        data: created,
      }
    } catch (error) {
      console.log(error)
      return { success: false, data: 'Could not create the Post.' }
    }
  }

  public static async getAll(): Promise<GetAllPost> {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    })
    return { success: true, data: posts }
  }

  public static async getUnique(id: string): Promise<returnedValue> {
    try {
      const post = await prisma.post.findUnique({
        where: { id },
        include: {
          author: {
            select: {
              name: true,
            },
          },
        },
      })
      return { success: true, data: post as Post }
    } catch (error) {
      console.log(error)
      return { success: false, data: 'Could not find this Post.' }
    }
  }

  public static async update(data: any, id: string): Promise<returnedValue> {
    try {
      const updated = await prisma.post.update({
        where: { id },
        data: {
          ...data,
        },
      })
      return { success: true, data: updated }
    } catch (error) {
      return { success: false, data: 'Could not update this Post.' }
    }
  }

  public static async delete(id: string): Promise<returnedValue> {
    try {
      const deleted = await prisma.post.delete({
        where: { id },
      })
      return { success: true, data: deleted }
    } catch (error) {
      console.log(error)
      return { success: false, data: 'Could not delete this Post.' }
    }
  }
}

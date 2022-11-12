import { Post } from '@prisma/client'
import { prisma } from '..'

type returnedValue =
  | { success: boolean; data: Post }
  | { success: boolean; data: Post[] }
  | { success: boolean; data: string }

type ServiceReturn = Promise<returnedValue>

export const create = async ({
  imageURL,
  brief,
  title,
  body,
  authorId,
  publishedAt,
}: Post): ServiceReturn => {
  try {
    const created = await prisma.post.create({
      data: {
        imageURL,
        brief,
        title,
        body,
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

export const getAll = async (): ServiceReturn => {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          name: true,
          lastname: true,
        },
      },
    },
  })
  return { success: true, data: posts }
}

export const getUnique = async (id: string): ServiceReturn => {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            name: true,
            lastname: true,
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

export const update = async (data: any, id: string): ServiceReturn => {
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

export const deletePost = async (id: string): ServiceReturn => {
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

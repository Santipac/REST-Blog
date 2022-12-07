import { User } from '@prisma/client'
import { prisma } from '..'

type ReturnService = Promise<
  | {
      success: boolean
      user: User
    }
  | {
      success: boolean
      user: null
    }
>
export interface UserInfo {
  email: string
  password: string
  name: string
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class UserService {
  public static async create({
    email,
    password,
    name,
  }: UserInfo): ReturnService {
    try {
      const created = await prisma.user.create({
        data: {
          email,
          password,
          name,
        },
      })
      return { success: true, user: created }
    } catch (error) {
      console.log(error)
      return { success: false, user: null }
    }
  }

  public static async getAll(): Promise<User[]> {
    const user = await prisma.user.findMany({})
    return user
  }

  public static async getById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    })
    return user
  }

  public static async getByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    })
    return user
  }

  public static async delete(id: string): Promise<User | null> {
    const user = await prisma.user.delete({
      where: { id },
    })
    return user
  }
}

// export const create = async ({
//   email,
//   password,
//   name,
// }: UserInfo): ReturnService => {
//   try {
//     const created = await prisma.user.create({
//       data: {
//         email,
//         password,
//         name,
//       },
//     })
//     return { success: true, user: created }
//   } catch (error) {
//     console.log(error)
//     return { success: false, user: null }
//   }
// }

// export const getAll = async (): Promise<User[]> => {
//   const user = await prisma.user.findMany({})
//   return user
// }

// export const getByEmail = async (email: string): Promise<User | null> => {
//   const user = await prisma.user.findUnique({
//     where: { email },
//   })
//   return user
// }

// export const getById = async (id: string): Promise<User | null> => {
//   const user = await prisma.user.findUnique({
//     where: { id },
//   })
//   return user
// }
// export const deleteUserService = async (id: string): Promise<User | null> => {
//   const user = await prisma.user.delete({
//     where: { id },
//   })
//   return user
// }

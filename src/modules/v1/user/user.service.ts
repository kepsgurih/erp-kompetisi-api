import { hashPassword } from "../../../utils/hash";
import prisma from "../../../utils/prisma";
import { CreateUserInput } from "./user.schema";

export async function createUser(input: CreateUserInput) {
    const { password, ...rest } = input;
    const { hash, salt } = hashPassword(password);
    const user = await prisma.user.create({
        data: {
            ...rest,
            salt,
            password: hash,
            avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=' + rest.email
        }
    });

    return user
}

export async function findUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    return user
}

export async function findUser(id: string) {
    return prisma.user.findFirst({
        where: {
            id
        }
    });
}
// This will be a Next.js server action file
'use server';

// Import the model and the Prisma client
import prisma from '@/prisma';
import { revalidatePath } from 'next/cache';

interface ParamsType {
	id: string;
	name: string;
	email: string;
}

interface CreateUserParamsType {
	name: string;
	email: string;
}

// READ 1: Get all users
export async function getAllUsers() {
	try {
		const users = await prisma.user.findMany();
		return users;
	} catch (error) {
		throw new Error('Failed to fetch all users');
	}
}

// Read 2: Get one user
export async function getUserById(id: string) {
	try {
		const user = await prisma.user.findFirst({
			where: { id },
		});

		return user;
	} catch (error) {
		throw new Error('Failed to fetch the user');
	}
}

// Create: Create a user
export const createUser = async (params: CreateUserParamsType) => {
	try {
		const newUser = await prisma.user.create({
			data: {
				name: params.name as string,
				email: params.email as string,
			},
		});
		revalidatePath('/');
		return newUser;
	} catch (error) {
		throw new Error('An error occurred while creating the user');
	}
};

// UPDATE: Update a user
export async function updateUser(params: ParamsType) {
	const { id, email, name } = params;
	try {
		const updatedUser = await prisma.user.update({
			where: {
				id,
			},
			data: {
				name,
				email,
			},
		});
		revalidatePath('/');
		return updatedUser;
	} catch (error) {
		throw new Error('User not updated');
	}
}

// DELETE: Delete a user
export const deleteUser = async (id: string) => {
	try {
		// First find the relevant user
		const selectedUser = await prisma.user.findFirst({
			where: { id },
		});

		if (!selectedUser) return;

		// Then, delete the user
		const deletedUser = await prisma.user.delete({
			where: { id },
		});
		revalidatePath('/');
		return deletedUser;
	} catch (error) {
		throw new Error('User not deleted');
	}
};

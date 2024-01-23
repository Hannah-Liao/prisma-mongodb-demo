'use client';

import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

import Loader from './Loader';
import { createUser, updateUser } from '@/lib/actions/user.action';
import { useToast } from '@/components/ui/use-toast';

interface FormProps {
	userName: string;
	userEmail: string;
	btnName: string;
	userId: string;
}

const Form = ({ btnName, userEmail, userName, userId }: FormProps) => {
	const { toast } = useToast();
	const router = useRouter();
	const [formState, setFormState] = useState<{ name: string; email: string }>({
		name: userName,
		email: userEmail,
	});
	const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setFormState((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleAddUser = async (e: FormEvent) => {
		e.preventDefault();
		try {
			setIsSubmitted(true);

			if (btnName == 'Add user') {
				await createUser({
					name: formState.name,
					email: formState.email,
				});
				toast({
					title: 'User successfully created!',
				});
			} else {
				await updateUser({
					id: userId,
					name: formState.name,
					email: formState.email,
				});
				toast({
					title: 'User successfully updated!',
				});
				router.push('/');
			}

			setFormState({ name: '', email: '' });
			setIsSubmitted(false);
		} catch (error: any) {
			setIsSubmitted(false);
			console.error(error.message);
			toast({
				title: 'Something went wrong!',
				variant: 'destructive',
			});
		}
	};

	return (
		<section className='mt-20'>
			<form className='flex' onSubmit={handleAddUser}>
				<div className='mr-5'>
					<label htmlFor='name'>Name</label>
					<input
						className='ml-2  border-2 px-4 py-2 rounded'
						type='text'
						placeholder='Name...'
						value={formState.name}
						onChange={handleChange}
						name='name'
						required
					/>
				</div>

				<div className=''>
					<label htmlFor='email'>Email</label>
					<input
						type='email'
						className='ml-2  border-2 px-4 py-2 rounded'
						placeholder='Email...'
						value={formState.email}
						onChange={handleChange}
						name='email'
						required
					/>
				</div>

				<button
					type='submit'
					className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center ml-5'
				>
					{isSubmitted ? (
						<>
							<Loader />
							Loading...
						</>
					) : (
						btnName
					)}
				</button>
			</form>
		</section>
	);
};

export default Form;

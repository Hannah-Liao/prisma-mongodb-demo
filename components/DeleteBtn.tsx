'use client';

import { deleteUser } from '@/lib/actions/user.action';
import { useToast } from '@/components/ui/use-toast';

interface DeleteBtnProps {
	userId: string;
}

export default function DeleteBtn({ userId }: DeleteBtnProps) {
	const { toast } = useToast();

	const removeUser = async (userId: string) => {
		try {
			await deleteUser(userId);
			toast({
				title: 'User successfully deleted!',
			});
		} catch (err) {
			toast({
				title: 'Something went wrong!',
				variant: 'destructive',
			});
		}
	};
	return (
		<button
			onClick={() => removeUser(userId)}
			className='bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600'
		>
			Delete
		</button>
	);
}

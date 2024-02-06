import Form from '@/components/Form';
import { getUserById } from '@/lib/actions/user.action';
import UserList from '@/components/UserList';

export default async function EditUserById({
	params,
}: {
	params: { id: string };
}) {
	const targetUser = await getUserById(params.id);

	return (
		<div className='flex min-h-screen flex-col items-center p-24 '>
			<h1 className='text-3xl'>CRUD using Prisma + MongoDB</h1>
			<Form
				btnName='Edit user'
				userId={targetUser?.id as string}
				userName={targetUser?.name as string}
				userEmail={targetUser?.email as string}
			/>
			<UserList />
		</div>
	);
}

import Form from '@/components/Form';
import { getAllUsers, getUserById } from '@/lib/actions/user.action';
import DeleteBtn from '@/components/DeleteBtn';
import EditBtn from '@/components/EditBtn';

export default async function EditUserById({
	params,
}: {
	params: { id: string };
}) {
	const userData = await getAllUsers();

	const editingUser = await getUserById(params.id);

	return (
		<div className='flex min-h-screen flex-col items-center p-24 '>
			<h1 className='text-3xl'>CRUD using Prisma + MongoDB</h1>
			<Form
				btnName='Edit user'
				userId={editingUser?.id as string}
				userName={editingUser?.name as string}
				userEmail={editingUser?.email as string}
			/>
			<section className='mt-10'>
				<div className='w-full max-w-screen-xl mx-auto'>
					<table className='min-w-full bg-white border shadow-md rounded-lg overflow-hidden'>
						<thead className='bg-gray-800 text-white'>
							<tr>
								<th className='px-6 py-3 text-left font-semibold'>Name</th>
								<th className='px-6 py-3 text-left font-semibold'>Email</th>
								<th className='px-6 py-3 text-center font-semibold'>Edit</th>
								<th className='px-6 py-3 text-center font-semibold'>Delete</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-gray-200'>
							{userData?.map((user) => (
								<tr key={user.id}>
									<td className='px-6 py-4'>{user.name}</td>
									<td className='px-6 py-4'>{user.email}</td>
									<td className='px-6 py-4 text-center'>
										<EditBtn userId={user.id} />
									</td>
									<td className='px-6 py-4 text-center'>
										<DeleteBtn userId={user.id} />
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>
		</div>
	);
}

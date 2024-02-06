import Form from '@/components/Form';
import UserList from '@/components/UserList';

export default async function Home({ params }: { params: { id: string } }) {
	return (
		<div className='flex min-h-screen flex-col items-center p-24 '>
			<h1 className='text-3xl'>CRUD using Prisma + MongoDB</h1>
			<Form btnName='Add user' userId='' userName='' userEmail='' />
			<UserList />
		</div>
	);
}

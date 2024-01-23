'use client';

import Link from 'next/link';

interface EditBtnProps {
	userId: string;
}

export default function EditBtn({ userId }: EditBtnProps) {
	return (
		<Link
			href={`/edit-user/${userId}`}
			className='bg-blue-500 text-white px-6 py-2.5 rounded-lg hover:bg-blue-600'
		>
			Edit
		</Link>
	);
}

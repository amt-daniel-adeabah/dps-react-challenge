interface User {
	id: number;
	firstName: string;
	lastName: string;
	address: {
		city: string;
	};
	birthDate: string;
}

interface TableProps {
	users: User[];
	highlightOldest: boolean;
}

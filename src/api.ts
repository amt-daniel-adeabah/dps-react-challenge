export const fetchUsers = async () => {
	try {
		const response = await fetch('https://dummyjson.com/users');
		if (!response.ok) {
			throw new Error(`Error: ${response.statusText}`);
		}
		const data = await response.json();
		return data.users;
	} catch (error) {
		console.error('Failed to fetch users:', error);
		throw error;
	}
};

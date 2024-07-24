import React from 'react';
import texts from '../texts.json';

const Table: React.FC<TableProps> = ({ users, highlightOldest }) => {
	const getOldestUsersPerCity = (users: User[]) => {
		const citiesMap = new Map<string, User>();

		users.forEach((user) => {
			const existingOldest = citiesMap.get(user.address.city);
			if (
				!existingOldest ||
				new Date(user.birthDate) < new Date(existingOldest.birthDate)
			) {
				citiesMap.set(user.address.city, user);
			}
		});

		return Array.from(citiesMap.values());
	};

	const highlightedUsers = highlightOldest
		? getOldestUsersPerCity(users)
		: [];

	return (
		<table>
			<thead>
				<tr>
					<th>{texts.table.name}</th>
					<th>{texts.table.city}</th>
					<th>{texts.table.birthDate}</th>
				</tr>
			</thead>
			<tbody>
				{users.map((user) => (
					<tr
						key={user.id}
						className={
							highlightOldest &&
							highlightedUsers.some((u) => u.id === user.id)
								? 'highlighted'
								: ''
						}
					>
						<td>{`${user.firstName} ${user.lastName}`}</td>
						<td>{user.address.city}</td>
						<td>{user.birthDate}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
export default Table;

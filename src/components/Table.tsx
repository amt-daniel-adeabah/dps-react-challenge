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
				<th className="rows underline font-bold">
					<div>{texts.table.name}</div>
					<div>{texts.table.city}</div>
					<div>{texts.table.birthDate}</div>
				</th>
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
						<td>
							<div className="rows">
								<div>{`${user.firstName} ${user.lastName}`}</div>
								<div>{user.address.city}</div>
								<div>{user.birthDate}</div>
							</div>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Table;

import React, { useState, useEffect, useCallback } from 'react';
import { fetchUsers } from './api';
import SelectField from './components/SelectField';
import Table from './components/Table';
import CheckBox from './components/CheckBox';
import InputField from './components/InputField';
import texts from './texts.json';
import debounce from './debounce';
import './App.css';

const Loader: React.FC = () => <div className="loader">Loading...</div>;

const App: React.FC = () => {
	const [error, setError] = useState<string | null>(null);
	const [users, setUsers] = useState<User[]>([]);
	const [cities, setCities] = useState<string[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
	const [selectedCity, setSelectedCity] = useState('');
	const [highlightOldest, setHighlightOldest] = useState(false);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		const loadData = async () => {
			setLoading(true);
			try {
				const data = await fetchUsers();
				setUsers(data);
				const allCities = data.map((user: User) => user.address.city);
				setCities(Array.from(new Set(allCities)));
			} catch (error) {
				setError('Failed to load user data.');
			} finally {
				setLoading(false);
			}
		};

		loadData();
	}, []);

	const applyFilters = useCallback(
		(term: string, city: string) => {
			let results = users.filter((user: User) =>
				`${user.firstName} ${user.lastName}`
					.toLowerCase()
					.includes(term.toLowerCase())
			);

			if (city) {
				results = results.filter(
					(user: User) => user.address.city === city
				);
			}

			setFilteredUsers(results);
		},
		[users]
	);

	const handleSearch = debounce((term: string) => {
		applyFilters(term, selectedCity);
	}, 1000);

	useEffect(() => {
		applyFilters(searchTerm, selectedCity);
	}, [searchTerm, selectedCity, applyFilters]);

	return (
		<div>
			{loading ? (
				<Loader />
			) : (
				<>
					<div className="flex">
						<div className="field-div">
							<span>{texts.table.name}</span>
							<InputField
								value={searchTerm}
								onChange={(e) => {
									setSearchTerm(e.target.value);
									handleSearch(e.target.value);
								}}
							/>
						</div>
						<div className="field-div">
							<span>{texts.table.city}</span>
							<SelectField
								options={cities}
								defaultOptionText="Select city"
								onChange={(e) =>
									setSelectedCity(e.target.value)
								}
							/>
						</div>
						<CheckBox
							checked={highlightOldest}
							checkBoxLabel="Highlight oldest per city"
							onChange={(e) =>
								setHighlightOldest(e.target.checked)
							}
						/>
					</div>
					{error && <p className="error-message">{error}</p>}
					<Table
						users={filteredUsers}
						highlightOldest={highlightOldest}
					/>
				</>
			)}
		</div>
	);
};

export default App;

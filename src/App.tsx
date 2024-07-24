import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { fetchUsers } from './api/api';
import debounce from './hooks/useDebounce';
import texts from './texts.json';
import './App.css';

const SelectField = lazy(() => import('./components/SelectField'));
const Table = lazy(() => import('./components/Table'));
const CheckBox = lazy(() => import('./components/CheckBox'));
const InputField = lazy(() => import('./components/InputField'));

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

	const debouncedSearch = useCallback(
		debounce((term: string) => {
			applyFilters(term, selectedCity);
		}, 1000),
		[applyFilters, selectedCity]
	);

	useEffect(() => {
		applyFilters(searchTerm, selectedCity);
	}, [searchTerm, selectedCity, applyFilters]);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchTerm(value);
		debouncedSearch(value);
	};

	const handleCityChange = useCallback(
		(e: React.ChangeEvent<HTMLSelectElement>) => {
			setSelectedCity(e.target.value);
		},
		[]
	);

	const handleCheckboxChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setHighlightOldest(e.target.checked);
		},
		[]
	);

	return (
		<Suspense fallback={<Loader />}>
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
									onChange={handleSearch}
								/>
							</div>
							<div className="field-div">
								<span>{texts.table.city}</span>
								<SelectField
									options={cities}
									defaultOptionText="Select city"
									onChange={handleCityChange}
								/>
							</div>
							<CheckBox
								checked={highlightOldest}
								checkBoxLabel="Highlight oldest per city"
								onChange={handleCheckboxChange}
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
		</Suspense>
	);
};

export default App;

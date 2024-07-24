import React from 'react';

const SelectField: React.FC<SelectFieldProps> = ({
	options,
	defaultOptionText,
	onChange,
}) => {
	return (
		<select className="field-border" onChange={onChange}>
			<option value="">{defaultOptionText}</option>
			{options.map((option) => (
				<option key={option} value={option}>
					{option}
				</option>
			))}
		</select>
	);
};

export default SelectField;

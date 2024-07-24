import React from 'react';

const InputField: React.FC<InputFieldProps> = ({
	value,
	onChange,
	placeholder,
}) => {
	return (
		<input
			className="field"
			type="search"
			value={value}
			onChange={onChange}
			placeholder={placeholder}
		/>
	);
};

export default InputField;

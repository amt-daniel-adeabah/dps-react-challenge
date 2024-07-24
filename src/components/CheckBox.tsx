import React from 'react';

const CheckBox: React.FC<CheckBoxProps> = ({
	checked,
	checkBoxLabel,
	onChange,
}) => {
	return (
		<label htmlFor={checkBoxLabel} className="flex flow-row-reverse">
			<input
				style={{ width: '2rem', height: '2rem' }}
				type="checkbox"
				checked={checked}
				onChange={onChange}
			/>
			{checkBoxLabel}
		</label>
	);
};

export default CheckBox;

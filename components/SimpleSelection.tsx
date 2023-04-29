import { ChangeEvent } from 'react';
import { Options, Select } from '@ag.ds-next/react/select';

export const SimpleSelection = ({
	label,
	optionList,
	onSelectionHandler,
}: {
	label: string;
	optionList: Options;
	onSelectionHandler: Function;
}) => {
	function handleSelection(event: ChangeEvent<HTMLSelectElement>): void {
		onSelectionHandler(event.target.value);
	}

	return (
		<div>
			<Select
				label={label}
				required
				placeholder={label}
				onChange={handleSelection}
				options={optionList}
			/>
		</div>
	);
};

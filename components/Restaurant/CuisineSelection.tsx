import { Options, Select } from '@ag.ds-next/react/select';
import { ChangeEvent } from 'react';

export const CuisineSelection = ({
	cuisineList,
	setSelectedCuisine,
}: {
	cuisineList: Options;
	setSelectedCuisine: Function;
}) => {
	function handleSelection(event: ChangeEvent<HTMLSelectElement>): void {
		setSelectedCuisine(event.target.value);
	}

	return (
		<div>
			<Select
				label="Select cuisine"
                required
				placeholder="Select cuisine"
				onChange={handleSelection}
				options={cuisineList}
			/>
		</div>
	);
};
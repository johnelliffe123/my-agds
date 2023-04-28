import { ChangeEvent } from 'react';
import { Options, Select } from '@ag.ds-next/react/select';

export const LocationSelection = ({
	locationList,
	setSelectedLocation,
}: {
	locationList: Options;
	setSelectedLocation: Function;
}) => {
	
	function handleSelection(event: ChangeEvent<HTMLSelectElement>): void {
		setSelectedLocation(event.target.value);
	}

	return (
		<div>
			<Select
				label="Select location"
                required
				placeholder="Select location"
				onChange={handleSelection}
				options={locationList}
			/>
		</div>
	);
};

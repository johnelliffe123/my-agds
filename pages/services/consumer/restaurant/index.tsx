import { Columns, Column } from '@ag.ds-next/react/columns';
import { H2 } from '@ag.ds-next/react/heading';
import { PageContent } from '@ag.ds-next/react/content';
import { Prose } from '@ag.ds-next/react/prose';
import { Stack } from '@ag.ds-next/react/box';
import { TaskList } from '@ag.ds-next/react/task-list';
import { Text } from '@ag.ds-next/react/text';
import { Breadcrumbs } from '@ag.ds-next/react/breadcrumbs';
import { AppLayout } from '../../../../components/AppLayout';
import { DocumentTitle } from '../../../../components/DocumentTitle';
import { FormHelpCallout } from '../../../../components/FormHelpCallout';
import { PageTitle } from '../../../../components/PageTitle';
import { useFormRegisterPet } from '../../../../components/FormRegisterPetContext';
import { useState } from 'react';
import { CuisineSelection } from '../../../../components/Restaurant/CuisineSelection';
import { Options } from '@ag.ds-next/react/select';

export default function RegisterRestaurantHomePage() {

	const [cuisineList, setCuisineList] = useState<Options>([]);
	const [selectedCuisine, setSelectedCuisine] = useState<string>();

	return (
		<>
			<DocumentTitle title="food places" />
			<AppLayout>
				<CuisineSelection cuisineList={cuisineList} setSelectedCuisine={setSelectedCuisine} />
			</AppLayout>
		</>
	);
}

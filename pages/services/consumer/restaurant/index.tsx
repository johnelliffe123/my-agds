import { Text } from '@ag.ds-next/react/text';
import { Breadcrumbs } from '@ag.ds-next/react/breadcrumbs';
import { AppLayout } from '../../../../components/AppLayout';
import { DocumentTitle } from '../../../../components/DocumentTitle';
import { useState, useEffect } from 'react';
import { CuisineSelection } from '../../../../components/Restaurant/CuisineSelection';
import { Options } from '@ag.ds-next/react/select';
import clientPromise from '../../../../lib/mongodb';
import { InferGetStaticPropsType } from 'next';
import { RestaurantList } from '../../../../components/Restaurant/RestaurantList';
import { LocationSelection } from '../../../../components/Restaurant/LocationSelection';

export default function ConsumerRestaurantHomePage({
	cuisines,
	locations,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const [cuisineList, setCuisineList] = useState<Options>(cuisines);
	const [selectedCuisine, setSelectedCuisine] = useState<string>();
	const [locationList, setLocationList] = useState<Options>(locations);
	const [selectedLocation, setSelectedLocation] = useState<string>();

	return (
		<>
			<DocumentTitle title="food places" />
			<AppLayout>
				<CuisineSelection
					cuisineList={cuisineList}
					setSelectedCuisine={setSelectedCuisine}
				/>
				<LocationSelection
					locationList={locationList}
					setSelectedLocation={setSelectedLocation}
				/>
				<RestaurantList cuisine={selectedCuisine} location={selectedLocation} />
			</AppLayout>
		</>
	);
}

export async function getStaticProps() {
	const client = await clientPromise;
	await client.connect();
	const db = client.db('sample_restaurants');

	const rests = await db.collection('restaurants').distinct('cuisine');
	const locs = await db.collection('restaurants').distinct('borough');

	const cuisineOptions: Options = rests.map((c) => {
		return { label: c, value: c };
	});
	const locationOptions: Options = locs.map((c) => {
		return { label: c, value: c };
	});

	// Pass data to the page via props
	// return { props: { cuisines: JSON.parse(JSON.stringify(rests)) } }
	return { props: { cuisines: cuisineOptions, locations: locationOptions } };
}

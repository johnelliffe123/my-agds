import { useState, useEffect } from 'react';
import { InferGetStaticPropsType } from 'next';
import { Box, Flex } from '@ag.ds-next/react/box';
import { Options } from '@ag.ds-next/react/select';
import { AppLayout } from '../../../../components/AppLayout';
import { DocumentTitle } from '../../../../components/DocumentTitle';
import { CuisineSelection } from '../../../../components/Restaurant/CuisineSelection';
import { RestaurantList } from '../../../../components/Restaurant/RestaurantList';
import { LocationSelection } from '../../../../components/Restaurant/LocationSelection';
import clientPromise from '../../../../lib/mongodb';

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
				<Flex gap={4} padding={2} alignItems={'stretch'}>
					<CuisineSelection
						cuisineList={cuisineList}
						setSelectedCuisine={setSelectedCuisine}
					/>
					<LocationSelection
						locationList={locationList}
						setSelectedLocation={setSelectedLocation}
					/>
				</Flex>
				<Box padding={2}>
					<RestaurantList
						cuisine={selectedCuisine}
						location={selectedLocation}
					/>
				</Box>
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

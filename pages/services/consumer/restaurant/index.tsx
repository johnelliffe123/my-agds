import { Text } from '@ag.ds-next/react/text';
import { Breadcrumbs } from '@ag.ds-next/react/breadcrumbs';
import { AppLayout } from '../../../../components/AppLayout';
import { DocumentTitle } from '../../../../components/DocumentTitle';
import { FormHelpCallout } from '../../../../components/FormHelpCallout';
import { PageTitle } from '../../../../components/PageTitle';
import { useState, useEffect } from 'react';
import { CuisineSelection } from '../../../../components/Restaurant/CuisineSelection';
import { Options } from '@ag.ds-next/react/select';
import clientPromise from '../../../../lib/mongodb';
import { InferGetStaticPropsType } from 'next';
import { RestaurantList } from '../../../../components/Restaurant/RestaurantList';

export default function ConsumerRestaurantHomePage({
	cuisines,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const [cuisineList, setCuisineList] = useState<Options>(cuisines);
	const [selectedCuisine, setSelectedCuisine] = useState<string>();
	const [restaurantList, setRestaurantList] = useState<Options>([]);

/*
	useEffect(() => {
		if (!selectedCuisine) return;

		setRestaurantList(getRestaurantList(selectedCuisine));
	}, [selectedCuisine]);

					<RestaurantList restaurantList={restaurantList} />

*/

	return (
		<>
			<DocumentTitle title="food places" />
			<AppLayout>
				<CuisineSelection
					cuisineList={cuisineList}
					setSelectedCuisine={setSelectedCuisine}
				/>
			</AppLayout>
		</>
	);
}

/*
// This gets called on every request
export async function getServerSideProps({ req, res }) {

	res.setHeader(
		'Cache-Control',
		'public, s-maxage=30, stale-while-revalidate=59'
	  )

	// Fetch data from external API
	res = await fetch(MONGODB_URI)
	const cuisines: Options = await res.json()
  
	// Pass data to the page via props
	return { props: { cuisines } }
}
*/

export async function getStaticProps() {
	const client = await clientPromise;
	const db = client.db('restaurant');

	const rests = await db.collection('restaurants').distinct('cuisine');

	// Pass data to the page via props
	// return { props: { cuisines: JSON.parse(JSON.stringify(rests)) } }
	return { props: { cuisines: rests } };
}

/*
async function getRestaurantList(cuisine: string) {
	const client = await clientPromise;
	const db = client.db('restaurant');

	const rests = await db
		.collection('restaurants')
		.find({ cuisine: cuisine })
		.limit(100)
		.toArray();

	// Pass data to the page via props
	return JSON.parse(JSON.stringify(rests));
}
*/

import { Fragment } from 'react';
import { DocumentTitle } from '../../../components/DocumentTitle';
import { FormRegisterPetPersonalDetails } from '../../../../../components/FormRegisterPetPersonalDetails/FormRegisterPetPersonalDetails';


export default function PropertyMgtPropertyList() {
	cuisines,
	locations,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const [cuisineList, setCuisineList] = useState<Options>(cuisines);
	const [selectedCuisine, setSelectedCuisine] = useState<string>();
	const [locationList, setLocationList] = useState<Options>(locations);
	const [selectedLocation, setSelectedLocation] = useState<string>();

	return (
		<Fragment>
			<DocumentTitle title="Property Management | Property List" />
			<FormRegisterPetPersonalDetails />
		</Fragment>
	);


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

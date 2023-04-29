// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

type Data = {
	name: string;
};
export interface IRestaurant {
	borough: string;
	cuisine: string;
	name: string;
	restaurant_id: string;
}

async function getRestaurantList(
	cuisine: string | undefined,
	location: string | undefined
) {
	const client = await clientPromise;
	await client.connect();
	const db = client.db('sample_restaurants');

	const rests = await db
		.collection<IRestaurant>('restaurants')
		.find(buildFilter(cuisine, location), {
			projection: { borough: 1, cuisine: 1, name: 1, restaurant_id: 1 },
		})
		.limit(100)
		.toArray();

	// Pass data to the page via props
	return JSON.parse(JSON.stringify(rests));
}

function buildFilter(
	cuisine: string | undefined,
	location: string | undefined
): {} {
	return cuisine && location
		? { cuisine: cuisine, borough: location }
		: cuisine
		? { cuisine: cuisine }
		: { borough: location };
}

function toUndefString(
	arg0: string | string[] | undefined
): string | undefined {
	return Array.isArray(arg0) ? arg0[0] : arg0 === '' ? undefined : arg0;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { cuisine, location } = req.query; //res.status(200).json({ name: 'John Doexxx' });

	res
		.status(200)
		.json(
			await getRestaurantList(toUndefString(cuisine), toUndefString(location))
		);
}

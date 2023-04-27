// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

type Data = {
	name: string;
};

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

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	//res.status(200).json({ name: 'John Doexxx' });

	res.status(200).json(await getRestaurantList("Italian"));
}

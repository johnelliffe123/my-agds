import { useEffect, useState } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableWrapper,
} from '@ag.ds-next/react/table';
import { IRestaurant } from '../../pages/api/consumer/restaurant';

export const RestaurantList = ({ cuisine, location }: { cuisine: string | undefined, location: string | undefined }) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [restaurantList, setRestaurantList] = useState<IRestaurant[]>([]);

	// useSWR

	useEffect(() => {
		setLoading(true);
		fetch('/api/consumer/restaurant?cuisine='+cuisine+'&location='+location)
			.then((res) => res.json())
			.then((data) => {
				setRestaurantList(data);
				setLoading(false);
			});
	}, [cuisine, location]);

	// probably want to convert to table
	return (
		<TableWrapper>
			<Table>
				<TableHead>
					<tr></tr>
				</TableHead>
				<TableBody>
					{restaurantList.map((r) => (
						<tr key={r.restaurant_id}>
							<TableCell>{r.name}</TableCell>
							<TableCell>{r.cuisine}</TableCell>
							<TableCell>{r.borough}</TableCell>
						</tr>
					))}
				</TableBody>
			</Table>
		</TableWrapper>
	);
};

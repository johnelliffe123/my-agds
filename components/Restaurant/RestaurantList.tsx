import { useEffect, useState } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableWrapper,
} from '@ag.ds-next/react/table';
import { IRestaurant } from '../../pages/api/consumer/restaurant';

export const RestaurantList = ({
	cuisine,
	location,
}: {
	cuisine: string | undefined;
	location: string | undefined;
}) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [restaurantList, setRestaurantList] = useState<IRestaurant[]>([]);

	function toDefinedString(
		arg0: string | string[] | undefined
	): string {
		return Array.isArray(arg0) ? arg0[0] : arg0 ? arg0 : '';
	}
	// useSWR

	useEffect(() => {
		if (!cuisine && !location) {
			setRestaurantList([]);
			return;
		}
			setLoading(true);
			fetch(
				'/api/consumer/restaurant?cuisine=' +
					toDefinedString(cuisine) +
					'&location=' +
					toDefinedString(location)
			)
				.then((res) => res.json())
				.then((data) => {
					setRestaurantList(data);
					setLoading(false);
				});
		
	}, [cuisine, location]);

	return (
		<TableWrapper>
			<Table striped>
				<TableHead>
					<tr>
						<TableHeader>Name</TableHeader>
						<TableHeader>Cuisine</TableHeader>
						<TableHeader>Location</TableHeader>
					</tr>
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

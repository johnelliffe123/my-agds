import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableWrapper,
} from '@ag.ds-next/react/table';
import { IProperty } from './page';

export const PropertyMgtPropertyTable = ({
	propertyList,
}: {
	propertyList: IProperty[];
}) => {


	function toDefinedString(arg0: string | string[] | undefined): string {
		return Array.isArray(arg0) ? arg0[0] : arg0 ? arg0 : '';
	}
	// useSWR


	return (
		<TableWrapper>
			<Table striped>
				<TableHead>
					<tr>
						<TableHeader>Name</TableHeader>
						<TableHeader></TableHeader>
						<TableHeader></TableHeader>
					</tr>
				</TableHead>
				<TableBody>
					{propertyList.map((p) => (
						<tr key={p.restaurant_id}>
							<TableCell>{p.name}</TableCell>
							<TableCell>{p.cuisine}</TableCell>
							<TableCell>{p.borough}</TableCell>
						</tr>
					))}
				</TableBody>
			</Table>
		</TableWrapper>
	);
};

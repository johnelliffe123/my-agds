import { Stack } from '@ag.ds-next/react/box';
import { H3 } from '@ag.ds-next/react/heading';
import { Text } from '@ag.ds-next/react/text';
import { Card, CardInner, CardLink } from '@ag.ds-next/react/card';
import { Columns } from '@ag.ds-next/react/columns';

const items = [
	{
		title: 'Find a restaurant',
		slug: '/services/consumer/restaurant',
		description: 'Find a restaurant description.',
	},
	{
		title: 'Registrations',
		slug: '/services/registrations',
		description:
			'Access and maintain all your business registration tasks in one place.',
	},
	{
		title: 'Register a pet',
		slug: '/services/registrations/pet',
		description:
			'Registering domestic animals is a requirement of pet ownership.',
	},
	{
		title: 'Housing',
		slug: '/services/propertyMgt/properties',
		description:
			'Find help with housing and how to apply for rental assistance.',
	},
	{
		title: 'Waste removal',
		slug: '/not-found',
		description: 'Find waste and recycling management facilities near you.',
	},
	{
		title: 'Urban services',
		slug: '/not-found',
		description:
			'Pay a notice, or apply for permits, approvals and certificates.',
	},
];

export function ServicesCardList() {
	return (
		<Columns as="ul" cols={{ xs: 1, sm: 2, md: 3 }}>
			{items.map((item) => (
				<Card as="li" key={item.title} shadow clickable>
					<CardInner>
						<Stack gap={1}>
							<H3>
								<CardLink href={item.slug}>{item.title}</CardLink>
							</H3>
							<Text as="p">{item.description}</Text>
						</Stack>
					</CardInner>
				</Card>
			))}
		</Columns>
	);
}

import type { NextPage } from 'next';
import { DocumentTitle } from '../components/DocumentTitle';
import { AppLayout } from '../components/AppLayout';
import {
	HeroBanner,
	HeroBannerSubtitle,
	HeroBannerTitle,
	HeroBannerTitleContainer,
} from '@ag.ds-next/react/hero-banner';
import { SectionContent } from '@ag.ds-next/react/content';
import { Stack } from '@ag.ds-next/react/box';
import { H2 } from '@ag.ds-next/react/heading';
import { ServicesCardList } from '../components/ServicesCardList';

const Home: NextPage = () => {
	return (
		<>
			<DocumentTitle title="Home" />
			<AppLayout>
				<HeroBanner background="bodyAlt">
					<HeroBannerTitleContainer>
						<HeroBannerTitle>My Government services account</HeroBannerTitle>
						<HeroBannerSubtitle>
							Manage all your government services in one secure and easy to
							access place online.
						</HeroBannerSubtitle>
					</HeroBannerTitleContainer>
				</HeroBanner>
				<SectionContent>
					<Stack gap={1.5}>
						<H2>Frequently used services</H2>
						<ServicesCardList />
					</Stack>
				</SectionContent>
			</AppLayout>
		</>
	);
};

export default Home;

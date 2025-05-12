import Wrapper from '@/components/Wrapper';
import Header from '@/components/Header';

const HomePage = () => {
	return (
		<Wrapper>
			<Header />

			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: 'calc(100vh - 74px - 74px)',
					border: '2px dashed var(--color-primary)',
				}}
			>
				<p style={{ fontWeight: 500, color: 'var(--color-primary)' }}>В разработке</p>
			</div>
		</Wrapper>
	);
};

export default HomePage;

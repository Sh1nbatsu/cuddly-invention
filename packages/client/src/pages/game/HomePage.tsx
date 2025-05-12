import Wrapper from '@/components/Wrapper';
import Header from '@/components/Header';
import Canvas from '@/components/Canvas';

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
				<Canvas />
			</div>
		</Wrapper>
	);
};

export default HomePage;

import Header from '@/components/Header';
import Wrapper from '@/components/Wrapper';

const NotFoundPage = () => {
	return (
		<Wrapper>
			<Header />
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					height: 'calc(100vh - 74px)',
				}}
			>
				<h1
					style={{
						fontSize: '6rem',
						fontWeight: 'bold',
						color: 'var(--color-primary)',
					}}
				>
					404
				</h1>
			</div>
		</Wrapper>
	);
};

export default NotFoundPage;

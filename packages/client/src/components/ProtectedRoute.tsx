import { getMe } from '@/api/auth';
import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
	redirectPath?: string;
	children?: React.ReactNode;
	spinSize?: 'small' | 'default' | 'large';
}

export const ProtectedRoute = ({ redirectPath = '/sign-in', children, spinSize = 'large' }: ProtectedRouteProps) => {
	const [authStatus, setAuthStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');
	const location = useLocation();

	useEffect(() => {
		let isMounted = true;

		const checkAuth = async () => {
			try {
				await getMe();
				if (isMounted) setAuthStatus('authenticated');
			} catch (error) {
				if (isMounted) setAuthStatus('unauthenticated');
			}
		};

		checkAuth();

		return () => {
			isMounted = false;
		};
	}, []);

	if (authStatus === 'loading') {
		return (
			<div style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
				<Spin size={spinSize} />
			</div>
		);
	}

	if (authStatus === 'unauthenticated') {
		return <Navigate to={redirectPath} state={{ from: location }} replace />;
	}

	return children ? <>{children}</> : <Outlet />;
};

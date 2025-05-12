import React, { ReactNode } from 'react';

interface WrapperProps {
	children: ReactNode;
	className?: string;
	style?: React.CSSProperties;
}

const Wrapper: React.FC<WrapperProps> = ({ children, className = '', style = {} }) => {
	return (
		<div
			className={`container ${className}`}
			style={{
				maxWidth: '1200px',
				minHeight: '100vh',
				margin: '0 auto',
				padding: '0 16px',
				...style,
			}}
		>
			{children}
		</div>
	);
};

export default Wrapper;

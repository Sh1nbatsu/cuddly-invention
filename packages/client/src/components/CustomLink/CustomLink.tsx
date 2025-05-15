import { ReactNode } from 'react';
import { Link, LinkProps, useLocation } from 'react-router-dom';
import styles from './CustomLink.module.css';

type LinkVariant = 'default' | 'retro';

interface CustomLinkProps extends Omit<LinkProps, 'className'> {
	children: ReactNode;
	variant?: LinkVariant;
	disabled?: boolean;
}

export const CustomLink = ({ children, variant = 'default', disabled = false, to, ...rest }: CustomLinkProps) => {
	const location = useLocation();
	const isActive = location.pathname === to;

	const className = [
		styles.link,
		styles[variant],
		disabled ? styles.disabled : '',
		isActive ? styles.active : '',
	].join(' ');

	return (
		<Link className={className} to={to} {...rest}>
			{children}
		</Link>
	);
};

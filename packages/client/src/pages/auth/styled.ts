import { Button, Form, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const AuthForm = styled(Form)`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	max-width: 400px;
	width: 100%;
	margin: 0 auto;
	height: 100vh;
	min-height: 100vh;
`;

export const AuthTitle = styled(Typography.Title)`
	font-size: 24px;
	text-align: center;
`;

export const AuthSubmitButton = styled(Button)`
	margin-top: 15px;
`;

export const AuthFooterText = styled(Typography.Text)`
	font-size: 14px;
	color: rgba(0, 0, 0, 0.45);
`;

export const AuthLink = styled(Link)`
	color: #1890ff;
	&:hover {
		color: #40a9ff;
	}
`;

export const AuthSpace = styled(Space)`
	width: '100%';
	justify-content: 'center';
	margin-top: '16px';
`;

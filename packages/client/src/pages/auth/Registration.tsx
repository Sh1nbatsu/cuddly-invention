import { FormInput } from '@/components/FormInput/FormInput';

import { register } from '@/api/auth';
import Wrapper from '@/components/Wrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { RegisterFormData, RegisterSchema } from './schemas';
import { AuthFooterText, AuthForm, AuthLink, AuthSpace, AuthSubmitButton, AuthTitle } from './styled';

const DEFAULT_VALUES = {
	first_name: '',
	second_name: '',
	login: '',
	email: '',
	password: '',
	phone: '',
};

export const Registration = () => {
	const {
		handleSubmit,
		control,
		formState: { isValid },
	} = useForm({
		defaultValues: DEFAULT_VALUES,
		mode: 'onChange',
		resolver: zodResolver(RegisterSchema),
	});
	const navigate = useNavigate();
	const onSubmit = async (data: RegisterFormData) => {
		try {
			await register(data);
			navigate('sign-in');
		} catch (error) {
			console.error('error', error);
		}
	};

	const onFinish = () => {
		return handleSubmit(onSubmit)();
	};

	return (
		<Wrapper>
			<AuthForm onFinish={onFinish} layout="vertical" autoComplete="off">
				<AuthTitle level={2}>Регистрация</AuthTitle>

				<FormInput control={control} name="first_name" label="Имя" />

				<FormInput control={control} name="second_name" label="Фамилия" />

				<FormInput control={control} name="login" label="Логин" />

				<FormInput
					control={control}
					name="email"
					label="Почта"
					inputProps={{
						type: 'email',
					}}
				/>
				<FormInput
					control={control}
					name="password"
					label="Пароль"
					inputProps={{
						type: 'password',
						autoComplete: 'new-password',
					}}
				/>

				<FormInput
					control={control}
					name="phone"
					label="Телефон"
					inputProps={{
						type: 'tel',
					}}
				/>

				<AuthSubmitButton variant="outlined" htmlType="submit" disabled={!isValid} size="large">
					Зарегистрироваться
				</AuthSubmitButton>

				<AuthSpace direction="horizontal">
					<AuthFooterText>
						Уже есть аккаунт? <AuthLink to="/sign-in">Войти</AuthLink>
					</AuthFooterText>
				</AuthSpace>
			</AuthForm>
		</Wrapper>
	);
};

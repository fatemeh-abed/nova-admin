import { useMemo } from 'react';
import type { ChangeEvent } from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import Button from '../../Shared/Button';
import TextField from '../../Shared/TextField';
import { useDictionary } from '../../Shared/useDictionary';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { clearAuthError, loginThunk, selectIsAuthLoading } from '../../Redux/slices/authSlice';
import { createLoginSchema, loginInitialValues } from '../../Validations/loginSchema';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;
`;

const ErrorBanner = styled.div`
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.colors.danger};
  border-radius: ${({ theme }) => theme.radius.sm};
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const LoginForm = () => {
  const dictionary = useDictionary();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsAuthLoading);
  const authError = useAppSelector((state) => state.auth.error);

  const validationSchema = useMemo(
    () => createLoginSchema(dictionary.validation),
    [dictionary.validation],
  );

  const formik = useFormik({
    initialValues: loginInitialValues,
    validationSchema,
    onSubmit: (values) => {
      void dispatch(loginThunk(values));
    },
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (authError) dispatch(clearAuthError());
    formik.handleChange(event);
  };

  const fieldError = (name: keyof typeof loginInitialValues) =>
    formik.touched[name] ? formik.errors[name] : undefined;

  const { authentication, messages } = dictionary;

  return (
    <Form onSubmit={formik.handleSubmit} noValidate>
      {authError && <ErrorBanner role="alert">{messages.errors[authError]}</ErrorBanner>}
      <TextField
        id="username"
        name="username"
        type="text"
        autoComplete="username"
        label={authentication.username}
        value={formik.values.username}
        onChange={handleChange}
        onBlur={formik.handleBlur}
        error={fieldError('username')}
        disabled={isLoading}
      />
      <TextField
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        label={authentication.password}
        value={formik.values.password}
        onChange={handleChange}
        onBlur={formik.handleBlur}
        error={fieldError('password')}
        disabled={isLoading}
      />
      <Button type="submit" disabled={isLoading} aria-busy={isLoading}>
        {isLoading ? authentication.signingIn : authentication.login}
      </Button>
    </Form>
  );
};

export default LoginForm;

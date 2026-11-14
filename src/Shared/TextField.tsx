import styled from 'styled-components';
import type { InputHTMLAttributes } from 'react';

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const Input = styled.input<{ $hasError: boolean }>`
  height: 44px;
  padding-inline: 12px;
  border: 1px solid
    ${({ theme, $hasError }) => ($hasError ? theme.colors.danger : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes.md};

  &:focus {
    border-color: ${({ theme }) => theme.colors.highlight};
    outline: none;
  }
`;

const ErrorText = styled.span`
  min-height: 1.2em;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.danger};
`;

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
}

const TextField = ({ id, label, error, ...inputProps }: TextFieldProps) => (
  <Field>
    <Label htmlFor={id}>{label}</Label>
    <Input
      id={id}
      $hasError={Boolean(error)}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${id}-error` : undefined}
      {...inputProps}
    />
    <ErrorText id={`${id}-error`} role={error ? 'alert' : undefined}>
      {error}
    </ErrorText>
  </Field>
);

export default TextField;

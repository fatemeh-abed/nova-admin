import styled, { css } from 'styled-components';

interface ButtonProps {
  $variant?: 'primary' | 'outline';
}

// Primary = orange accent; outline = secondary actions.
const Button = styled.button<ButtonProps>`
  height: 44px;
  padding-inline: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;

  ${({ theme, $variant = 'primary' }) =>
    $variant === 'primary'
      ? css`
          border: 0;
          background: ${theme.colors.accent};
          color: ${theme.colors.onAccent};
        `
      : css`
          border: 1px solid ${theme.colors.border};
          background: transparent;
          color: ${theme.colors.text};
        `}

  &:hover:not(:disabled) {
    filter: brightness(0.95);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default Button;

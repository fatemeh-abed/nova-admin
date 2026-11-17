import styled, { css } from "styled-components";

interface ButtonProps {
  $variant?: "primary" | "outline";
}

const Button = styled.button<ButtonProps>`
  height: 44px;
  padding-inline: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radius.sm};

  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  cursor: pointer;
  transition:
    background 0.2s ease,
    border-color 0.2s ease;

  ${({ theme, $variant = "primary" }) =>
    $variant === "primary"
      ? css`
          border: 1px solid #2563eb;
          background: #2563eb;
          color: #ffffff;

          &:hover:not(:disabled) {
            background: #1d4ed8;
            border-color: #1d4ed8;
          }
        `
      : css`
          border: 1px solid ${theme.colors.border};
          background: ${theme.colors.surface};
          color: ${theme.colors.text};

          &:hover:not(:disabled) {
            background: ${theme.colors.surfaceAlt};
          }
        `}

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focusRing};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default Button;

import styled from "styled-components";
import { formatNumber } from "../Utils/language";

const PaginationContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  direction: ltr;
  gap: 6px;
  padding: 16px 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  button {
    min-width: 36px;
    height: 36px;
    padding: 0 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    font-size: 14px;
    font-weight: 800;
    font-variant-numeric: tabular-nums;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
      border-color: #2563eb;
      color: #2563eb;
      background: #eff6ff;
    }

    &.active {
      background: #2563eb;
      border-color: #2563eb;
      color: #ffffff;
      font-weight: 900;
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }
`;

type Language = Parameters<typeof formatNumber>[1];

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  language: Language;
  onPageChange: (page: number) => void;
  ariaLabel?: string;
  previousLabel?: string;
  nextLabel?: string;
};

export default function Pagination({
  currentPage,
  totalPages,
  language,
  onPageChange,
  ariaLabel = "صفحه‌بندی",
  previousLabel = "صفحه قبل",
  nextLabel = "صفحه بعد",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) {
      return;
    }

    onPageChange(newPage);
  };

  return (
    <PaginationContainer aria-label={ariaLabel}>
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        aria-label={previousLabel}
      >
        ‹
      </button>

      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            className={currentPage === pageNumber ? "active" : ""}
            onClick={() => handlePageChange(pageNumber)}
            aria-label={`صفحه ${pageNumber}`}
            aria-current={currentPage === pageNumber ? "page" : undefined}
          >
            {formatNumber(pageNumber, language)}
          </button>
        ),
      )}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        aria-label={nextLabel}
      >
        ›
      </button>
    </PaginationContainer>
  );
}

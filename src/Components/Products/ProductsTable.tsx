import styled from "styled-components";
import { Eye, Pencil, Trash2 } from "lucide-react";

import { useAppSelector } from "../../Redux/hooks";
import { useDictionary } from "../../Shared/useDictionary";

import { productTranslations } from "../../Utils/productTranslations";
import { formatPrice } from "../../Utils/formatPrice";
import type { Product } from "../../types/product.types";

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 16px 18px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    text-align: start;
    vertical-align: middle;
  }

  th {
    font-size: 14px;
    font-weight: 800;
    background: ${({ theme }) => theme.colors.surfaceAlt};
    color: ${({ theme }) => theme.colors.text};
  }

  td {
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
  }

  tbody tr:hover {
    background: ${({ theme }) => theme.colors.surfaceAlt};
  }

  tbody tr:last-child td {
    border-bottom: none;
  }
`;

const ProductTitle = styled.span`
  font-size: 14px;
  font-weight: 700;
  line-height: 1.8;
`;

const ProductPrice = styled.span`
  font-size: 15px;
  font-weight: 800;
  white-space: nowrap;
`;

const Thumb = styled.img`
  width: 46px;
  height: 46px;
  object-fit: contain;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: white;
  padding: 4px;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ActionButton = styled.button<{
  $variant: "view" | "edit" | "delete";
}>`
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.surface};

  color: ${({ $variant }) =>
    $variant === "view"
      ? "#2563eb"
      : $variant === "edit"
        ? "#d97706"
        : "#dc2626"};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

type ProductsTableProps = {
  products: Product[];
};

export default function ProductsTable({ products }: ProductsTableProps) {
  const d = useDictionary();
  const language = useAppSelector((state) => state.ui.language);

  const categoryLabels: Record<string, string> = {
    electronics: d.products.categoryElectronics,
    jewelery: d.products.categoryJewelery,
    "men's clothing": d.products.categoryMensClothing,
    "women's clothing": d.products.categoryWomensClothing,
  };

  const getCategoryLabel = (category: string) => {
    if (language === "en") return category;

    return categoryLabels[category] ?? category;
  };

  return (
    <TableWrapper>
      <Table>
        <thead>
          <tr>
            <th>{d.products.image}</th>
            <th>{d.products.productTitle}</th>
            <th>{d.products.category}</th>
            <th>{d.products.price}</th>
            <th>{d.products.rating}</th>
            <th>{d.common.actions}</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <Thumb src={product.image} alt={product.title} loading="lazy" />
              </td>

              <td>
                <ProductTitle dir="auto">
                  {language === "fa"
                    ? (productTranslations[product.id] ?? product.title)
                    : product.title}
                </ProductTitle>
              </td>

              <td>{getCategoryLabel(product.category)}</td>

              <td>
                <ProductPrice>
                  {formatPrice(product.price, language)}
                </ProductPrice>
              </td>

              <td>
                {product.rating?.rate != null
                  ? product.rating.rate.toLocaleString(
                      language === "fa" ? "fa-IR" : "en-US",
                    )
                  : "—"}
              </td>

              <td>
                <Actions>
                  <ActionButton
                    type="button"
                    $variant="view"
                    title={d.common.view}
                    aria-label={d.common.view}
                    disabled
                  >
                    <Eye size={17} />
                  </ActionButton>

                  <ActionButton
                    type="button"
                    $variant="edit"
                    title={d.common.edit}
                    aria-label={d.common.edit}
                    disabled
                  >
                    <Pencil size={17} />
                  </ActionButton>

                  <ActionButton
                    type="button"
                    $variant="delete"
                    title={d.common.delete}
                    aria-label={d.common.delete}
                    disabled
                  >
                    <Trash2 size={17} />
                  </ActionButton>
                </Actions>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableWrapper>
  );
}

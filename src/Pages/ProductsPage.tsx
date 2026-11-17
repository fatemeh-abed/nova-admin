import { useEffect, useMemo, useState } from "react";

import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { fetchProducts } from "../Redux/slices/productsSlice";

import Button from "../Shared/Button";
import { Icon } from "../Shared/Icons";
import { useDictionary } from "../Shared/useDictionary";
import SearchInput from "../Shared/SearchInput";
import Pagination from "../Shared/Pagination";

import CreateProductModal from "../Modals/CreateProductModal";

import ProductsTable from "../Components/Products/ProductsTable";

import { ApiErrorCode } from "../types/Enums/ApiErrorCode";
import { RequestStatus } from "../types/Enums/RequestStatus";

import { productTranslations } from "../Utils/productTranslations";

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 22px;
  h1 {
    margin: 0;
    font-size: 24px;
  }
`;
const AddProductButton = styled(Button)`
  border-radius: 9px;
`;

const Panel = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  overflow: hidden;
`;
const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Message = styled.div`
  padding: 36px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
`;
const Notice = styled.div`
  padding: 12px 18px;
  margin-bottom: 16px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.success};
  border-radius: 9px;
`;

const PAGE_SIZE = 7;
export default function ProductsPage() {
  const d = useDictionary();
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((s) => s.products);
  const language = useAppSelector((s) => s.ui.language);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    if (status === RequestStatus.Idle) void dispatch(fetchProducts());
  }, [dispatch, status]);

  const filtered = useMemo(() => {
    const normalize = (value: string) =>
      value
        .toLocaleLowerCase()
        .replace(/ي/g, "ی")
        .replace(/ك/g, "ک")
        .replace(/\u200c/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    const query = normalize(search);

    if (!query) return items;

    return items.filter((p) => {
      const persianTitle = productTranslations[p.id] ?? "";

      const searchableText = [
        p.title,
        persianTitle,
        p.category,
        p.description ?? "",
        String(p.price),
      ].join(" ");

      return normalize(searchableText).includes(query);
    });
  }, [items, search]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const visible = filtered.slice(
    (current - 1) * PAGE_SIZE,
    current * PAGE_SIZE,
  );
  return (
    <>
      <Top>
        <h1>{d.products.title}</h1>
      </Top>
      {success && <Notice role="status">{d.messages.productCreated}</Notice>}
      <Panel>
        <Toolbar>
          <SearchInput
            value={search}
            placeholder={d.products.searchPlaceholder}
            onChange={(value) => {
              setSearch(value);
              setPage(1);
            }}
          />

          <AddProductButton type="button" onClick={() => setOpen(true)}>
            <Icon name="plus" size={17} />
            {d.products.addProduct}
          </AddProductButton>
        </Toolbar>

        {status === RequestStatus.Loading || status === RequestStatus.Idle ? (
          <Message>{d.common.loading}</Message>
        ) : status === RequestStatus.Failed ? (
          <Message role="alert">
            {d.messages.errors[error ?? ApiErrorCode.Unknown]}{" "}
            <Button
              type="button"
              onClick={() => void dispatch(fetchProducts())}
            >
              {d.common.retry}
            </Button>
          </Message>
        ) : filtered.length === 0 ? (
          <Message>{d.products.empty}</Message>
        ) : (
          <>
            <ProductsTable products={visible} />

            <Pagination
              currentPage={current}
              totalPages={pages}
              language={language}
              onPageChange={setPage}
              ariaLabel="صفحه‌بندی محصولات"
              previousLabel="صفحه قبل"
              nextLabel="صفحه بعد"
            />
          </>
        )}
      </Panel>
      {open && (
        <CreateProductModal
          onClose={() => setOpen(false)}
          onSuccess={() => {
            setOpen(false);
            setSuccess(true);
            setSearch("");
            setPage(1);
          }}
        />
      )}
    </>
  );
}

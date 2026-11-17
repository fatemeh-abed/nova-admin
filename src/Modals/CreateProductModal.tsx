import { useState } from "react";
import styled from "styled-components";
import { X } from "lucide-react";

import { useAppDispatch } from "../Redux/hooks";
import { addProduct } from "../Redux/slices/productsSlice";

import { useDictionary } from "../Shared/useDictionary";
import { ApiErrorCode } from "../types/Enums/ApiErrorCode";
import { getErrorCode } from "../Utils/api/apiError";

import ProductForm from "../Components/Products/ProductForm";
import type { ProductFormValues } from "../Components/Products/ProductForm";

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(3px);
`;

const Panel = styled.div`
  width: min(650px, 100%);
  max-height: 90vh;
  overflow-y: auto;

  padding: 26px;
  border-radius: 16px;

  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.md};

  direction: ${({ theme }) => theme.direction};
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;

  h2 {
    margin: 0;
    font-size: 19px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const CloseButton = styled.button`
  display: grid;
  place-items: center;

  width: 32px;
  height: 32px;

  border: none;
  border-radius: 8px;

  background: transparent;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceAlt};
  }
`;

const ErrorMessage = styled.p`
  margin-top: 16px;
  color: ${({ theme }) => theme.colors.danger};
  font-size: 13px;
  font-weight: 600;
`;

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

export default function CreateProductModal({ onClose, onSuccess }: Props) {
  const d = useDictionary();
  const dispatch = useAppDispatch();

  const [error, setError] = useState("");

  const handleSubmit = async (values: ProductFormValues): Promise<void> => {
    setError("");

    try {
      await dispatch(
        addProduct({
          title: values.title.trim(),
          description: values.description.trim(),
          category: values.category,
          image: values.image.trim(),
          price: Number(values.price),
        }),
      ).unwrap();

      onSuccess();
    } catch (err: unknown) {
      const errorCode =
        typeof err === "string" &&
        Object.values(ApiErrorCode).some((code) => code === err)
          ? (err as ApiErrorCode)
          : getErrorCode(err);

      setError(d.messages.errors[errorCode]);
    }
  };

  return (
    <Backdrop
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <Panel
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-dialog-title"
      >
        <Head>
          <h2 id="product-dialog-title">{d.products.addProduct}</h2>

          <CloseButton
            type="button"
            onClick={onClose}
            aria-label={d.common.cancel}
          >
            <X size={19} />
          </CloseButton>
        </Head>

        <ProductForm onSubmit={handleSubmit} onCancel={onClose} />

        {error && <ErrorMessage role="alert">{error}</ErrorMessage>}
      </Panel>
    </Backdrop>
  );
}

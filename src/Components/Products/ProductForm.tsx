import { Formik, Form, Field } from "formik";
import styled from "styled-components";

import { useDictionary } from "../../Shared/useDictionary";
import Button from "../../Shared/Button";
import { productSchema } from "../../Validations/productSchema";

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  min-width: 0;

  label {
    color: ${({ theme }) => theme.colors.text};
    font-size: 13px;
    font-weight: 700;
  }

  input,
  select,
  textarea {
    width: 100%;
    box-sizing: border-box;
    padding: 11px 13px;

    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;

    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};

    font: inherit;
    font-size: 13px;
    outline: none;

    &:focus {
      border-color: ${({ theme }) => theme.colors.accent};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.focusRing};
    }

    &::placeholder {
      color: ${({ theme }) => theme.colors.textMuted};
    }
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }

  small {
    color: ${({ theme }) => theme.colors.danger};
    font-size: 11px;
  }
`;

const Required = styled.span`
  color: ${({ theme }) => theme.colors.danger};
`;

const ImagePreview = styled.div`
  min-height: 160px;
  display: grid;
  place-items: center;
  overflow: hidden;

  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.surfaceAlt};

  img {
    width: 100%;
    max-height: 180px;
    object-fit: contain;
    padding: 12px;
    box-sizing: border-box;
  }

  span {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 12px;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  margin-top: 24px;
`;

export type ProductFormValues = {
  title: string;
  description: string;
  price: string;
  category: string;
  image: string;
};

type Props = {
  onSubmit: (values: ProductFormValues) => Promise<void>;
  onCancel: () => void;
};

export default function ProductForm({ onSubmit, onCancel }: Props) {
  const d = useDictionary();

  const categories = [
    {
      value: "electronics",
      label: d.products.categoryElectronics,
    },
    {
      value: "jewelery",
      label: d.products.categoryJewelery,
    },
    {
      value: "men's clothing",
      label: d.products.categoryMensClothing,
    },
    {
      value: "women's clothing",
      label: d.products.categoryWomensClothing,
    },
  ];

  const initialValues: ProductFormValues = {
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
  };

  return (
    <Formik<ProductFormValues>
      initialValues={initialValues}
      validationSchema={productSchema(d)}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, isSubmitting }) => (
        <Form>
          <Content>
            <Group>
              <label htmlFor="product-title">
                {d.products.productTitle} <Required>*</Required>
              </label>

              <Field
                id="product-title"
                name="title"
                placeholder={d.products.productTitlePlaceholder}
              />

              {touched.title && errors.title && <small>{errors.title}</small>}
            </Group>

            <Group>
              <label htmlFor="product-category">
                {d.products.category} <Required>*</Required>
              </label>

              <Field as="select" id="product-category" name="category">
                <option value="">{d.products.categoryPlaceholder}</option>

                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </Field>

              {touched.category && errors.category && (
                <small>{errors.category}</small>
              )}
            </Group>

            <Group>
              <label htmlFor="product-price">
                {d.products.price} ({d.products.priceUnit}){" "}
                <Required>*</Required>
              </label>

              <Field
                id="product-price"
                name="price"
                type="number"
                min="1"
                step="1"
                placeholder={d.products.pricePlaceholder}
                dir="ltr"
              />

              {touched.price && errors.price && <small>{errors.price}</small>}
            </Group>

            <Group>
              <label htmlFor="product-image">
                {d.products.imageUrl} <Required>*</Required>
              </label>

              <Field
                id="product-image"
                name="image"
                type="url"
                dir="ltr"
                placeholder={d.products.imageUrlPlaceholder}
              />

              {touched.image && errors.image && <small>{errors.image}</small>}
            </Group>
          </Content>

          <Group style={{ marginTop: 18 }}>
            <label htmlFor="product-description">
              {d.products.description} <Required>*</Required>
            </label>

            <Field
              as="textarea"
              id="product-description"
              name="description"
              placeholder={d.products.descriptionPlaceholder}
            />

            {touched.description && errors.description && (
              <small>{errors.description}</small>
            )}
          </Group>

          <Group style={{ marginTop: 18 }}>
            <label>{d.products.imagePreview}</label>

            <ImagePreview>
              {values.image && /^https?:\/\/\S+$/i.test(values.image.trim()) ? (
                <img
                  key={values.image}
                  src={values.image}
                  alt={d.products.imagePreview}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span>{d.products.imageUrlPlaceholder}</span>
              )}
            </ImagePreview>
          </Group>

          <Footer>
            <Button
              type="button"
              $variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              {d.common.cancel}
            </Button>

            <Button type="submit" $variant="primary" disabled={isSubmitting}>
              {isSubmitting ? d.common.loading : d.products.addProduct}
            </Button>
          </Footer>
        </Form>
      )}
    </Formik>
  );
}

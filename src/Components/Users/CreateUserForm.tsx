import { Formik, Form, Field, ErrorMessage } from "formik";
import styled from "styled-components";

import { useDictionary } from "../../Shared/useDictionary";
import Button from "../../Shared/Button";
import { userSchema } from "../../Validations/userSchema";

import type { CreateUserFormValues } from "../../types/user.types";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  min-width: 0;

  label {
    font-size: 13px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Input = styled(Field)`
  width: 100%;
  height: 44px;
  padding: 0 13px;
  box-sizing: border-box;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 9px;

  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};

  font: inherit;
  font-size: 13px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.focusRing};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const ErrorText = styled.small`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 11px;
`;

const Required = styled.span`
  color: ${({ theme }) => theme.colors.danger};
  margin-inline-start: 4px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  margin-top: 24px;
`;

const initialValues: CreateUserFormValues = {
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
  phone: "",
};

type Props = {
  onSubmit: (values: CreateUserFormValues) => Promise<void>;
  onCancel: () => void;
};

export default function CreateUserForm({ onSubmit, onCancel }: Props) {
  const d = useDictionary();

  const fields: {
    name: keyof CreateUserFormValues;
    label: string;
    placeholder: string;
    type: string;
    ltr?: boolean;
  }[] = [
    {
      name: "firstname",
      label: d.users.firstName,
      placeholder: d.users.firstName,
      type: "text",
    },
    {
      name: "lastname",
      label: d.users.lastName,
      placeholder: d.users.lastName,
      type: "text",
    },
    {
      name: "username",
      label: d.users.username,
      placeholder: d.users.username,
      type: "text",
      ltr: true,
    },
    {
      name: "email",
      label: d.users.email,
      placeholder: "example@email.com",
      type: "email",
      ltr: true,
    },
    {
      name: "password",
      label: d.users.password,
      placeholder: d.validation.passwordMinLength,
      type: "password",
    },
    {
      name: "phone",
      label: d.users.phone,
      placeholder: "09123456789",
      type: "tel",
      ltr: true,
    },
  ];

  return (
    <Formik<CreateUserFormValues>
      initialValues={initialValues}
      validationSchema={userSchema(d)}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form noValidate>
          <Grid>
            {fields.map((item) => (
              <FieldGroup key={item.name}>
                <label htmlFor={`user-${item.name}`}>
                  {item.label}
                  <Required>*</Required>
                </label>

                <Input
                  id={`user-${item.name}`}
                  name={item.name}
                  type={item.type}
                  placeholder={item.placeholder}
                  dir={item.ltr ? "ltr" : undefined}
                  aria-required="true"
                />

                <ErrorMessage name={item.name} component={ErrorText} />
              </FieldGroup>
            ))}
          </Grid>

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
              {isSubmitting ? d.common.loading : d.users.addUser}
            </Button>
          </Footer>
        </Form>
      )}
    </Formik>
  );
}

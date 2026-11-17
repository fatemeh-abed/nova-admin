import { useState } from "react";
import styled from "styled-components";
import { X } from "lucide-react";

import { useAppDispatch } from "../Redux/hooks";
import { addUser } from "../Redux/slices/usersSlice";

import { useDictionary } from "../Shared/useDictionary";
import { ApiErrorCode } from "../types/Enums/ApiErrorCode";
import { getErrorCode } from "../Utils/api/apiError";

import CreateUserForm from "../Components/Users/CreateUserForm";

import type {
  CreateUserFormValues,
  CreateUserRequest,
} from "../types/user.types";

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

const ErrorText = styled.p`
  margin-top: 16px;
  color: ${({ theme }) => theme.colors.danger};
  font-size: 13px;
  font-weight: 600;
`;

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

export default function CreateUserModal({ onClose, onSuccess }: Props) {
  const d = useDictionary();
  const dispatch = useAppDispatch();

  const [error, setError] = useState("");

  const handleSubmit = async (values: CreateUserFormValues): Promise<void> => {
    setError("");

    const payload: CreateUserRequest = {
      email: values.email.trim(),
      username: values.username.trim(),
      password: values.password,
      name: {
        firstname: values.firstname.trim(),
        lastname: values.lastname.trim(),
      },
      phone: values.phone.trim(),
    };

    try {
      await dispatch(addUser(payload)).unwrap();
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
        aria-labelledby="user-dialog-title"
      >
        <Head>
          <h2 id="user-dialog-title">{d.users.addUser}</h2>

          <CloseButton
            type="button"
            onClick={onClose}
            aria-label={d.common.cancel}
          >
            <X size={19} />
          </CloseButton>
        </Head>

        <CreateUserForm onSubmit={handleSubmit} onCancel={onClose} />

        {error && <ErrorText role="alert">{error}</ErrorText>}
      </Panel>
    </Backdrop>
  );
}

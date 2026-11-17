import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { fetchUsers } from "../Redux/slices/usersSlice";

import Button from "../Shared/Button";
import { Icon } from "../Shared/Icons";
import { useDictionary } from "../Shared/useDictionary";
import SearchInput from "../Shared/SearchInput";
import Pagination from "../Shared/Pagination";

import CreateUserModal from "../Modals/CreateUserModal";
import UsersTable from "../Components/Users/UsersTable";

import { RequestStatus } from "../types/Enums/RequestStatus";
import { ApiErrorCode } from "../types/Enums/ApiErrorCode";

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

const AddUserButton = styled(Button)`
  border-radius: 9px;
`;

const Panel = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  overflow: hidden;
  direction: ${({ theme }) => theme.direction};
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

const normalizeText = (value: string) =>
  value
    .toLocaleLowerCase()
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/\u200c/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export default function UsersPage() {
  const d = useDictionary();
  const dispatch = useAppDispatch();

  const { items, status, error } = useAppSelector((state) => state.users);

  const language = useAppSelector((state) => state.ui.language);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (status === RequestStatus.Idle) {
      void dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  const filtered = useMemo(() => {
    const query = normalizeText(search);

    if (!query) return items;

    return items.filter((user) => {
      const searchableText = [
        user.name.firstname,
        user.name.lastname,
        `${user.name.firstname} ${user.name.lastname}`,
        user.username,
        user.email,
        user.phone,
      ].join(" ");

      return normalizeText(searchableText).includes(query);
    });
  }, [items, search]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const current = Math.min(page, pages);

  const visible = filtered.slice(
    (current - 1) * PAGE_SIZE,
    current * PAGE_SIZE,
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleCreateSuccess = () => {
    setOpen(false);
    setSuccess(true);
    setSearch("");
    setPage(1);
  };

  return (
    <>
      <Top>
        <h1>{d.users.title}</h1>
      </Top>

      {success && <Notice role="status">{d.messages.userCreated}</Notice>}

      <Panel>
        <Toolbar>
          <SearchInput
            value={search}
            onChange={handleSearchChange}
            placeholder={d.users.searchPlaceholder}
            ariaLabel={d.users.searchPlaceholder}
          />

          <AddUserButton
            type="button"
            onClick={() => {
              setSuccess(false);
              setOpen(true);
            }}
          >
            <Icon name="plus" size={17} />
            {d.users.addUser}
          </AddUserButton>
        </Toolbar>

        {status === RequestStatus.Loading || status === RequestStatus.Idle ? (
          <Message role="status">{d.common.loading}</Message>
        ) : status === RequestStatus.Failed ? (
          <Message role="alert">
            {d.messages.errors[error ?? ApiErrorCode.Unknown]}{" "}
            <Button type="button" onClick={() => void dispatch(fetchUsers())}>
              {d.common.retry}
            </Button>
          </Message>
        ) : filtered.length === 0 ? (
          <Message>{search ? d.users.noSearchResults : d.users.empty}</Message>
        ) : (
          <>
            <UsersTable users={visible} />

            <Pagination
              currentPage={current}
              totalPages={pages}
              language={language}
              onPageChange={setPage}
              ariaLabel="صفحه‌بندی کاربران"
            />
          </>
        )}
      </Panel>

      {open && (
        <CreateUserModal
          onClose={() => setOpen(false)}
          onSuccess={handleCreateSuccess}
        />
      )}
    </>
  );
}

import styled from "styled-components";

import type { User } from "../../types/user.types";
import { useDictionary } from "../../Shared/useDictionary";

const TableScroll = styled.div`
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

type UsersTableProps = {
  users: User[];
};

export default function UsersTable({ users }: UsersTableProps) {
  const d = useDictionary();

  return (
    <TableScroll>
      <Table>
        <thead>
          <tr>
            <th>{d.users.fullName}</th>
            <th>{d.users.username}</th>
            <th>{d.users.email}</th>
            <th>{d.users.phone}</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                {user.name.firstname} {user.name.lastname}
              </td>

              <td dir="ltr">{user.username}</td>

              <td dir="ltr">{user.email}</td>

              <td dir="ltr">{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableScroll>
  );
}

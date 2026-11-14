import { useEffect } from 'react';
import styled from 'styled-components';
import SummaryCard from '../Components/Dashboard/SummaryCard';
import { useDictionary } from '../Shared/useDictionary';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { fetchProducts } from '../Redux/slices/productsSlice';
import { fetchUsers } from '../Redux/slices/usersSlice';
import { formatNumber } from '../Utils/language';
import { ApiErrorCode } from '../types/Enums/ApiErrorCode';
import { AppRoute } from '../types/Enums/AppRoute';
import { RequestStatus } from '../types/Enums/RequestStatus';
import type { Dictionary } from '../Dictionary';
import type { ListState } from '../types/api.types';
import type { Language } from '../types/Enums/Language';

const Title = styled.h1`
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

// Text shown inside a summary card for a list's current request state.
const getCardValue = (
  list: ListState<unknown>,
  dictionary: Dictionary,
  language: Language,
): string => {
  if (list.status === RequestStatus.Failed) {
    return dictionary.messages.errors[list.error ?? ApiErrorCode.Unknown];
  }
  if (list.status !== RequestStatus.Succeeded) return dictionary.common.loading;
  return formatNumber(list.items.length, language);
};

const DashboardPage = () => {
  const dictionary = useDictionary();
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.ui.language);
  const products = useAppSelector((state) => state.products);
  const users = useAppSelector((state) => state.users);

  useEffect(() => {
    if (products.status === RequestStatus.Idle) void dispatch(fetchProducts());
    if (users.status === RequestStatus.Idle) void dispatch(fetchUsers());
  }, [dispatch, products.status, users.status]);

  return (
    <>
      <Title>{dictionary.dashboard.title}</Title>
      <Grid>
        <SummaryCard
          icon="products"
          icon="products"
          label={dictionary.dashboard.totalProducts}
          value={getCardValue(products, dictionary, language)}
          isError={products.status === RequestStatus.Failed}
          to={AppRoute.Products}
        />
        <SummaryCard
          icon="users"
          icon="users"
          label={dictionary.dashboard.totalUsers}
          value={getCardValue(users, dictionary, language)}
          isError={users.status === RequestStatus.Failed}
          to={AppRoute.Users}
        />
      </Grid>
    </>
  );
};

export default DashboardPage;

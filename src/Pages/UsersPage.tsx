import PagePlaceholder from '../Shared/PagePlaceholder';
import { useDictionary } from '../Shared/useDictionary';

const UsersPage = () => {
  const { navigation } = useDictionary();
  return <PagePlaceholder title={navigation.users} />;
};

export default UsersPage;

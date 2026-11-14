import PagePlaceholder from '../Shared/PagePlaceholder';
import { useDictionary } from '../Shared/useDictionary';

const DashboardPage = () => {
  const { navigation } = useDictionary();
  return <PagePlaceholder title={navigation.dashboard} />;
};

export default DashboardPage;

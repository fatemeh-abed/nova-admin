import PagePlaceholder from '../Shared/PagePlaceholder';
import Button from '../Shared/Button';
import { useDictionary } from '../Shared/useDictionary';
import { useLogout } from '../Shared/useLogout';

// TEMPORARY (Phase 4): the logout button lives here only to exercise the auth flow.
// It moves to the admin Header in Phase 5.
const DashboardPage = () => {
  const { navigation, authentication } = useDictionary();
  const handleLogout = useLogout();

  return (
    <>
      <PagePlaceholder title={navigation.dashboard} />
      <Button type="button" onClick={handleLogout} style={{ marginBlockStart: 16 }}>
        {authentication.logout}
      </Button>
    </>
  );
};

export default DashboardPage;

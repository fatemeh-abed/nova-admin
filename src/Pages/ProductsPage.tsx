import PagePlaceholder from '../Shared/PagePlaceholder';
import { useDictionary } from '../Shared/useDictionary';

const ProductsPage = () => {
  const { navigation } = useDictionary();
  return <PagePlaceholder title={navigation.products} />;
};

export default ProductsPage;

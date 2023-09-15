import SearchResultsList from '@/src/components/SearchResultsList/SearchResultsList';
const SearchResults = async () => {
  const token = process.env.CONTENTFUL_ACCESS_TOKEN;
  const space = process.env.CONTENTFUL_SPACE_ID;
  return <SearchResultsList token={token} space={space} />;
};

export default SearchResults;

'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from 'contentful';
import MaxWidth from '@/src/components/Layout/MaxWidthContainer';
import SearchResultsArticle from '@/src/components/SearchResultsList/SearchResultsArticle/SearchResultsArticle';
import SearchResultsPage from '@/src/components/SearchResultsList/SearchResultsPage/SearchResultsPage';
import SearchResultsProject from '@/src/components/SearchResultsList/SearchResultsProject/SearchResultsProject';
import styles from './searchResultsList.module.css';

const getSearchResults = async (query, types, client, skip) => {

  /**
   * TODO:
   * - recursiveCrawl - add Promise.all
   * - create hash map for results, avoid duplicated requests
   */

  const invalidTypes = ['textBlock', 'testimonial', 'imageAndText', 'stats', 'data', 'content', 'bannerContent', 'accordionItem', 'job'];

  const getData = async () => {
    const promiseArr = [];
    // Already valid types
    types.forEach((type) => {
      promiseArr.push(fetchData(type));
    });
    // invalidTypes
    invalidTypes.forEach((type) => {
      promiseArr.push(fetchRecursiveData(type));
    });
    let result = [];
    await Promise.all(promiseArr).then((responses) => {
      result = responses.flat();
    });
    return result;
  };

  const fetchData = async (type) => {
    return new Promise(async (resolve, reject) => {
      try {
        const entries = await client.getEntries({
          content_type: type,
          query,
          order: '-sys.updatedAt',
          skip,
          limit: 5,
        });
        resolve(entries.items);
      } catch (e) {
        reject(e);
      }
    });
  };

  const fetchRecursiveData = async (type) => {
    return new Promise(async (resolve, reject) => {
      const items = await fetchData(type);
      if (items.length === 0) resolve([]);
      const result = [];
      const recursiveCrawl = async (items) => {
        try {
          for (const item of items) {
            const itemType = item.sys.contentType.sys.id;
            if (types.includes(itemType)) {
              result.push(item);
            } else {
              const parentItems = await getParentItems(item.sys.id);
              await recursiveCrawl(parentItems);
            }
          }
          return result;
        }
        catch (e) {
          reject(e);
        }
      };
      const response = await recursiveCrawl(items);
      resolve(response);
    });
  };

  const getParentItems = async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const entries = await client.getEntries({
          order: '-sys.updatedAt',
          links_to_entry: id,
        });
        resolve(entries.items);
      } catch (e) {
        reject(e);
      }
    });
  };

  const result = await getData();
  const uniqResult = [
    ...new Map(result.map((item) => [item.fields.slug, item])).values(),
  ];
  return uniqResult

};

const SearchResultsList = ({ token, space }) => {
  const clientRef = useRef();
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const searchRouter = useSearchParams();
  const [query, setQuery] = useState(searchRouter.get('q'));

  const types = useMemo(() => ['article', 'page', 'project'], []);

  useEffect(() => {
    setQuery(searchRouter.get('q'));
  }, [searchRouter]);

  useEffect(() => {
    if (!space || !token) {
      return;
    }

    clientRef.current = createClient({
      space,
      accessToken: token,
    });
  }, [space, token]);

  useEffect(() => {
    if (query) {
      const getSearchData = async () => {
        setLoading(true);
        const newSearchData = await getSearchResults(query, types, clientRef.current, 0);
        setSearchData(newSearchData);
        setLoading(false);
      };
      getSearchData();
    } else {
      setLoading(false);
    }
  }, [query, types]);

  const handlePagination = async pageNumber => {
    setLoading(true);
    setCurrentPage(pageNumber);
    setLoading(false);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  const itemsPerPage = 5;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const pagedData = searchData.slice(startIndex, endIndex);

  if (loading) {
    return (
      <MaxWidth>
        <h1 className={styles.loading}>Loading...</h1>
      </MaxWidth>
    );
  }

  if (query === '') {
    return (
      <MaxWidth>
        <h1>Please enter a search result</h1>
      </MaxWidth>
    );
  }

  if (searchData.length === 0) {
    return (
      <MaxWidth>
        <h1 className={styles.noResult}>No results found.</h1>
      </MaxWidth>
    );
  }

  return (
    <div className={styles.searchResults}>
      <MaxWidth>
        <h1 className={styles.pageTitle}>Search Results</h1>
        <ul className={styles.results}>
          {pagedData.map(item => (
            <div key={item?.sys?.id} className={styles.searchResult}>
              {item?.sys?.contentType?.sys?.id === 'article' && <SearchResultsArticle item={item} />}
              {item?.sys?.contentType?.sys?.id === 'page' && <SearchResultsPage item={item} />}
              {item?.sys?.contentType?.sys?.id === 'project' && <SearchResultsProject item={item} />}
            </div>
          ))}
        </ul>
        {searchData.length > itemsPerPage &&
          <ul className={styles.pagination}>
            {Array.from({ length: Math.ceil(searchData.length / itemsPerPage) }).map((_, index) => (
              <li key={index + 1}
              className={((index + 1) === currentPage ? styles.paginationActive : '')}
              >
                <button onClick={() => handlePagination(index + 1)}>{index + 1}</button>
              </li>
            ))}
          </ul>}
      </MaxWidth>
    </div>
  );
};

export default SearchResultsList;

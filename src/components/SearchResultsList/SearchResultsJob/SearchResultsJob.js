'use client';

import styles from './searchResultsJob.module.css';

const SearchResultsJob = ({ item }) => {
  return (
    <>
      <h2>{item?.fields?.title}</h2>
      <h4>{item?.fields?.description}</h4>
    </>
  );
};

export default SearchResultsJob;

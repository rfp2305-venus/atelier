import React from 'react';

export default function SortOptions({currentProductId, reviewSort, handleSortSelect}) {

  const handleSelected = (event) => {
    getReviewData(event.target.value);
  };


  return (
    <form>
      <select className='sortSelect' name='sortBy' onChange={e => handleChange(e)} value={reviewSort}>
        {['relevance', 'helpful', 'newest'].map((sortBy, i) => {
          return <option key={`reviewSort${i}`} value={sortBy}>{sortBy}</option>;
        })}
      </select>
    </form>
  );
}




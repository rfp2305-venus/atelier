import React, { useState } from 'react';

export default function SortOptions({setReviews, setSortby}) {

  return (
    <div>
      <label htmlFor="sortOrder">Sort by:</label>
      <select id="sortOrder" onChange={e => {setReviews([]); setSortby(e.target.value); }}>
        <option value="relevant">Relevant</option>
        <option value="helpful">Helpful</option>
        <option value="newest">Newest</option>
      </select>
    </div>
  );

}



// return (
//   <form>
//     <select className='sortSelect' name='sortBy' onChange={e => handleSelected(e)} value={selection}>
//       {['relevance', 'helpful', 'newest'].map((sortBy, i) => {
//         return <option key={`option${i}`} value={sortBy}>{sortBy}</option>;
//       })}
//     </select>
//   </form>
// );

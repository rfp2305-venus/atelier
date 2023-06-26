import React from 'react';

export default function SortOptions() {
  return (
    <div>
      <label htmlFor="sortOptions">Sort By:</label>
      <select id="sortOptions">
        <option value="helpful">Helpful</option>
        <option value="newest">Newest</option>
        <option value="relevant">Relevant</option>
      </select>
    </div>
  );
}

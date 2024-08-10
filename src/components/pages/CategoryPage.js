import React from 'react';
import { Link, useParams } from 'react-router-dom';

const CategoryPage = () => {
  const a = useParams();
  console.log(a, 'CategoryPage.js', 6);
  return (
    <div>
      <Link to="/">home</Link>
        <div>{a.categoryName}</div>
    </div>
  );
};

export default CategoryPage;

import { useContext, useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import {gql} from '@apollo/client';
import ProductCard from '../../components/product-card/product-card.component';

import { CategoriesContext } from '../../contexts/categories.context';

import { CategoryContainer, Title } from './category.styles';
import { useQuery } from '@apollo/client';

const GET_CATEGORY = gql`
query($title: String!){
  getCollectionsByTitle(title: $title){
  id
  title
  items{
    id
    name
    price
    imageUrl
    }
  }
}
`
const Category = () => {
  const { category } = useParams();
  const {loading, error, data} = useQuery(GET_CATEGORY, {
    variables: {
      title: category
    },
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if(data){
      const{
        getCollectionsByTitle: {items},

      } = data;
      setProducts(items);
    }
  }, [category, data]);

  return (
    <Fragment>
      <Title>{category.toUpperCase()}</Title>
      <CategoryContainer>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryContainer>
    </Fragment>
  );
};

export default Category;

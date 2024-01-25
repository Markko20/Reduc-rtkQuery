import styled from 'styled-components';
import NewProduct from '../components/NewProduct';
import ProductList from '../components/ProductList';

const Title = styled.h1`
  font-size: 50px;
  color: #fff;
  text-align: center;
  margin-bottom: 50px;
`;

const Container = styled.div`
  margin: 0 auto; 
  padding: 0 100px;
`;

const HomePage = () => {
  return (
    <div>
    <Title>Main page</Title>
    <NewProduct />
    <Container>
      <ProductList />
    </Container>
  </div>
  )
}

export default HomePage
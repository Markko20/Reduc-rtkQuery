import { productsAPI } from "../services/ProductsService";
import ProductCard from "./product-card.components";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import { ProductModel } from "../models/product.model";
import Alert from "@mui/material/Alert";

const ProducListStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ProducList = () => {
  const {
    data: products,
    isError,
    isLoading,
  } = productsAPI.useFetchAllProductsQuery("");

  return (
    <>
      {isLoading && (
        <div
          style={{ color: "#fff", display: "flex", justifyContent: "center" }}
        >
          <CircularProgress color="inherit" />
        </div>
      )}

      {isError && (
        <Alert variant="filled" severity="error">
          Data retrieval error. Please try again
        </Alert>
      )}

      <ProducListStyle>
        {products &&
          products.map((product: ProductModel) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
      </ProducListStyle>
    </>
  );
};

export default ProducList;

import React, { memo, FC } from "react";
import { useAppSelector } from "../hooks/redux";
import styled from "styled-components";
import { productsAPI } from "../services/ProductsService";
import { ProductModel } from "../models/product.model";
import { Link } from "react-router-dom";

type ProductCardProps = {
  product: ProductModel
};

const Card = styled.div`
  margin-left: 20px;
  width: 300px;
  height: 300px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Равномерное распределение между дочерними элементами */
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  margin-bottom: 20px;
  position: relative;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  max-height: 200px;
  object-fit: contain;
  align-self: center; 
`;

const Title = styled.h2`
  font-size: 15px;
  color: #333;
  text-align: center;
  margin-bottom: 10px;
`;

const Price = styled.div`
  margin-top: auto; /* Оставшееся пространство будет занято ProductPrice */
  font-size: 25px;
  text-align: center;
`;

const Delete = styled.button`
  padding: 5px 10px;
  position: absolute;
  right: 5px;
  bottom: 5px;
  cursor: pointer;
`

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const [deletePost, {}] = productsAPI.useDeleteProductMutation()

  const onClickDelete = async() => {
    await deletePost(product)
  }

  return (
    <Card>
      <Title>{product.title}</Title>
      <Link className="link" to={`/product/${product.id}`}>
      <Image src={product.image} />
      </Link>
      <Price>{product.price}$</Price>
      <Delete onClick={onClickDelete}>Delete</Delete>
    </Card>
  );
};

export default memo(ProductCard);

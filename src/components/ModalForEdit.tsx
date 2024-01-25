import React, { useState } from "react";
import {
  AnimatedButton,
  Button,
  ButtonContainer,
  InputContainer,
  InputField,
  ModalContent,
  ModalOverlay,
  Title,
  shakeAnimation,
} from "../assets/styles";
import { ProductModel } from "../models/product.model";
import { ChangeEvent } from "react";
import { productsAPI } from "../services/ProductsService";

interface ModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: ProductModel;
}

const ModalForEdit: React.FC<ModalProps> = ({ setIsModalOpen, data }) => {
  const [isError, setIsError] = useState(false);
  const [product, setProduct] = useState(data);
  const [updateProduct, {}] = productsAPI.useUpdateProductMutation()

  const onChangeInputTitle = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setProduct((prev) => ({
        ...prev,
        title: event.target.value,
      }));
    } else {
      setProduct((prev) => ({
        ...prev,
        title: "",
      }));
    }
  };

  const onChangeInputDescription = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setProduct((prev) => ({
        ...prev,
        description: event.target.value,
      }));
    } else {
      setProduct((prev) => ({
        ...prev,
        description: "",
      }));
    }
  };

  const onChangeInputPrice = (event: ChangeEvent<HTMLInputElement>) => {
    if (Number(event.target.value)) {
      setProduct((prev) => ({
        ...prev,
        price: Number(event.target.value),
      }));
    } else {
      setProduct((prev) => ({
        ...prev,
        price: 0,
      }));
    }
  };

  const onClickEdit = async() => {
    if (product.description && product.title && product.price !== 0) {
      await updateProduct(product);
      setIsModalOpen((prev) => !prev);
    } else {
      setIsError(true);

      setTimeout(() => {
        setIsError(false);
      }, 500);

      return;
    }
  };

  const onCLickClose = () => {
    setIsModalOpen(false);
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <Title>Редактировать товар</Title>
        <InputContainer>
          <InputField
            placeholder="Введите название"
            defaultValue={product.title}
            onChange={onChangeInputTitle}
          />
        </InputContainer>

        <InputContainer>
          <InputField
            placeholder="Введите описание"
            onChange={onChangeInputDescription}
            defaultValue={product.description}
          />
        </InputContainer>

        <InputContainer>
          <InputField
            placeholder="Введите цену"
            onChange={onChangeInputPrice}
            defaultValue={product.price}
          />
        </InputContainer>

        <ButtonContainer>
          <AnimatedButton
            onClick={onClickEdit}
            className={isError ? "shake" : ""}
          >
            Edit
          </AnimatedButton>
          <Button onClick={onCLickClose}>Cancel</Button>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ModalForEdit;

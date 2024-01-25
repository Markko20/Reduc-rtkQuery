import React, { useState } from "react";
import { ChangeEvent } from "react";
import { ProductModel } from "../models/product.model";
import { v4 as uuidv4 } from "uuid";
import { productsAPI } from "../services/ProductsService";
import {
  AnimatedButton,
  Button,
  ButtonContainer,
  InputContainer,
  InputField,
  ModalContent,
  ModalOverlay,
  Title,
} from "../assets/styles";

interface ModalProps {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({ setIsOpenModal }) => {
  const id = uuidv4();

  const [product, setProduct] = useState<ProductModel>({
    title: "",
    description: "",
    id,
    image: "https://placehold.co/600x900",
    price: 0,
  });
  const [isError, setIsError] = useState(false);

  const [createProduct, {}] = productsAPI.useCreateProductMutation();

  const onCLickClose = (): void => {
    setIsOpenModal((prev) => !prev);
  };

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

  const onClickCreate = async () => {
    if (product.description && product.title && product.price !== 0) {
      await createProduct(product);
      setIsOpenModal((prev) => !prev);
    } else {
      setIsError(true);

      setTimeout(() => {
        setIsError(false);
      }, 500);

      return;
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <Title>Создать новый товар</Title>
        <InputContainer>
          <InputField
            placeholder="Введите название"
            onChange={onChangeInputTitle}
          />
        </InputContainer>

        <InputContainer>
          <InputField
            placeholder="Введите описание"
            onChange={onChangeInputDescription}
          />
        </InputContainer>

        <InputContainer>
          <InputField
            placeholder="Введите цену"
            onChange={onChangeInputPrice}
          />
        </InputContainer>

        <ButtonContainer>
          <AnimatedButton
            onClick={onClickCreate}
            className={isError ? "shake" : ""}
          >
            Create
          </AnimatedButton>
          <Button onClick={onCLickClose}>Cancel</Button>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;

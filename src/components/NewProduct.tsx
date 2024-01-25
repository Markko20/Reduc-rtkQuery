import { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";

const Plus = styled.div`
  position: fixed;
  right: 15px;
  bottom: 15px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 2px #fff solid;
  color: #fff;
  background-color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  font-weight: 800;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

const NewProduct = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const onClickplus = () => {
    setIsOpenModal(state => !state)
  }

  return (
    <>
      {isOpenModal && <Modal setIsOpenModal={setIsOpenModal}/>}
      <Plus onClick={onClickplus}>+</Plus>
    </>
  );
};

export default NewProduct;

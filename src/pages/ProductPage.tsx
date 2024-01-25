import { useState } from "react";
import { useParams } from "react-router-dom";
import { productsAPI } from "../services/ProductsService";
import styled from "styled-components";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import ModalForEdit from "../components/ModalForEdit";

const Wrapper = styled.div`
  width: 1200px;
  min-height: 600px;
  margin: 0 auto;
  margin-top: 100px;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  align-items: center;
  background-color: #fff;
  position: relative;
`;

const Image = styled.img`
  width: 500px;
  height: auto;
  max-height: 500px;
  object-fit: contain;
  align-self: center;
  margin-right: 100px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`;

const EditButton = styled(Button)`
  position: absolute;
  top: 15px;
  right: 15px;
`

const ProductPage = () => {
  const { id = "" } = useParams();
  const { data, isError, isLoading } = productsAPI.useFetchProductQuery(id);
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onClickEdit = () => {
    setIsModalOpen(true)
  }

  return (
    <>
    {isModalOpen && <ModalForEdit data={data!} setIsModalOpen={setIsModalOpen}/>}
      {isError ? (
        <Alert variant="filled" severity="error">
          Data retrieval error. Please try again
          <Link className="link" to="/">
            <Button
              style={{
                color: "#000",
                marginLeft: "15px",
                backgroundColor: "transparent",
                border: "1px #000 solid",
              }}
            >
              ← Назад
            </Button>
          </Link>
        </Alert>
      ) : isLoading ? (
        <Wrapper style={{ justifyContent: "center" }}>
          <CircularProgress color="inherit" />
        </Wrapper>
      ) : (
        <Wrapper>
          <Image src={data?.image} />
          <div>
            <div
              style={{ fontSize: "25px", color: "#333", marginBottom: "40px" }}
            >
              {data?.title}
            </div>
            <div
              style={{ fontSize: "16px", color: "#555", marginBottom: "30px" }}
            >
              {data?.description}
            </div>
            <div
              style={{
                fontSize: "20px",
                color: "#007bff",
                marginBottom: "30px",
              }}
            >
              ${data?.price}
            </div>
            <Link className="link" to="/">
              <Button>← Назад</Button>
            </Link>

            <EditButton onClick={onClickEdit}>Редактировать</EditButton>
          </div>
        </Wrapper>
      )}
    </>
  );
};

export default ProductPage;

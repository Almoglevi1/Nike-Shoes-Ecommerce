import styled from "styled-components";
import Center from "./Center";
import ButtonLink from "./ButtonLink";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const Bg = styled.div`
  background-color:#222;
  color:#fff;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin:0;
  font-weight:normal;
  font-size:1.5rem;
  @media screen and (min-width: 768px) {
    font-size:2.7rem;
  }
`;

const Desc = styled.p`
  color:#aaa;
  font-size:.8rem;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  img {
    max-width: 100%;
    max-height: 250px;
    display: block;
    margin: 0 auto;
  }
  div: nth-child(1) {
    order: 2;
  };
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    div: nth-child(1) {
      order: 0;
    }
    img {
      max-width: 100%;
    }
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

export default function Featured({ product }) {
  const { addProduct } = useContext(CartContext);
  function addFeaturedToCart() {
    addProduct(product._id);
  }

  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <Title>{product.title}</Title>
              <Desc>{product.description}</Desc>
              <ButtonsWrapper>
                <ButtonLink href={'/product/' + product._id} outline={1} white={1}>SHOP NOW</ButtonLink>
              </ButtonsWrapper>
            </div>
          </Column>
          <Column>
            <img src="https://almog-next-ecommerce.s3.amazonaws.com/1705852848124.jpg" />
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
} 
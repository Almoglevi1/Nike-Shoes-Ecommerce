import styled from "styled-components";
import Button from "./Button";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "./CartContext";

const ProductWrapper = styled.div``;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 150px;
  }
  background-color: #f5f5f5;
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: .9rem;
  color: inherit;
  text-decoration: none;
  margin: 0;
`;

const TitleDiv = styled.div`
  height: 40px;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: block;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight: 600;
  text-align: right;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight: 600;
    text-align: left;
  }
`;

const StyledA = styled.a`
  text-decoration: none;
  color: inherit;
  width: 100%;
`;

export default function ProductBox({ _id, title, description, price, images }) {
  const { addProduct } = useContext(CartContext);
  const url = '/product/' + _id;
  const [currentImage, setCurrentImage] = useState(images?.[0]);
  const [imageInterval, setImageInterval] = useState(null);

  useEffect(() => {
    return () => {
      // Clean up the interval on component unmount
      if (imageInterval) clearInterval(imageInterval);
    };
  }, [imageInterval]);

  const startImageSwap = () => {
    let imageIndex = 0;
    setImageInterval(
      setInterval(() => {
        imageIndex = (imageIndex + 1) % images.length;
        setCurrentImage(images[imageIndex]);
      }, 1000)
    );
  };

  const stopImageSwap = () => {
    if (imageInterval) clearInterval(imageInterval);
    setImageInterval(null);
    setCurrentImage(images?.[0]); // Reset to the first image
  };

  return (
    <ProductWrapper>
      <WhiteBox href={url}
        onMouseEnter={startImageSwap}
        onMouseLeave={stopImageSwap}>
        <div>
          <img src={currentImage} alt="" />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <TitleDiv>
          <Title href={url}>{title}</Title>
        </TitleDiv>
        <PriceRow>
          <Price>
            ${price}
          </Price>
          <StyledA href={url}>
            <Button block primary outline>
              Shop Now
            </Button>
          </StyledA>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
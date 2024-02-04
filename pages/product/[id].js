import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import {
  ColWrapper,
  ContentWrapper,
  FooterWrapper,
  PageContainer,
  Price,
  PriceRow,
  SizeRow,
  SizeSelect,
  moveToCartBigScreen,
  moveToCartSmallScreen,
} from "@/components/styles/IdStyles";

export default function ProductPage({ product }) {
  const { addProduct } = useContext(CartContext);
  const [animate, setAnimate] = useState(false);
  const Sizes = product.properties.Size.split(" ").map((size) =>
    size.replace(/([a-zA-Z])(\d)/g, "$1 $2")
  );
  const [selectedSize, setSelectedSize] = useState(Sizes[0]); // initialize with the first size

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  const AnimatedButton = styled(Button)`
    &.animate {
      animation: ${(props) =>
      props.windowWidth > 768 ? moveToCartBigScreen : moveToCartSmallScreen}
        1s forwards;
    }
  `;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <PageContainer>
        <Header />
        <ContentWrapper>
          <Center>
            <ColWrapper>
              <WhiteBox>
                <ProductImages images={product.images} />
              </WhiteBox>
              <div>
                <Title>{product.title}</Title>
                <p>{product.description}</p>
                <p>
                  {" "}
                  <strong>Model: </strong>
                  {product.properties.Model}
                </p>
                <p>
                  {" "}
                  <strong>Color: </strong>
                  {product.properties.Color}
                </p>
                <p>
                  {" "}
                  <strong>Gender: </strong>
                  {product.properties.Gender}
                </p>
                <SizeRow>
                  <strong>Select Size</strong>
                  <SizeSelect
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                  >
                    {Sizes.map((size, index) => (
                      <option key={index} value={size}>
                        {size}
                      </option>
                    ))}
                  </SizeSelect>
                </SizeRow>
                <PriceRow>
                  <div>
                    <Price>${product.price}</Price>
                  </div>
                  <div>
                    <AnimatedButton
                      primary
                      onClick={() => {
                        addProduct({ _id: product._id, size: selectedSize });
                        if (windowWidth > 768) {
                          setAnimate(true);
                        }
                      }}
                      onAnimationEnd={() => setAnimate(false)}
                      className={animate && windowWidth > 768 ? "animate" : ""}
                    >
                      <CartIcon />
                      Add to cart
                    </AnimatedButton>
                  </div>
                </PriceRow>
              </div>
            </ColWrapper>
          </Center>
        </ContentWrapper>
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </PageContainer>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
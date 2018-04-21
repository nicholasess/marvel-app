import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 400px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 25px;
`;

const Description = styled.p`
  font-size: 16px;
  text-align: center;
`;

const Image = styled.div`
  width: 200px;
  height: 200px;
  background-image: url(${({ pathname }) => pathname});
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
`;

export default ({ char }) => (
  <Container>
    <Image pathname={`${char.thumbnail.path}.${char.thumbnail.extension}`} />
    <Title>{char.name}</Title>
    <div>
      <Description>{char.description}</Description>
    </div>
  </Container>
);

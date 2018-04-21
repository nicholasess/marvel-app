import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${({ active }) => (active ? "#2d3436" : "white")};
  color: ${({ active }) => (active ? "white" : "#2d3436")};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Title = styled.span`
  font-size: 16px;
`;

const Count = styled.span`
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 2px;
  padding-bottom: 2px;
  font-size: 16px;
  background-color: #d63031;
  color: white;
  margin-left: 10px;
  border-radius: 10px;
`;

export default ({ active, title, total, onClick }) => (
  <Container onClick={onClick} active={active}>
    <Title>{title}</Title>
    <Count>{getTotal(total)}</Count>
  </Container>
);

const getTotal = total => (total > 1000 ? `${parseInt(total / 1000)}k` : total);

import React from "react";
import styled from "styled-components";
import ReactLoading from "react-loading";

const LoadingPage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
`;

export default () => (
  <LoadingPage>
    <ReactLoading type={"spin"} color="#2d3436" />
  </LoadingPage>
);

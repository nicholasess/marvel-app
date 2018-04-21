import React, { Component } from "react";
import styled from "styled-components";
import LoadingPage from "../components/loadingpage";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import getMarvelResponse from "../helpers/service";

const Header = styled.div`
  width: 100%;
  height: 200px;
  background-color: #d63031;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 30px;
  color: #fff;
`;

const Container = styled.div`
  width: 1040px;
  margin: 0 auto;
  margin-top: 30px;
`;

const ItemContainer = styled.div`
  background-color: #2d3436;
  border-bottom: 1px solid #fff;
  width: 100%;
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
  &:first-child {
    margin-top: 50px;
  }
  &:last-child {
    margin-bottom: 200px;
  }
`;

const ItemTitleContainer = styled.div`
  height: 50px;
  width: calc(100% - 20px);
  color: #fff;
  font-size: 16px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  cursor: pointer;
`;

const ItemContent = styled.div`
  width: calc(100% - 20px);
  min-height: 200px;
  background-color: #fff;
  padding-left: 20px;
  padding-top: 20px;
  display: ${({ active }) => (active ? "flex" : "none")};
  transition: 1s;
  flex-direction: column;
`;

const List = styled.ul`
  padding: 0;
  a {
    color: black;
    display: block;
    font-size: 18px;
    margin-bottom: 10px;
  }
`;

const ItemListTitle = styled.span`
  font-size: 16px;
  color: #7a7a7a;
`;

class Home extends Component {
  state = {
    comics: [],
    loading: true
  };
  async componentWillMount() {
    const comics = await getMarvelResponse("comics");

    this.setState({
      loading: false,
      comics: comics.data.results
        .filter(item => item.characters.items.length > 0)
        .map(item => {
          item = { ...item, ...{ active: false } };
          item.characters.items = item.characters.items.map(item => {
            item = { ...item };
            item.id = item.resourceURI.split("/")[6];
            return item;
          });
          return item;
        })
    });
  }

  openItem = index => {
    let { comics } = this.state;
    comics[index].active = !comics[index].active;
    this.setState({ comics });
  };

  render() {
    let { loading, comics } = this.state;

    if (loading) {
      return <LoadingPage />;
    }

    return (
      <div>
        <Header>
          <Title>Welcome to the Marvel App</Title>
        </Header>
        <Container>
          Revistas
          {comics.map((item, index) => (
            <ItemContainer key={item.id}>
              <ItemTitleContainer onClick={() => this.openItem(index)}>
                {item.title}
              </ItemTitleContainer>
              <ItemContent active={item.active}>
                <ItemListTitle>Personagens</ItemListTitle>
                <List>
                  {item.characters.items.map(char => (
                    <Link key={char.id} to={`/p/${char.id}`}>
                      {char.name}
                    </Link>
                  ))}
                </List>
              </ItemContent>
            </ItemContainer>
          ))}
        </Container>
      </div>
    );
  }
}

export default Home;

import React, { Component } from "react";
import styled from "styled-components";
import LoadingPage from "../components/loadingpage";
import Service from "../helpers/service";
import { Link } from "react-router-dom";
import ContainerChar from "../components/containerchar";
import Tab from "../components/tab";
const Container = styled.div`
  width: 960px;
  min-height: 600px;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 100px;
`;

const BackButton = styled.span`
  font-size: 14px;
  cursor: pointer;
  &:before {
    content: "←  ";
  }
`;

const Tabs = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid #7a7a7a;
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

const Content = styled.div`
  width: calc(100% - 20px);
  padding: 10px;
  min-height: 300px;
  background-color: #fff;
`;

export default class Profile extends Component {
  state = {
    char: {},
    loading: true,
    activeTab: 1
  };
  async componentWillMount() {
    const char = await Service.get(`characters/${this.props.match.params.id}`);
    console.log(char.data.results[0]);
    this.setState({ char: char.data.results[0], loading: false });
  }

  selectedItem = tab => this.setState({ activeTab: tab });

  render() {
    let { loading, char, activeTab } = this.state;

    if (loading) {
      return <LoadingPage />;
    }

    return (
      <Container>
        <BackButton onClick={() => this.props.history.goBack()}>
          Voltar a Home
        </BackButton>

        <ContainerChar char={char} />
        <Tabs>
          <Tab
            onClick={() => this.selectedItem(1)}
            active={activeTab === 1}
            title="Revistinhas"
            total={char.comics.available}
          />
          <Tab
            active={activeTab === 2}
            onClick={() => this.selectedItem(2)}
            title="Séries"
            total={char.series.available}
          />
          <Tab
            active={activeTab === 3}
            onClick={() => this.selectedItem(3)}
            title="Histórias"
            total={char.stories.available}
          />
        </Tabs>
        {activeTab == 1 ? (
          <Content>
            <List>
              {char.comics.items.map((item, index) => <p>{item.name}</p>)}
            </List>
          </Content>
        ) : null}
        {activeTab == 2 ? (
          <Content>
            <List>
              {char.series.items.map((item, index) => <p>{item.name}</p>)}
            </List>
          </Content>
        ) : null}
        {activeTab == 3 ? (
          <Content>
            <List>
              {char.stories.items.map((item, index) => <p>{item.name}</p>)}
            </List>
          </Content>
        ) : null}
      </Container>
    );
  }
}

import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import LoadingPage from "../components/loadingpage";
import getMarvelResponse from "../helpers/service";
import ContainerChar from "../components/containerchar";
import Tab from "../components/tab";
const Container = styled.div`
  width: 960px;
  min-height: 600px;
  margin: 0 auto;
  margin-top: 30px;
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
`;

export default class Profile extends Component {
  state = {
    char: {},
    loading: true,
    activeTab: 1
  };
  async componentWillMount() {
    const char = await getMarvelResponse(
      `characters/${this.props.match.params.id}`
    );
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
      </Container>
    );
  }
}

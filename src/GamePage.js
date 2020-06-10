import React, { Component } from "react";
import "./GamePage.css";
import {
  Button,
  Icon,
  NavItem,
  Row,
  Col,
  Card,
  Chip,
  Preloader
} from "react-materialize";

class GamePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      player1: "",
      massPlayer1: "",
      player2: "",
      player1Won: false,
      player2Won: false
    };
  }

  componentDidMount() {
    this.getStarships();
  }

  getReplay = () => {
    this.getStarships();
  };

  getStarships = () => {
    this.setState({
      isLoading: true
    });
    return fetch("https://swapi.dev/api/starships/?format=json")
      .then(response => response.json())
      .then(json => {
        const newResults = json.results;

        const newPlayers = newResults.map(element => [
          element.name,
          element.MGLT,
          element.cargo_capacity,
          element.consumables,
          element.cost_in_credits,
          element.crew,
          element.hyperdrive_rating,
          element.length,
          element.manufacturer,
          element.max_atmosphering_speed,
          element.model,
          element.passengers,
          element.starship_class
        ]);
        const newPlayer1 = newResults.map(element => [
          element.name,
          element.MGLT,
          element.cargo_capacity,
          element.consumables,
          element.cost_in_credits,
          element.crew,
          element.hyperdrive_rating,
          element.length,
          element.manufacturer,
          element.max_atmosphering_speed,
          element.model,
          element.passengers,
          element.starship_class
        ]);
        const newPlayer2 = newResults.map(element => [
          element.name,
          element.MGLT,
          element.cargo_capacity,
          element.consumables,
          element.cost_in_credits,
          element.crew,
          element.hyperdrive_rating,
          element.length,
          element.manufacturer,
          element.max_atmosphering_speed,
          element.model,
          element.passengers,
          element.starship_class
        ]);

        //random results for display
        newPlayers.forEach((index, array) => {
          const randomPlayer1 = newPlayer1[Math.floor(Math.random() * newPlayer1.length)];
          const randomPlayer2 = newPlayer2[Math.floor(Math.random() * newPlayer2.length)];

          if (randomPlayer1 > randomPlayer2) {
            if (randomPlayer1 !== randomPlayer2) {
              console.log("Player1 win ");
              this.setState({
                player1Won: true,
                player2Won: false
              });
            }
          }

          if (randomPlayer1 < randomPlayer2) {
            if (randomPlayer2 !== randomPlayer1) {
              console.log("Player1 win ");
              this.setState({
                player2Won: true,
                player1Won: false
              });
            }
          } else {
            console.log(
              "Two players can play, please reload a new game"
            );
          }

          this.setState({
            starships: array,
            isLoading: false,
            player1: randomPlayer1,
            player2: randomPlayer2
          });
        });
      })
      .catch(error => {
        // Error!!!
        this.setState({
          isLoading: false
        });
      });
  };

  render() {
    const {
      starships,
      isLoading,
      player1,
      player2,
      player1Won,
      player2Won
    } = this.state;

    if (isLoading) {
      return (
        <Row>
          <Col s={12}>
            <Preloader flashing />
          </Col>
        </Row>
      );
    }
	console.log(starships)
    
    return (

      <section className="App">
 		<div className="header-logo"></div>
        {isLoading ? (
          <Preloader size="small" />
        ) : (
          <Row>
            <Col s={6} className="grid-example">
              <Card
                className=""
                textClassName="white-text"
                title={`Player 1`}
              />
              <Card
                className="blue-grey darken-1 star-background"
                textClassName="white-text"
                title={`Name: ${player1}`}
              />

              {/* Chip */}
              {player1Won === true ? (
                <Chip>
                  <img src="account_circle_black.svg" alt={player1} />
                  Player 1 Won
                </Chip>
              ) : null}
            </Col>
            <Col s={6} className="grid-example">
              <Card
                className=""
                textClassName="white-text"
                title={`Player 2`}
              />
              <Card
                className="blue-grey darken-1 star-background"
                textClassName="white-text"
                title={`Name: ${player2}`}
              />
              {player2Won === true ? (
                <Chip>
                  <img src="account_circle_black.svg" alt={player2} />
                  Player 2 Won
                </Chip>
              ) : null}
            </Col>
          </Row>
        )}
        <Row>
          <Col s={12} className="grid-example">
            <Button className="buttonRefresh" onClick={() => this.getReplay()}>
              Play Again<Icon right>refresh</Icon>
            </Button>
          </Col>
        </Row>
      </section>
    );
  }
}

export default GamePage;

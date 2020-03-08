import React, { Component } from "react";
import "./Home.css";
import { Container, Card, Form, Col, Button } from "react-bootstrap";
import NavBar from "../../components/NavBar/NavBar";
import Variable from "../../components/Variable/Variable";
import Constraint from "../../components/Contraint/Constraint";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputVariablesValue: 2,
      inputConstraintsValue: 2,
      variables: 2,
      constraints: 2,
      variablesValues: []
    };

    this.onLPOptionsFormSubmitted = this.onLPOptionsFormSubmitted.bind(this);
    this.onLPFormSubmitted = this.onLPFormSubmitted.bind(this);
    this.onVariablesChange = this.onVariablesChange.bind(this);
    this.onConstraintsChange = this.onConstraintsChange.bind(this);
  }

  onLPOptionsFormSubmitted(event) {
    event.preventDefault();

    this.setState({
      variables: this.state.inputVariablesValue,
      constraints: this.state.inputConstraintsValue,
      variablesValues:
        this.state.inputVariablesValue >= this.state.variables
          ? [
              ...this.state.variablesValues,
              ...new Array(
                this.state.inputVariablesValue - this.state.variables
              ).fill(0)
            ]
          : [
              ...this.state.variablesValues.slice(
                0,
                this.state.inputVariablesValue
              )
            ]
    });
  }

  onLPFormSubmitted(event) {
    event.preventDefault();

    console.log(this.state.variablesValues);
  }

  onVariablesChange(event) {
    const numValue = parseInt(event.target.value, 10);

    if (!isNaN(numValue) && numValue > 0)
      this.setState({ inputVariablesValue: numValue });
  }

  onConstraintsChange(event) {
    const numValue = parseInt(event.target.value, 10);

    if (!isNaN(numValue) && numValue > 0)
      this.setState({
        inputConstraintsValue: numValue
      });
  }

  onObjectiveFunctionVariableChanged(event, index) {
    const variablesValuesCopy = [...this.state.variablesValues];

    variablesValuesCopy[index] = parseInt(event.target.value, 10);

    this.setState({
      variablesValues: variablesValuesCopy
    });
  }

  render() {
    return (
      <div>
        <NavBar />
        <Container>
          <Card className="text-center mt-4">
            <Card.Header>Options</Card.Header>
            <Card.Body className="text-left">
              <Form>
                <Form.Group>
                  <Form.Label>Method</Form.Label>
                  <Form.Control as="select">
                    <option>Simplex</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
          <Card className="text-center mt-4">
            <Card.Header>Linear Program Options</Card.Header>
            <Card.Body className="text-left">
              <Form onSubmit={this.onLPOptionsFormSubmitted}>
                <Form.Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Total Variables</Form.Label>
                      <Form.Control
                        type="number"
                        value={this.state.inputVariablesValue}
                        onChange={this.onVariablesChange}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Total Constraints</Form.Label>
                      <Form.Control
                        type="number"
                        value={this.state.inputConstraintsValue}
                        onChange={this.onConstraintsChange}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Form.Row>
                <Button type="submit" variant="primary">
                  Apply
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <Card className="text-center mt-4">
            <Card.Header>Linear Program</Card.Header>
            <Card.Body className="text-left">
              <Form onSubmit={this.onLPFormSubmitted}>
                <Form.Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Objective Function</Form.Label>
                    </Form.Group>
                  </Col>
                </Form.Row>
                <Form.Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Z = </Form.Label>
                    </Form.Group>
                  </Col>
                  {new Array(this.state.variables)
                    .fill(0)
                    .map((_, index) => index)
                    .map(num => (
                      <Variable
                        key={num.toString()}
                        number={num}
                        onChange={event =>
                          this.onObjectiveFunctionVariableChanged(event, num)
                        }
                      />
                    ))}
                </Form.Row>
                <Form.Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Subject to constraints</Form.Label>
                    </Form.Group>
                  </Col>
                </Form.Row>
                {new Array(this.state.constraints)
                  .fill(0)
                  .map((_, index) => index)
                  .map(num => (
                    <Constraint
                      key={num.toString()}
                      variablesNum={this.state.variables}
                    ></Constraint>
                  ))}
                <Button type="submit" variant="primary">
                  Solve
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}

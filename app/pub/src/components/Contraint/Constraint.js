import React, { Component } from "react";
import { Form, Col, Row } from "react-bootstrap";

import Variable from "../../components/Variable/Variable";

export default class Constraint extends Component {
  constructor(props) {
    super(props);
  }

  onVariableChanged(event, index) {
    console.log(this.props);
  }

  render() {
    return (
      <Form.Row>
        <Col>
          <Form.Group>
            <Form.Label></Form.Label>
          </Form.Group>
        </Col>
        {new Array(this.props.variablesNum)
          .fill(0)
          .map((_, index) => index)
          .map(num => (
            <Variable
              key={num.toString()}
              number={num}
              onChange={event => this.onVariableChanged(event)}
            />
          ))}
        <Col>
          <Form.Group>
            <Row>
              <Col>
                <Form.Control as="select">
                  <option>=</option>
                </Form.Control>
              </Col>
              <Col>
                <Form.Control type="number"></Form.Control>
              </Col>
            </Row>
          </Form.Group>
        </Col>
      </Form.Row>
    );
  }
}

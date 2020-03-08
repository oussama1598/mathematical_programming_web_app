import React, { Component } from "react";
import { Form, Col, Row } from "react-bootstrap";

export default class Variable extends Component {
  render() {
    return (
      <Col>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="number"
                onChange={this.props.onChange}
              ></Form.Control>
            </Col>
            <Col>
              <Form.Label className="col-form-label">
                X{this.props.number}
              </Form.Label>
            </Col>
          </Row>
        </Form.Group>
      </Col>
    );
  }
}

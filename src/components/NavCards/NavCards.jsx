import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

import "./NavCards.css";
const NavCard = (props) => {
  const { link, header, body } = props;
  return (
    <Card className="card" style={{ width: "18rem" }} bg="light" border="light">
      <Link to={link}>
        <Card.Header> {header} </Card.Header>
        <Card.Body>
          <Card.Text>{body}</Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
};
export default NavCard;

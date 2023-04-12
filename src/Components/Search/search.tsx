import React, { useRef, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { ReturnRandomCountriesProp } from "../../App";

const Search = (props: ReturnRandomCountriesProp) => {
  const { returnRandomCountries } = props;

  const handleSubmit = (_e: any) => {
    _e.preventDefault();
    returnRandomCountries();
  };
  return (
    <div>
      <Card className="search-card">
        <Card.Body>
          <h2 className="text-center">Start Quiz!</h2>
          <Form onSubmit={handleSubmit}>
            <Button className="w-100 mt-2" type="submit">
              GO
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Search;

import React, { useRef, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";

const Search = () => {
  const nationRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (_e: any) => {
    _e.preventDefault();
    console.log(nationRef.current?.value);
  };
  return (
    <div>
      <Card>
        <Card.Body>
          <h2>Search a Nation</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="nation" className="text-center">
              <Form.Label>Nation</Form.Label>
              <Form.Control type="nation" ref={nationRef} />
            </Form.Group>
            <Button className="w-100 mt-2" type="submit">
              Search
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Search;

import React, { useState } from "react";
import { Button, Container, Nav, Navbar, Form } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";

export default function MainNav() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  function updatingSearchValue(event) {
    setSearchValue(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    router.push(`/artwork?title=true&q=${searchValue}`);
    setSearchValue("");
  }

  return (
    <>
      <Navbar expand="lg" className="bg-dark navbar-dark fixed-top nav-bar">
        <Container>
          <Navbar.Brand>Jason Shin</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto my-2 my-lg-0">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link>Home</Nav.Link>
              </Link>
              <Link href="/search" passHref legacyBehavior>
                <Nav.Link>Advanced Search</Nav.Link>
              </Link>
            </Nav>
            <Form className="d-flex" onSubmit={handleSubmit}>
              <Form.Control
                onChange={updatingSearchValue}
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="success" type="submit">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}

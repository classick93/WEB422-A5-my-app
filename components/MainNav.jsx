import React, { useState } from "react";
import { Button, Container, Nav, Navbar, Form } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";

export default function MainNav() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  function updatingSearchValue(event) {
    setSearchValue(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsExpanded(false);
    router.push(`/artwork?title=true&q=${searchValue}`);
    let queryString = `title=true&q=${searchValue}`;
    setSearchHistory((current) => [...current, queryString]);
  }

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const linkClick = () => {
    setIsExpanded(false);
  };

  return (
    <>
      <Navbar
        expand="lg"
        expanded={isExpanded}
        className="bg-dark navbar-dark fixed-top nav-bar"
      >
        <Container>
          <Navbar.Brand>Jason Shin</Navbar.Brand>
          <Navbar.Toggle
            onClick={handleToggle}
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link href="/" passHref legacyBehavior>
                <Nav.Link active={router.pathname === "/"} onClick={linkClick}>
                  Home
                </Nav.Link>
              </Link>
              <Link href="/search" passHref legacyBehavior>
                <Nav.Link
                  active={router.pathname === "/search"}
                  onClick={linkClick}
                >
                  Advanced Search
                </Nav.Link>
              </Link>
            </Nav>
            &nbsp;
            <Form className="d-flex" onSubmit={handleSubmit}>
              <Form.Control
                value={searchValue}
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
            &nbsp;
            <Nav>
              <NavDropdown title="User Name" id="basic-nav-dropdown">
                <Link href="/favourites" passHref legacyBehavior>
                  <NavDropdown.Item
                    active={router.pathname === "/favourites"}
                    onClick={linkClick}
                  >
                    Favourites
                  </NavDropdown.Item>
                </Link>
                <Link href="/history" passHref legacyBehavior>
                  <NavDropdown.Item
                    active={router.pathname === "/history"}
                    onClick={linkClick}
                  >
                    History
                  </NavDropdown.Item>
                </Link>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br /> <br />
    </>
  );
}

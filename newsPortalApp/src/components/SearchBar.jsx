import {
  Stack,
  Button,
  Row,
  Col,
  Form,
  InputGroup,
  Card,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";

function SearchBar() {
  const categories = [
    "Terbaru",
    "News",
    "Market",
    "Entrepreneur",
    "Syariah",
    "Tech",
    "Lifestyle",
    "Opini",
  ];

  return (
    <>
      <Form className="pt-4 m-3">
        <Row className="justify-content-center">
          <Col xs="10" sm="6" className="my-1">
            <Form.Label htmlFor="inlineFormInputGroupUsername" visuallyHidden>
              Search News
            </Form.Label>
            <InputGroup>
              <Form.Control
                id="inlineFormInputGroupUsername"
                placeholder="Search News"
              />
            </InputGroup>
          </Col>
          <Col
            xs="4"
            sm="3"
            md="2"
            className="my-1 d-flex justify-content-center"
          >
            <Button type="submit" className="w-100">
              Search
            </Button>
          </Col>
        </Row>
      </Form>
      <div className="text-center text-light pt-3">
        <h6 className="w-50 p-2 fw-bold  border-1 border bg-success m-auto">
          SEARCH BY CATEGORIES
        </h6>
      </div>
      <Stack
        direction="horizontal"
        gap={3}
        className="categoriesNav p-3 justify-content-center flex-wrap"
      >
        {categories.map((category, index) => {
          return (
            <NavLink
              key={index}
              to={"/categories/" + encodeURI(category.toLowerCase())}
            >
              {category}
            </NavLink>
          );
        })}
      </Stack>
    </>
  );
}

export default SearchBar;

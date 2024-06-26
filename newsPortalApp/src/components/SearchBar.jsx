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

function SearchBar({
  categories = null,
  setQuery = null,
  arr = null,
  setPage,
}) {
  //console.log(categories);

  const onSearch = (e) => {
    e.preventDefault();

    return setQuery(document.getElementById("searchField").value);
  };
  const onSearchIsNull = (e) => {
    if (e.target.value === "") {
      setPage(1);
      return setQuery("");
    }
  };

  return (
    <>
      <Form onSubmit={onSearch} className="pt-4 m-3">
        <Row className="justify-content-center">
          <Col xs="10" sm="6" className="my-1">
            <Form.Label htmlFor="searchField" visuallyHidden>
              Search News
            </Form.Label>
            <InputGroup>
              <Form.Control
                id="searchField"
                placeholder="Search News"
                onChange={onSearchIsNull}
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
      {categories && (
        <div className="text-center text-light pt-3">
          <h6 className="w-50 p-2 fw-bold  border-1 border bg-success m-auto">
            SEARCH BY CATEGORIES
          </h6>
        </div>
      )}
      <Stack
        direction="horizontal"
        gap={3}
        className="categoriesNav p-3 justify-content-center flex-wrap"
      >
        {categories?.map((category, index) => {
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

import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import dateConvert from "../utils/convertDate.js";
import { Button, Card } from "react-bootstrap";
import axiosClient from "../api/axiosClient";
import NewsPagination from "./NewsPagination";

const NewsSearchByCategories = () => {
  let params = useParams();
  const [newsByCategory, setNewsByCategory] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const limit = 10;

  React.useEffect(() => {
    const apiLokal = function () {
      if (params.category === "") return setNewsByCategory();
      return axiosClient
        .get(`${params.category}`)
        .then((res) => res.data)
        .then((data) => {
          setNewsByCategory(data.data.posts);
          setTotalPages(Math.round(data.data.posts.length / limit));
        })

        .catch((err) => console.log(err))
        .finally(() => console.log("executed!"));
    };
    apiLokal();
  }, [params.category, page]);

  const handleChangePage = useCallback((page) => {
    setPage(page);
  }, []);

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-center gap-2">
        {newsByCategory ? (
          newsByCategory.map((news, idx) => {
            idx++;
            if (idx <= page * limit && idx > (page - 1) * limit) {
              {
                /* console.log(
                idx,
                page * limit,
                idx,
                (page - 1) * limit,
                newsByCategory.length,
                totalPages
              ); */
              }
              return (
                <Card className="newsCardCategories" key={idx}>
                  <Card.Img variant="top" src={news.thumbnail} />
                  <Card.Body className="cardBody">
                    <Card.Title>{news.title}</Card.Title>
                    <Card.Text>{news.description}</Card.Text>
                    <div className="text-center">
                      <Button
                        className="pl-4"
                        variant="primary"
                        href={news.link}
                      >
                        Read More
                      </Button>{" "}
                      <Card.Text>
                        {" "}
                        Published at {dateConvert(news.pubDate)} {idx}
                      </Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              );
            }
          })
        ) : (
          <div className="text-center mt-5">Loading . . .</div>
        )}
      </div>
      <NewsPagination
        className="mb-0 "
        onChangePage={handleChangePage}
        current={page}
        totalPages={totalPages}
      />
    </div>
  );
};

export default NewsSearchByCategories;

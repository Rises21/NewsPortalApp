import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import NewsPagination from "../components/NewsPagination";
import { Button, Card } from "react-bootstrap";

const SavedNewsPage = () => {
  const { userAuth, cbAuth, token } = useOutletContext();
  // console.log(userAuth, "user..");
  const [news, setNews] = useState();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 10;

  const fetchSavedNews = async () => {
    try {
      const res = await axios.get("http://localhost:3002/savedNews", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNews(res.data.data);
      setTotalPages(Math.round(res.data.data.length / limit));
      console.log(res, "resss...");
    } catch (err) {
      console.log(err.response);
    }
  };
  useEffect(() => {
    fetchSavedNews();
  }, [news, page]);

  const handleChangePage = useCallback((page) => {
    setPage(page);
  }, []);
  return (
    <div>
      <div className="d-flex flex-wrap justify-content-center gap-2">
        {news ? (
          news?.map((newss, idx) => {
            idx++;
            if (idx <= page * limit && idx > (page - 1) * limit) {
              console.log(
                idx,
                page * limit,
                idx,
                (page - 1) * limit,
                news.length,
                totalPages
              );
              return (
                <Card className="newsCardCategories" key={idx}>
                  <Card.Img variant="top" src={newss.thumbnail} />
                  <Card.Body className="cardBody">
                    <Card.Title>{newss.title}</Card.Title>
                    <Card.Text>{newss.description}</Card.Text>
                    <div className="text-center">
                      <Button
                        className="pl-4"
                        variant="primary"
                        href={newss.link}
                      >
                        Read More
                      </Button>{" "}
                      <Card.Text>
                        {" "}
                        Published at {dateConvert(newss.pubDate)} {idx}
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

export default SavedNewsPage;

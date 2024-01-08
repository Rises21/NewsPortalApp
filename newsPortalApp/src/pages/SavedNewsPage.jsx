import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import NewsPagination from "../components/NewsPagination";
import { Button, Card } from "react-bootstrap";
import dateConvert from "../utils/convertDate.js";

const SavedNewsPage = () => {
  const navigate = useNavigate();
  const { token } = useOutletContext();
  const [isLoading, setIsLoading] = useState(false);
  const [news, setNews] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 9;

  const fetchSavedNews = async () => {
    try {
      setIsLoading(true);
      setTimeout(async () => {
        const res = await axios.get("http://localhost:3002/savedNews", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!token) return navigate("/login", { replace: true });
        setNews(res.data);
        setTotalPages(Math.round(res.data.length / limit));
      }, 2000);
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) setIsLogin(false);
      if (err.response.status === 403) navigate("/login");
    }
  };

  const tester = (e) => {
    e.preventDefault();
    console.log(news);
  };

  useEffect(() => {
    {
      token && fetchSavedNews();
    }
  }, [token, isLoading]);

  const handleChangePage = useCallback((page) => {
    setPage(page);
  }, []);
  return (
    <div>
      <div className="d-flex flex-wrap justify-content-center gap-2">
        {news &&
          news?.map((newss, idx) => {
            idx++;
            if (idx <= page * limit && idx > (page - 1) * limit) {
              return (
                <Card className="newsCardCategories" key={idx}>
                  <Card.Img variant="top" src={newss.thumbnail} />
                  <Card.Body className="cardBody">
                    <Card.Title>{newss.title}</Card.Title>
                    <Card.Text>{newss.description}</Card.Text>
                    <div className="text-center">
                      <Button
                        className="pl-4 mx-2"
                        variant="primary"
                        href={newss.link}
                      >
                        Read more
                      </Button>
                      <Button
                        className="pl-4 mx-2"
                        variant="danger"
                        href={newss.link}
                        onClick={tester}
                      >
                        Delete from saved
                      </Button>
                      <Card.Text className="mt-2">
                        Published at {dateConvert(newss.pubDate)} {idx}
                      </Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              );
            }
          })}
        {isLoading && !news && (
          <h4 className="text-center mt-5">Loading . . .</h4>
        )}
        {!isLoading && !token && (
          <h3 className="text-center py-5 mt-5">
            Please Login to use this feature.
          </h3>
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

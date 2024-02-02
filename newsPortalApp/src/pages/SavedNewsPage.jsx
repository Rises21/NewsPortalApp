import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import NewsPagination from "../components/NewsPagination";
import { Button, Card } from "react-bootstrap";
import dateConvert from "../utils/convertDate.js";
import useFetch from "../api/customHooks/useFetch.js";
import SearchBar from "../components/SearchBar.jsx";

const SavedNewsPage = () => {
  const navigate = useNavigate();
  const { isLogin } = useOutletContext();
  const { userAuth, token, expire } = useFetch("http://localhost:3002/token");
  const [isLoading, setIsLoading] = useState(false);
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 9;
  //console.log(news, "<<<", isLogin, ">>>", isLoading, "??", Boolean(!!token));

  const [query, setQuery] = useState("");
  const filteredSearch = [];
  const filteredNews = (arr, query) => {
    return arr.filter((item) => {
      if (item.title.toLowerCase().includes(query.toLowerCase())) {
        filteredSearch.push(item);
        console.log(filteredSearch);
      }
    });
  };
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
        if (news[0] === undefined) setIsLoading(false);
      }, 2000);
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) setIsLogin(false);
      if (err.response.status === 403) navigate("/login");
    }
  };

  useEffect(() => {
    {
      token && isLogin && fetchSavedNews();
    }
  }, [token, isLogin]);

  const handleChangePage = useCallback((page) => {
    setPage(page);
  }, []);
  return (
    <div>
      <p>{query}</p>
      {token && <SearchBar setQuery={setQuery} />}
      {query && filteredNews(news, query)}
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
                      >
                        Delete from saved
                      </Button>
                      <Card.Text className="mt-2">
                        Published at {dateConvert(newss.pubDate)}
                      </Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              );
            }
          })}
        {isLoading && <h4 className="text-center mt-5">Loading . . .</h4>}
        {!isLoading && isLogin && news[0] === undefined && (
          <h4 className="text-center mt-5">
            Empty Saved News, lets read another one and save it.
          </h4>
        )}
        {!isLogin && !token && (
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

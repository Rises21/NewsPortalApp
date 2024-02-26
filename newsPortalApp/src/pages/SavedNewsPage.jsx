import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import NewsPagination from "../components/NewsPagination";
import { Button, Card, Fade } from "react-bootstrap";
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
  const [delMsg, setDelMsg] = useState("");
  const limit = 9;
  //console.log(news, "<<<", isLogin, ">>>", isLoading, "??", Boolean(!!token));

  const [query, setQuery] = useState("");
  const filteredSearch = [];
  const filteredNews = (arr, query) => {
    arr.filter((item) => {
      if (
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      ) {
        filteredSearch.push(item);
        console.log(filteredSearch);
      }
    });

    setNews(filteredSearch);
    setTotalPages(Math.ceil(filteredSearch.length / limit));
    setPage(totalPages);

    if (news.length) setIsLoading(false);
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
        setTotalPages(Math.ceil(res.data.length / limit));
        console.log(res.status, res.statusText);
        if (news[0] === undefined && res.status === 200) setIsLoading(false);
      }, 2000);
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) setIsLogin(false);
      if (err.response.status === 403) navigate("/login");
    }
  };

  const handleDelete = async (id) => {
    try {
      const delNews = await axios.delete("http://localhost:3002/savedNews", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          id: id,
        },
      });
      //console.log(id, "???", news.length);
      if (delNews.status) {
        fetchSavedNews();
        setDelMsg("News has been Deleted.");

        setTimeout(() => {
          document.getElementById("delNews").classList.add("fadeOutNews");
          //setDelMsg("");
        }, 500);
        setTimeout(() => {
          setDelMsg("");
          // if (news.length === 0) {
          //   setIsLoading(false);
          // }
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePage = useCallback(
    (page) => {
      setPage(page);
    },
    [page]
  );

  useEffect(() => {
    {
      token && isLogin && !query && fetchSavedNews();
    }
    {
      query && filteredNews(news, query);
    }
    console.log(news);
    // console.log(filteredNews(news, query));
    //console.log(news.length);
  }, [token, isLogin, news.length, query, delMsg]);
  return (
    <div>
      {delMsg && (
        <Fade
          in={true}
          appear={true}
          id="delNews"
          className="alert alert-success position-fixed top-0 start-50 mt-2 z-3 text-center translate-middle-x container"
        >
          <div role="alert">
            <div className=" p-2">
              <h4>{delMsg}</h4>
            </div>
          </div>
        </Fade>
      )}
      {token && <SearchBar setQuery={setQuery} setPage={setPage} />}

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
                        onClick={() => handleDelete(newss._id)}
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
        {!isLoading && isLogin && !query && news[0] === undefined && (
          <h4 className="text-center mt-5">
            Empty Saved News, lets read another one and save it.
          </h4>
        )}
        {query && news[0] === undefined && (
          <h4 className="text-center mt-5">Not found news for that keyword.</h4>
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

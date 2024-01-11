import React, { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import dateConvert from "../utils/convertDate.js";
import { Button, Card } from "react-bootstrap";
import axiosClient from "../api/axiosClient";
import NewsPagination from "./NewsPagination";
import axios from "axios";

const NewsSearchByCategories = () => {
  let params = useParams();
  const [newsByCategory, setNewsByCategory] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const limit = 9;
  const [msg, setMsg] = useState("");

  const handleBookmark = async (e, news) => {
    e.preventDefault();
    console.log("exec");
    try {
      const res = await axios.post(
        "http://localhost:3002/savedNews",
        { ...news },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMsg(res.data.msg);
      console.log("exec 2");
      setTimeout(() => {
        setMsg(null);
      }, 3000);
    } catch (error) {
      console.log("exec 3", error);
      if (error.response) return setMsg(error.response.data.msg);
    }
  };

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
  }, [params.category, page, msg]);

  const handleChangePage = useCallback((page) => {
    setPage(page);
  }, []);

  return (
    <div>
      {msg && (
        <div
          id="successSavedNewsAlert"
          className="position-fixed  text-center m-auto w-100 mt-4"
        >
          <div className=" p-2 bg-success w-75 m-auto">
            <h4>{msg}</h4>
          </div>
        </div>
      )}
      <div className="d-flex flex-wrap justify-content-center gap-2">
        {newsByCategory ? (
          newsByCategory.map((news, idx) => {
            idx++;
            if (idx <= page * limit && idx > (page - 1) * limit) {
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
                      <Button
                        className="pl-4"
                        variant="primary"
                        href={news.link}
                        onClick={(e) => handleBookmark(e, news)}
                      >
                        Bookmark
                      </Button>{" "}
                      <Card.Text>
                        {" "}
                        Published at {dateConvert(news.pubDate)}
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

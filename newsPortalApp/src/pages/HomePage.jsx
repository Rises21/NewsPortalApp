import { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import SearchBar from "../components/SearchBar";
import axiosClient from "../api/axiosClient";
import { Outlet } from "react-router-dom";

function HomePage() {
  const [index, setIndex] = useState(0);
  const [news, setNews] = useState([]);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  const topHeadline = () =>
    axiosClient
      .get("terbaru")
      .then((res) => res.data)
      .then((data) => {
        let carouselNews = [];
        for (const idx in data.data.posts) {
          if (idx <= 4) {
            carouselNews.push(data.data.posts[idx]);
          }
        }
        setNews(carouselNews);
      })
      .catch((err) => console.log(err))
      .finally(() => console.log("executed!"));

  useEffect(() => {
    topHeadline();
  }, []);

  return (
    <div>
      <section className="heroSection position-relative d-flex justify-content-center align-items-center  z-1">
        <h2 className=" position-absolute top-50 border border-1 rounded-bottom-4 border-info p-3 px-5 f text-light bg-dark bg-opacity-25">
          Top Headline
        </h2>
      </section>
      {/* carousel here */}
      <div className="min-vh-100 bg-info position-relative">
        <Carousel activeIndex={index} onSelect={handleSelect}>
          {news.map((newsItem, indx) => (
            <Carousel.Item
              onClick={() => (window.location = newsItem.link)}
              key={indx}
              style={{
                minHeight: "500px",
                backgroundImage: `url(${newsItem.thumbnail})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                cursor: "pointer",
              }}
            >
              <Carousel.Caption>
                <h3>{newsItem.title}</h3>
                <p>{newsItem.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
        <div className="">
          <SearchBar />
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default HomePage;

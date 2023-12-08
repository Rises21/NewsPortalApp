const News = require("../models/newsModel");
const ImageToBase64 = require("image-to-base64");
const getPagination = require("../utils/getPagination");
const axios = require("axios");

const newsAPI = async function () {
  let { data } = await axios.get(
    `https://newsapi.org/v2/top-headlines?&country=id&apiKey=${process.env.NEWS_API_KEY}`
  );
  return data;
};

const takeNews = newsAPI();

const addNews = async (req, res, next) => {
  // newsAPI().then((data) => data.articles);
  console.log(takeNews, "<<<<<<<<<<<>>");
  // try {
  //   console.log(req.body, " <<<<   isi req.files");

  //   const news = await newsAPI.data.articles.map((article) => {
  //     console.log(article);
  //     //return News.create(article);
  //     //const { title, author, content, category, addToSlider } = article;
  //     //const base64Data = await ImageToBase64(req.files.newsImage.path);

  //     // const news = await News.create({
  //     //   title:,
  //     //   author,
  //     //   content,
  //     //   category,
  //     //   addToSlider,
  //     //   newsImage: `data: ${req.files.newsImage.type};base64:${base64Data}`,
  //     //   addedAt: Date.now(),
  //     // });
  //   });

  //   //console.log(news, "<><><><>");
  //   console.log(newsAPI, "<<<<<<<<<<<>>");
  //   if (news) {
  //     res.status(201).json({
  //       success: true,
  //       msg: "Successfully added news.",
  //       data: news,
  //     });
  //   } else {
  //     res.status(500).json({
  //       success: false,
  //       msg: "Invalid news data.",
  //     });
  //   }
  // } catch (err) {
  //   res.status(500).json({
  //     success: false,
  //     msg: "Server having some issues.",
  //   });
  // }
};

const getSavedAllNews = async (req, res, next) => {
  const pageSize = req.params.pageSize;
  const pageNum = req.params.pageNum;

  const { limit, offset } = getPagination(pageNum, pageSize);

  if (pageNum <= 0) {
    res.status(500).json({
      success: false,
      msg: "Invalid page number.",
    });
  }

  const news = await News.findById({ _id })
    .sort("-addedAt")
    .populate({ path: "category", select: ["_id", "category_name"] })
    .skip(offset)
    .limit(limit);

  if (news.length === 0) {
    res.status(200).json({
      success: true,
      msg: "Saved news is empty.",
      count: news.length,
    });
  } else if (news) {
    res.status(200).json({
      success: true,
      msg: "Success get all news.",
      count: news.length,
      offset,
      limit,
      data: news,
    });
  } else {
    res.status(500).json({
      success: false,
      msg: "Failed to load news data.",
    });
  }
};

const getAllNews = async (req, res, next) => {
  const pageSize = Number(req.params.pageSize);
  const pageNum = Number(req.params.pageNum) + 1;
  const searchQuery = req.params.keyword;
  console.log(process.env.NEWS_API_KEY, "KEYYYY22222");
  const { limit, offset } = getPagination(pageNum, pageSize);
  console.log(`limit: ${limit} => offset: ${offset}<<<<<<<<<`);
  if (pageNum <= 0) {
    res.status(500).json({
      success: false,
      msg: "Invalid page number.",
    });
  }

  const newsAPI = await axios.get(
    `https://newsapi.org/v2/top-headlines?&country=id&pageSize=${limit}&page=${offset}&apiKey=${process.env.NEWS_API_KEY}`
  );

  const news = await newsAPI.data.articles.map((arr) => arr.title);
  // axios
  //   .get(
  //     `https://newsapi.org/v2/everything?q=apple&apiKey=989548329dd94e968d3d9779c9310de3`
  //   )
  //   .then((res) => {
  //     return res.data.articles;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })
  //   .finally(() => {
  //     console.log("Second useEffect axios get executed <<<");
  //   });

  //console.log(news, "<>><><");
  // await News.find({})
  //   .sort("-addedAt")
  //   .populate({ path: "category", select: ["_id", "category_name"] })
  //   .skip(offset)
  //   .limit(limit);

  if (news.length === 0) {
    res.status(200).json({
      success: true,
      msg: "Saved news is empty.",
      count: news.length,
    });
  } else if (news) {
    res.status(200).json({
      success: true,
      msg: "Success get all news.",
      count: news.length,
      offset,
      limit,
      pageNum: pageNum - 1,
      pageSize,
      data: news,
    });
  } else {
    res.status(500).json({
      success: false,
      msg: "Failed to load news data.",
    });
  }
};

module.exports = {
  addNews,
  getAllNews,
  getSavedAllNews,
};

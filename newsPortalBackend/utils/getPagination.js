const getPagination = (pageNum, pageSize) => {
  const limit = pageSize ? +pageSize : 0;
  const offset = pageNum ? (pageNum - 1) * limit : 0;

  console.log(
    `pagenum: ${
      Number(pageNum) - 1
    } => pageSize ${pageSize} => limit: ${limit} => offset: ${offset}`
  );
  return { limit, offset };
};

module.exports = getPagination;

const dateConvert = (datee) => {
  const gmt = new Date(datee);
  return gmt.toLocaleString();
};

export default dateConvert;

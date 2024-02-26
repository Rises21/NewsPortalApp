import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  //console.log(authHeader, "<<<token>");

  if (token === null)
    return res.sendStatus(401).json({ msg: "news not saved, please login." });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
    console.log(decoded, "this is decoded");
    if (error) return res.json({ msg: "this is" });
    req.email = decoded.email; //nama variabel karena email disertakan didalam tokennya
    //console.log(req.email, "<<<?>");
    next();
  });
};

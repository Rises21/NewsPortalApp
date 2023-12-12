import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  //console.log(token, "<<<token>");

  if (token === null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
    console.log(decoded, "this is decoded");
    if (error) return res.sendStatus(403);
    req.email = decoded.email; //nama variabel karena email disertakan didalam tokennya
    console.log(req.email, "<<<?>");
    next();
  });
};

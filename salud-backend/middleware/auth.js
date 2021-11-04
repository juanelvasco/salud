const jwt = require("jsonwebtoken");

const config = process.env;

 const verifyToken = (req, res, next) => {
   const authHeader = req.headers.authorization;

   let authToken;

   if (authHeader) {
     const method = authHeader.split(' ')[0];
     const token = authHeader.split(' ')[1];
     console.log(token)
     if (method && method === "Bearer" && token) {
       const b = Buffer.from(token, 'base64')
       const value = b.toString();
       authToken = value
     }
   }

   if (!authToken) {
     return res.status(403).send("Se requiere un token para la autenticación");
   }
   try {
     const decoded = jwt.verify(authToken, config.TOKEN_KEY);
     req.user = decoded;
   } catch (err) {
     return res.status(401).send("Invalid Token 9000");
   }
   return next();
};

module.exports = verifyToken;
// import { NextFunction, Request, Response } from "express";
// import { decodeToken } from "../utils/jwt";
// interface IMyRequest extends Request {
//   user: object | string;
// }
// declare global {
//   namespace Express {
//     interface Request {
//       user: string | any;
//     }
//   }
// }

// export const authentication = (
//   req: IMyRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (!req.headers.authorization) {
//     res.status(401).json({ message: "ta ene uildliig hiihiin tuld nevternuu" });
//   }
//   const token = req.headers.authorization.split(" ")[1];
//   const user = decodeToken(token);
//   req.user = user;
// };

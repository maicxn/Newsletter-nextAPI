import { NextApiRequest, NextApiResponse } from "next";

const httpStatus = {
  Success: 200,
  BadRequest: 400,
  InternalServerError: 500,
  NotFound: 404,
};

const controllerByMethod = {
  POST(req: NextApiRequest, res: NextApiResponse) {
    res.status(httpStatus.Success).json({ message: "Post Request" });
    console.log(req.body);
  },

  GET(req: NextApiRequest, res: NextApiResponse) {
    res.status(httpStatus.Success).json({ message: "Get Request" });
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const controller = controllerByMethod[req.method];
  if (!controller) {
    res.status(httpStatus.NotFound).json("Nada encontrado aqui :(");
    return;
  }
  if (controller) {
    controller(req, res);
    return;
  }
  controller(req, res);
}

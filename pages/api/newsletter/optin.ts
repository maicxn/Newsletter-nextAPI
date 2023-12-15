import { createClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const dbClient = createClient(SUPABASE_URL, SUPABASE_KEY);

const httpStatus = {
  Success: 200,
  BadRequest: 400,
  InternalServerError: 500,
  NotFound: 404,
};

const controllerByMethod = {
  async POST(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.body.emailNewsletter);
    const email = req.body.emailNewsletter;

    if (!Boolean(email) || !email.includes("@")) {
      res.status(httpStatus.BadRequest).json({
        message: "Você precisa enviar um email válido. Ex: teste@teste.com ",
      });
      return;
    }

    await dbClient
      .from("newsletter_users")
      .insert({ email: email, optin: true });
    await dbClient.auth.admin.createUser({ email: email });

    res.status(httpStatus.Success).json({ message: "Post Request" });
  },

  async GET(req: NextApiRequest, res: NextApiResponse) {
    const { data, error } = await dbClient.from("newsletter_users").select("*");
    console.log(data);
    console.log(error);

    res.status(httpStatus.Success).json({ message: "Get Request", data });
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

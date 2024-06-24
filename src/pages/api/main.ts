// import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const getURI = async (url: string) => {
    try {
      const response = await (await fetch(url)).json();

      return {
        status_code: 200,
        message: response.statusText,
        data: response,
      };
    } catch ({ message }: any) {
      return { status_code: 500, message, data: {} };
    }
  };

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  const { data, message, status_code } = await getURI(
    req.headers.url as string
  );

  res.status(status_code).json(status_code === 200 ? data : { message });
};

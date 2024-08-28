import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export default async function handler(req, res) {
  await mongooseConnect();

  if (req.method === "GET") {
    res.json(await Category.find());
  }
}

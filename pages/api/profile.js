import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
import { UserInfo } from "@/models/UserInfo";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  await mongooseConnect();

  if (req.method === "GET") {
    const session = await getSession({ req });
    const email = session?.user?.email;
    if (!email) {
      return res.json();
    }

    const user = await User.findOne({ email }).lean();
    const userInfo = await UserInfo.findOne({ email }).lean();

    return res.json({ ...user, ...userInfo });
  }

  if (req.method === "PUT") {
    const session = await getServerSession(req, res, authOptions);
    const email = session.user.email;
    const { name, image, ...userInfo } = req.body;

    await User.updateOne({ email }, { name, image });
    await UserInfo.updateOne({ email }, userInfo, { upsert: true });

    return res.json(true);
  }
}

// import { mongooseConnect } from "@/lib/mongoose";
// import { User } from "@/models/User";
// import { UserInfo } from "@/models/UserInfo";
// import { getSession, getServerSession } from "next-auth/react";
// import { authOptions } from "./auth/[...nextauth]";

// export default async function handle(req, res) {
//   try {
//     await mongooseConnect();

//     if (req.method === "GET") {
//       const session = await getSession({ req });
//       const email = session?.user?.email;
//       if (!email) {
//         res.status(401).json({ error: "Unauthorized" });
//         return;
//       }

//       const user = await User.findOne({ email }).lean();
//       const userInfo = await UserInfo.findOne({ email }).lean();

//       if (!user || !userInfo) {
//         res.status(404).json({ error: "User not found" });
//         return;
//       }

//       res.status(200).json({ ...user, ...userInfo });
//       return;
//     }

//     if (req.method === "PUT") {
//       const session = await getServerSession(req, res, authOptions);
//       const email = session?.user?.email;
//       if (!email) {
//         res.status(401).json({ error: "Unauthorized" });
//         return;
//       }

//       const { name, image, ...userInfo } = req.body;

//       console.log("Updating user:", { email, name, image, userInfo });

//       const userUpdateResult = await User.updateOne({ email }, { name, image });
//       const userInfoUpdateResult = await UserInfo.updateOne(
//         { email },
//         userInfo,
//         { upsert: true }
//       );

//       console.log("User update result:", userUpdateResult);
//       console.log("User info update result:", userInfoUpdateResult);

//       res.status(200).json(true);
//       return;
//     }

//     res.status(405).json({ error: "Method not allowed" });
//   } catch (error) {
//     console.error("Error in API handler:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }

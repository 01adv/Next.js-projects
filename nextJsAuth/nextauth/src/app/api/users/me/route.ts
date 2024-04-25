// import { getDataFromToken } from "@/helpers/getDataFromToken";

// import { NextRequest, NextResponse } from "next/server";
// import User from "@/models/userModel";
// import { connect } from "@/dbConfig/dbConfig";

// connect();

// export async function GET(request: NextRequest) {
//   try {
//     const userId = getDataFromToken(request);
//     const user = await User.findOne({ _id: userId }).select("-password");
//     console.log(user);

//     return NextResponse.json({
//       message: "User found",
//       data: user,
//     });
//   } catch (error: any) {
//     console.log(error.message);
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   }
// }

import { ObjectId } from "mongodb"; // Import ObjectId from MongoDB driver

import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const userData = getDataFromToken(request); // Assuming getDataFromToken returns an object with user data
    const userId = userData.id; // Extract the user ID from the userData object

    // Convert the userId string to an ObjectId
    const objectIdUserId = new ObjectId(userId);

    // Query the user by _id using the converted objectIdUserId
    const user = await User.findOne({ _id: objectIdUserId }).select(
      "-password"
    );
    console.log(user);

    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

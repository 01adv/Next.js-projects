import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

// Connect to the database
connect();

export async function POST(request: NextRequest) {
  try {
    // Get the request body
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    // Find the user by email
    const user = await User.findOne({ email });

    // If user doesn't exist, return an error
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }
    console.log("user exists", user);

    // Check if the provided password matches the user's password
    const validPassword = await bcrypt.compare(password, user.password);

    // If the password is invalid, return an error
    if (!validPassword) {
      return NextResponse.json(
        { error: "Check your credentials" },
        { status: 400 }
      );
    }

    // Create the token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // Generate the JWT token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET || 'default_secret', {expiresIn: '1d'});

    // Create the response
    
    const response = NextResponse.json({
      
      message: "Logged In Success",
      success: true
    })

    // Set the token as a cookie
    response.cookies.set("token", token,{
      httpOnly: true
    })
    return response

  } catch (error: any) {
    // Handle any errors
    return NextResponse.json({ error }, { status: 500 });
  }
}

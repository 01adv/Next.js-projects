import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

// Connect to the database
connect();

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json({
      message: "Logout SuccessFully",
      success: true,
    });

    // Delete the cookie
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;

    return;
  } catch (error: any) {
    // Handle any errors
    return NextResponse.json({ error }, { status: 500 });
  }
}


import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

// This function sends an email to the user for email verification or password reset
export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // Hash the user ID with bcrypt to create a token
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    // Update the user document in the database with the appropriate token and expiry time
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000, // Token expires in 1 hour (3600000 milliseconds)
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000, // Token expires in 1 hour (3600000 milliseconds)
      });
    }

    // Create a transporter using Mailtrap for testing purposes
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "2e2950e474546d", // Replace with your Mailtrap credentials
        pass: "d7dd25096e5249", // Replace with your Mailtrap credentials
      },
    });

    // Define the email options
    const mailOptions = {
      from: '"Advaita 👻" <07advaita@gmail.com>', // Sender's email address
      to: email, // Recipient's email address
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset Your Password", // Email subject
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
      or copy and paste the link below in your browser. <br> ${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}
      </p>`, // HTML body with a link containing the token
    };

    // Send the email
    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

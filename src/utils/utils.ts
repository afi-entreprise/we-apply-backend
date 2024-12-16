import axios from "axios";
import axiosRetry from "axios-retry";
import { sendMailProps } from "./type";
import OTPCode from "../models/otp";

const setAsSended = async (otp: any) => {
  otp.sended = true;
  await otp.save();
  return true;
};

const setAsVerified = async (otp: any) => {
  otp.verified = true;
  await otp.save();
  return true;
};

// Send otp verification code
export const sendOTP = async ({
  email,
  fullname,
}: {
  email: string;
  fullname: string;
}): Promise<boolean> => {
  try {
    const code = Math.floor(100000 + Math.random() * 900000);
    const otpCode = new OTPCode({
      code,
      email,
      expiryDate: Date.now() + 10 * 60 * 1000,
    });
    const lastOtpSent = await OTPCode.findOne({ email }).sort({
      createdAt: -1,
    });
    if (lastOtpSent && Date.now() < lastOtpSent.expiryDate.getTime()) {
      return false;
    }
    const content = `
    <h2>Use this OTP Code  to finish the creation of your account</h2>
   `;
    const message = sendMail({ code, email, fullname, content });
    if (!message) return false;
    console.log("here", message);
    return setAsSended(otpCode);
  } catch (err) {
    console.error(err);
    return false;
  }
};

// Verify otp codes
export const verifyOTP = async ({
  email,
  code,
}: {
  email: string;
  code: string;
}): Promise<{ message: string; valid: boolean }> => {
  try {
    const otp = await OTPCode.findOne({ email, code }).sort({
      createdAt: -1,
    });
    if (!otp || otp.verified) {
      return { message: "Invalid code", valid: false };
    }
    if (!otp.verified && Date.now() > otp.expiryDate.getTime()) {
      return { message: "OTP code expired", valid: false };
    }
    setAsVerified(otp);
    return { message: "OTP Valid", valid: true };
  } catch (err) {
    console.log(err);
    return { message: "Invalid code", valid: false };
  }
};

// send mail function
export const sendMail = ({ fullname, email, content, code }: sendMailProps) => {
  const maxTimeRetries = 5;

  // retry request configuration
  axiosRetry(axios, {
    retries: maxTimeRetries,
    retryCondition: (error: any) => {
      // Log the error
      console.error("Request failed with error: ", error);

      // Check if the error is a network error or a 5xx error
      const shouldRetry = axiosRetry.isNetworkOrIdempotentRequestError(error);

      return shouldRetry;
    },
    retryDelay: (retryCount: number) => {
      // console.log(`retry attempt: ${retryCount}`);
      return retryCount * 2000;
    },
  });

  // message to send
  let message = " this OTP Code expire in 10 minute ";

  // message to send
  let loginMessage = `
    <html>
    <head>
    <style>
        body {
          padding: 0;
          margin: 0;
          background-color: #d0d0d05a;
          padding: 2rem;
        }
        div {
          padding: 0;
        }
      </style>
    </head>
    <body>
      ${content}
      <div>
        <p>Name: ${fullname}</p>
        <p>OTP Code: ${code}</p>
        <p>Message: ${message}</p>
        <br>
        ----------------
        
      </div>
    </body>
  </html>
    `;
  //subject
  const subject = "don't share your code";

  //sender
  const sender = {
    email: "lfish-cheznous@lfishtogo.com",
    name: "we apply otp",
  };

  // send email
  let url = "https://api.sendgrid.com/v3/mail/send";
  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.EMAIL_API_KEY}`,
    },
  };

  return axios.post(
    url,
    {
      personalizations: [
        {
          to: [{ email: email, name: fullname }],
          subject,
        },
      ],
      content: [{ type: "text/html", value: loginMessage }],
      from: { email: sender.email, name: sender.name },
      reply_to: { email: sender.email, name: sender.name },
    },
    options
  );
};

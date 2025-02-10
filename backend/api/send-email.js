import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, subject, message } = req.body;

    // Set up Nodemailer transport
    const transporter = nodemailer.createTransport({
      service: "Gmail", // Use Gmail or any other email service
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app password
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.RECIPIENT_EMAIL, // Replace with the email that will receive the contact form submissions
      subject: `Contact Us Form: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to send email", details: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

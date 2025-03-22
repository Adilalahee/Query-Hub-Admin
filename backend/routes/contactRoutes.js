import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import Contact from "../models/contactModel.js";
import express from "express";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Fetch all contacts for Admin Panel
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ submittedAt: -1 }); // Latest first
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Contact form submission
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json({ message: "Submitted successfully!" });
  } catch (error) {
    console.error("Error submitting contact:", error);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/send-pdf-email", async (req, res) => {
  try {
    const contacts = await Contact.find();
    if (contacts.length === 0) return res.status(404).json({ message: "No contacts found." });

    // Define folder and PDF file path
    const downloadsDir = path.join(__dirname, "../downloads");
    const pdfPath = path.join(downloadsDir, "contacts.pdf");

    // ✅ Ensure the 'downloads' directory exists
    if (!fs.existsSync(downloadsDir)) {
      fs.mkdirSync(downloadsDir, { recursive: true });
    }

    // Create PDF
    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream(pdfPath);
    doc.pipe(writeStream);

    doc.fontSize(16).text("Contact Messages", { align: "center" }).moveDown();
    contacts.forEach((contact, index) => {
      doc
        .fontSize(12)
        .text(`No: ${index + 1}`)
        .text(`Name: ${contact.name}`)
        .text(`Email: ${contact.email}`)
        .text(`Message: ${contact.message}`)
        .text(`Submitted At: ${new Date(contact.submittedAt).toLocaleString()}`)
        .moveDown();
    });

    doc.end();

    // Wait for the PDF to finish writing
    writeStream.on("finish", async () => {
      // Configure nodemailer
      const transporter = nodemailer.createTransport({
        service: "gmail", // You can use another email provider
        auth: {
          user: "your-email@gmail.com", // Change this
          pass: "your-app-password",   // Generate an app password if using Gmail
        },
      });

      const mailOptions = {
        from: "your-email@gmail.com", // Change this
        to: "adilmohammad005@gmail.com", // Change to the admin's email
        subject: "Contact Messages Report",
        text: "Attached is the latest contact messages report.",
        attachments: [
          {
            filename: "contacts.pdf",
            path: pdfPath,
          },
        ],
      };

      // Send email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          return res.status(500).json({ message: "Error sending email" });
        }
        console.log("Email sent:", info.response);
        res.status(200).json({ message: "PDF sent to admin successfully" });
      });
    });
  } catch (error) {
    console.error("Error generating or sending PDF:", error);
    res.status(500).json({ message: "Error processing request" });
  }
});
export default router;

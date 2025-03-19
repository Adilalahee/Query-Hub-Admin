const mongoose = require("mongoose");
const fs = require("fs");
const PDFDocument = require("pdfkit");
const nodemailer = require("nodemailer");
const Contact = require("./models/contact"); // Ensure you have the Contact model

// Contact schema
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  submittedAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model("contact", ContactSchema);

// Endpoint to handle form submission
router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Create a new contact entry
    const contact = new Contact({ name, email, message });
    await contact.save();

    // Send PDF after contact form submission
    await sendContactPDF(contact);

    res.status(201).json({ message: "Submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error submitting form" });
  }
});

// Function to generate and send PDF via email
const sendContactPDF = async (contact) => {
  const doc = new PDFDocument();
  const pdfPath = `./contact_${contact._id}.pdf`;

  doc.pipe(fs.createWriteStream(pdfPath));
  doc.text(`Name: ${contact.name}\nEmail: ${contact.email}\nMessage: ${contact.message}`);
  doc.end();

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Use environment variable for email
        pass: process.env.EMAIL_PASS, // Use environment variable for password
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Ensure this is the same as the 'user' above
      to: "adil.practice.test@gmail.com", // Recipient email
      subject: "New Contact Submission",
      text: "See attached contact form submission.",
      attachments: [{ filename: "contact.pdf", path: pdfPath }],
    });
    console.log("PDF sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Endpoint to retrieve all contacts (protected)
router.get("/contacts", verifyToken, async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contacts" });
  }
});

module.exports = router;

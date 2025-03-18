const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("contact", ContactSchema);

router.post("/contact", async (req, res) => {
    const { name, email, message } = req.body;
    const contact = new Contact({ name, email, message });
    await contact.save();
  
    res.status(201).json({ message: "Submitted successfully!" });
  });

  const PDFDocument = require("pdfkit");
const nodemailer = require("nodemailer");

const sendContactPDF = async (contact) => {
  const doc = new PDFDocument();
  const pdfPath = `./contact_${contact._id}.pdf`;

  doc.pipe(fs.createWriteStream(pdfPath));
  doc.text(`Name: ${contact.name}\nEmail: ${contact.email}\nMessage: ${contact.message}`);
  doc.end();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: "your-email@gmail.com", pass: "your-password" },
  });

  await transporter.sendMail({
    from: "your-email@gmail.com",
    to: "md@nusaiba.com.bd",
    subject: "New Contact Submission",
    text: "See attached.",
    attachments: [{ filename: "contact.pdf", path: pdfPath }],
  });
};

router.get("/contacts", verifyToken, async (req, res) => {
    const contacts = await Contact.find();
    res.json(contacts);
  });
  

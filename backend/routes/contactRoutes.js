import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import Contact from "../models/contactModel.js";
import express from "express";

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
router.get("/download-pdf", async (req, res) => {
    try {
      const contacts = await Contact.find();
      if (contacts.length === 0) return res.status(404).json({ message: "No contacts found." });
  
      const doc = new PDFDocument();
      const pdfPath = path.join(__dirname, "../downloads/contacts.pdf");
  
      doc.pipe(fs.createWriteStream(pdfPath)); // Save file locally
      doc.pipe(res); // Send to frontend
  
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
    } catch (error) {
      console.error("Error generating PDF:", error);
      res.status(500).json({ message: "Error generating PDF" });
    }
  });
export default router;

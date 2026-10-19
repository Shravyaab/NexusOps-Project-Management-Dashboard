const cors = require("cors");
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();

// Configure CORS globally (This automatically handles all OPTIONS preflights)
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Express static and body-parsing middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "..")));

// Explicitly handle preflight OPTIONS requests for all routes

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shravyaab10@gmail.com",
    pass: "fplm lpfe fpuy nkoa",
  },
});

// Helper to construct report HTML structure
function compileReportHtml(date, tasks) {
  const templatePath = path.join(__dirname, "report-template.html");
  if (!fs.existsSync(templatePath)) {
    throw new Error(
      "Report template file (report-template.html) was not found on the server."
    );
  }
  const template = fs.readFileSync(templatePath, "utf8");

  let rows = "";
  if (tasks && Array.isArray(tasks)) {
    tasks.forEach((task) => {
      rows += `
            <tr>
                <td>${task.project || "N/A"}</td>
                <td>${task.text || ""}</td>
                <td>${(task.duration || 0) * 30} Minutes</td>
            </tr>
            `;
    });
  }

  return template.replace("{{DATE}}", date || "").replace("{{ROWS}}", rows);
}

// ENDPOINT 1: Send Daily Report PDF via Email
app.post("/send-report", async (req, res) => {
  const { date, tasks } = req.body;

  try {
    const html = compileReportHtml(date, tasks);

    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });
    await browser.close();

    await transporter.sendMail({
      from: "shravyaab10@gmail.com",
      to: "thanushreeik@gmail.com",
      subject: `Daily Report - ${date}`,
      text: "Please find the attached Daily Report PDF.",
      attachments: [
        {
          filename: `DailyReport_${date}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Error processing or mailing report:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ENDPOINT 2: Direct PDF download to client browser
app.post("/download-pdf", async (req, res) => {
  const { date, tasks } = req.body;

  try {
    const html = compileReportHtml(date, tasks);

    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });
    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=DailyReport_${date}.pdf`
    );
    res.send(pdfBuffer);
  } catch (err) {
    console.error("Error during direct PDF generation:", err);
    res.status(500).send("Failed to compile and download PDF document.");
  }
});

app.get("/test", (req, res) => {
  res.send("Server is working");
});
// Remove console.log(server); and replace with this:
const PORT = 5005;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Guard against server-level errors (e.g., port issues)
server.on("error", (err) => {
  console.error("Server encountered an error:", err);
});

// Global listeners to catch and display any hidden crashes
process.on("uncaughtException", (err) => {
  console.error("CRITICAL: Uncaught Exception detected:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error(
    "CRITICAL: Unhandled Rejection at:",
    promise,
    "reason:",
    reason
  );
});

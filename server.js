const express = require("express");
const helmet = require("helmet");
const path = require("path");
const rateLimit = require("express-rate-limit");

const app = express();
const port = 3000;
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	ipv6Subnet: 48, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
});

app.use(limiter)

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "default-src": ["'self'"],
        // Mengizinkan elemen iframe memuat link Spline Anda
        "frame-src": ["'self'", "https://my.spline.design"],
        // Mengizinkan engine internal Spline untuk mengunduh aset 3D mereka
        "connect-src": ["'self'", "https://my.spline.design", "https://fonts.googleapis.com"],
        // Mengizinkan script Spline jika dibutuhkan oleh ekosistemnya
        "script-src": ["'self'", "'unsafe-inline'", "https://my.spline.design"],
        "img-src": ["'self'", "data:", "https://my.spline.design"],
        "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        "font-src": ["'self'", "https://fonts.gstatic.com"],
      },
    },
  })
);

app.use(express.json());

app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "eng.html"))
});
app.get("/id", (req, res) => {
    res.sendFile(path.join(__dirname, "id.html"))
});
app.use((req, res, next) => {
    // Mengirim status 404 dengan format JSON
    res.status(404).json({
        message: "Pages not found"
    });
});

app.listen(port, () => {
    console.log('console listen to http://localhost:3000')
});

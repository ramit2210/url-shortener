require("dotenv").config();
const express = require("express");
const { urls } = require("./db/schema/urlSchema");
const { eq } = require("drizzle-orm");
const { createUniqueCode } = require("./lib/createUniqueCode");
const app = express();
const PORT = 4000;
const BaseUrl = "http://localhost:4000";

const { db } = require("./db");
const cors = require("cors");

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ text: "server is working" });
});

app.post("/shorten", async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL is required" });

    const existing = await db
        .select()
        .from(urls)
        .where(eq(urls.originalUrl, url))
        .limit(1);

    if (existing.length > 0) {
        return res
            .status(200)
            .json({ shortUrl: `${BaseUrl}/${existing[0].code}` });
    }
    const code = await createUniqueCode();

    await db.insert(urls).values({
        code,
        originalUrl: url,
    });

    console.log(code);

    return res.json({ shortUrl: `${BaseUrl}/${code}` });
});

app.get("/:code", async (req, res) => {
    const { code } = req.params;

    const result = await db
        .select()
        .from(urls)
        .where(eq(urls.code, code))
        .limit(1);

    if (result.length === 0) {
        return res.status(404).send("URL not found");
    }

    res.redirect(result[0].originalUrl);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

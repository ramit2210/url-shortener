const { eq } = require("drizzle-orm");
const { db } = require("../db");
const { urls } = require("../db/schema/urlSchema");

const generateRandomString = (length) => {
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < length; i++) {
        code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
};

const createUniqueCode = async () => {
    while (true) {
        const code = generateRandomString(6);
        const existing = await db
            .select()
            .from(urls)
            .where(eq(urls.code, code))
            .limit(1);

        if (existing.length === 0) return code;
    }
};

module.exports = {
    createUniqueCode,
};

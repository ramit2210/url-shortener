const { pgTable, serial, text, uniqueIndex } = require("drizzle-orm/pg-core");

const urls = pgTable(
  "urls",
  {
    id: serial("id").primaryKey(),
    code: text("code").notNull(),
    originalUrl: text("original_url").notNull(),
  },
  (table) => ({
    codeIdx: uniqueIndex("code_idx").on(table.code),
    urlIdx: uniqueIndex("url_idx").on(table.originalUrl),
  }),
);

module.exports = { urls };

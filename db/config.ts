import { defineDb, defineTable, column } from 'astro:db';

const Article = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    title: column.text(),
    slug: column.text({ unique: true }),
    excerpt: column.text(),
    content: column.text(),
    author: column.text(),
    publishedDate: column.date(),
    category: column.text(),
    imageUrl: column.text({ optional: true }),
  },
});

export default defineDb({
  tables: { Article },
})
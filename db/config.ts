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

const RailTrip = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    origin: column.text(),
    destination: column.text(),
    departureDateTime: column.date(),
    arrivalDateTime: column.date(),
    carrier: column.text(),
    duration: column.number(),
    stops: column.text(),
    price: column.number(),
    hasPowerSockets: column.boolean(),
    hasWifi: column.boolean(),
    wifiReliability: column.number({ optional: true }),
    punctuality: column.number(),
  },
});

const SeatClass = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    tripId: column.number({ references: () => RailTrip.columns.id }),
    className: column.text(),
    description: column.text(),
    priceModifier: column.number(),
  },
});

export default defineDb({
  tables: { Article, RailTrip, SeatClass },
})
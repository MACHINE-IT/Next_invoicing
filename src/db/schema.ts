import { pgTable, pgEnum , serial, timestamp, text, integer} from "drizzle-orm/pg-core";

export const statusEnum = pgEnum('status', ['open', 'paid', 'pending', 'cancelled', 'refunded', 'void', 'uncollectible']); 

export const Invoices = pgTable('invoices', {
    id: serial('id').primaryKey().notNull(),
    createTs: timestamp('createTs').notNull().defaultNow(),
    updateTs: timestamp('updateTs').notNull().defaultNow(),
    value: integer('value').notNull(),
    description: text('description').notNull(),
    userId: text('userId').notNull(),
    status: statusEnum('status').notNull().default('open'),
    });
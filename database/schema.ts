import { relations, sql } from "drizzle-orm";
import { text, integer, sqliteTable, real } from "drizzle-orm/sqlite-core";

// users
export const users = sqliteTable('users', {
    userId: integer('userId').primaryKey(),
    userName: text('userName').default(''),
    userEmail: text('userEmail').notNull(),
    userType: text('userType').notNull(),
    userPassword: text('userPassword').notNull(),
});

// clients
export const clients = sqliteTable('clients', {
    clientId: integer('clientId').primaryKey(),
    clientName: text('clientName').notNull(),
    clientAddress: text('clientAddress').notNull(),
    clientContact: text('clientContact').notNull()
});

// products
export const salesPersons = sqliteTable('salesPersons', {
    salesPersonId: integer('salesPersonId').primaryKey(),
    salesPersonName: text('salesPersonName'),
    salesPersonContact: text('salesPersonContact')
})

// sales
export const sales = sqliteTable('sales', {
    salesId: integer('salesId').primaryKey(),
    salesDate: text('salesDate').notNull().default(sql`CURRENT_TIMESTAMP`),
    salesStatus: text('salesStatus').default('nouvelle'),
    productName: real('productName'),
    clientId: real('clientId'),
    salesPersonId: real('salesPersonId'),
})

// sales relations
export const salesRelations = relations( sales, ({ one }) => ({
    // product: one( products, { fields: [ sales.productId ], references: [ products.productId ]}),
    client: one( clients, { fields: [ sales.clientId ], references: [ clients.clientId ]}),
    salesPerson: one( salesPersons, { fields: [ sales.salesPersonId ], references: [ salesPersons.salesPersonId ]}),
}))

// // product relations
// export const productsRelations = relations( products, ({ many }) => ({
//     sales: many( sales )
// }))

// client relations
export const clientsRelations = relations( clients, ({ many }) => ({
    sales: many( sales )
}))

// salesPerson relations
export const salesPersonsRelations = relations( salesPersons, ({ many }) => ({
    sales: many( sales )
}))
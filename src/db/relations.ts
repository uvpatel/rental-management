import { relations } from "drizzle-orm/_relations";

import {
  account,
  session,
  user,
  organizations,
  organizationMembers,
  addresses,

  products,
  productVariants,
  attributes,
  attributeValues,
  variantValues,
  rentalRates,

  inventoryItems,

  quotations,
  quotationLines,
  rentalOrders,
  rentalOrderLines,
  reservations,

  pickups,
  pickupLines,
  returns,
  returnLines,

  invoices,
  invoiceLines,
  payments,
  deposits,
} from "./schema";

// ─────────────────────────────────────
// USERS
// ─────────────────────────────────────

export const userRelations = relations(
  user,
  ({ many }) => ({
    memberships: many(organizationMembers),
    accounts: many(account),
    sessions: many(session),
  }),
);

export const accountRelations = relations(
  account,
  ({ one }) => ({
    user: one(user, {
      fields: [account.userId],
      references: [user.id],
    }),
  }),
)

export const sessionRelations = relations(
  session,
  ({ one }) => ({
    user: one(user, {
      fields: [session.userId],
      references: [user.id],
    }),
  }),
)

// ─────────────────────────────────────
// ORGANIZATIONS
// ─────────────────────────────────────

export const organizationsRelations = relations(
  organizations,
  ({ many }) => ({
    members: many(organizationMembers),
    addresses: many(addresses),
    products: many(products),
  }),
);

export const organizationMembersRelations =
  relations(
    organizationMembers,
    ({ one }) => ({
      organization: one(organizations, {
        fields: [
          organizationMembers.organizationId,
        ],
        references: [
          organizations.id,
        ],
      }),

      user: one(user, {
        fields: [
          organizationMembers.userId,
        ],
        references: [
          user.id,
        ],
      }),
    }),
  );

export const addressesRelations = relations(
  addresses,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [addresses.organizationId],
      references: [organizations.id],
    }),
  }),
);

// ─────────────────────────────────────
// PRODUCTS
// ─────────────────────────────────────

export const productsRelations = relations(
  products,
  ({ one, many }) => ({
    vendor: one(organizations, {
      fields: [products.vendorId],
      references: [organizations.id],
    }),

    variants: many(productVariants),
  }),
);

export const productVariantsRelations = relations(
  productVariants,
  ({ one, many }) => ({
    product: one(products, {
      fields: [productVariants.productId],
      references: [products.id],
    }),

    values: many(variantValues),
    rentalRates: many(rentalRates),
    inventoryItems: many(inventoryItems),

    quotationLines: many(quotationLines),
    rentalOrderLines: many(rentalOrderLines),
    reservations: many(reservations),
  }),
);

// ─────────────────────────────────────
// ATTRIBUTES
// ─────────────────────────────────────

export const attributesRelations = relations(
  attributes,
  ({ one, many }) => ({
    vendor: one(organizations, {
      fields: [attributes.vendorId],
      references: [organizations.id],
    }),

    values: many(attributeValues),
  }),
);

export const attributeValuesRelations = relations(
  attributeValues,
  ({ one, many }) => ({
    attribute: one(attributes, {
      fields: [attributeValues.attributeId],
      references: [attributes.id],
    }),

    variants: many(variantValues),
  }),
);

export const variantValuesRelations = relations(
  variantValues,
  ({ one }) => ({
    variant: one(productVariants, {
      fields: [variantValues.variantId],
      references: [productVariants.id],
    }),

    value: one(attributeValues, {
      fields: [
        variantValues.attributeValueId,
      ],
      references: [
        attributeValues.id,
      ],
    }),
  }),
);

export const rentalRatesRelations = relations(
  rentalRates,
  ({ one }) => ({
    variant: one(productVariants, {
      fields: [rentalRates.variantId],
      references: [productVariants.id],
    }),
  }),
);

// ─────────────────────────────────────
// QUOTATIONS
// ─────────────────────────────────────

export const quotationsRelations = relations(
  quotations,
  ({ one, many }) => ({
    vendor: one(organizations, {
      fields: [quotations.vendorId],
      references: [organizations.id],
      relationName: "quotationVendor",
    }),

    customer: one(organizations, {
      fields: [quotations.customerId],
      references: [organizations.id],
      relationName: "quotationCustomer",
    }),

    lines: many(quotationLines),

    rentalOrders: many(rentalOrders),
  }),
);

export const quotationLinesRelations = relations(
  quotationLines,
  ({ one }) => ({
    quotation: one(quotations, {
      fields: [quotationLines.quotationId],
      references: [quotations.id],
    }),

    variant: one(productVariants, {
      fields: [quotationLines.variantId],
      references: [productVariants.id],
    }),
  }),
);

// ─────────────────────────────────────
// RENTAL ORDERS
// ─────────────────────────────────────

export const rentalOrdersRelations = relations(
  rentalOrders,
  ({ one, many }) => ({
    quotation: one(quotations, {
      fields: [rentalOrders.quotationId],
      references: [quotations.id],
    }),

    vendor: one(organizations, {
      fields: [rentalOrders.vendorId],
      references: [organizations.id],
      relationName: "rentalVendor",
    }),

    customer: one(organizations, {
      fields: [rentalOrders.customerId],
      references: [organizations.id],
      relationName: "rentalCustomer",
    }),

    lines: many(rentalOrderLines),
    reservations: many(reservations),

    pickups: many(pickups),
    returns: many(returns),

    invoices: many(invoices),
    deposits: many(deposits),
  }),
);

export const rentalOrderLinesRelations = relations(
  rentalOrderLines,
  ({ one, many }) => ({
    rentalOrder: one(rentalOrders, {
      fields: [
        rentalOrderLines.rentalOrderId,
      ],
      references: [
        rentalOrders.id,
      ],
    }),

    variant: one(productVariants, {
      fields: [
        rentalOrderLines.variantId,
      ],
      references: [
        productVariants.id,
      ],
    }),

    reservations: many(reservations),
    pickupLines: many(pickupLines),
    returnLines: many(returnLines),
  }),
);

// ─────────────────────────────────────
// RESERVATIONS
// ─────────────────────────────────────

export const reservationsRelations = relations(
  reservations,
  ({ one }) => ({
    rentalOrder: one(rentalOrders, {
      fields: [reservations.rentalOrderId],
      references: [rentalOrders.id],
    }),

    rentalOrderLine: one(rentalOrderLines, {
      fields: [
        reservations.rentalOrderLineId,
      ],
      references: [
        rentalOrderLines.id,
      ],
    }),

    variant: one(productVariants, {
      fields: [reservations.variantId],
      references: [productVariants.id],
    }),

    vendor: one(organizations, {
      fields: [reservations.vendorId],
      references: [organizations.id],
    }),
  }),
);

// ─────────────────────────────────────
// PICKUPS
// ─────────────────────────────────────

export const pickupsRelations = relations(
  pickups,
  ({ one, many }) => ({
    rentalOrder: one(rentalOrders, {
      fields: [pickups.rentalOrderId],
      references: [rentalOrders.id],
    }),

    lines: many(pickupLines),
  }),
);

export const pickupLinesRelations = relations(
  pickupLines,
  ({ one }) => ({
    pickup: one(pickups, {
      fields: [pickupLines.pickupId],
      references: [pickups.id],
    }),

    rentalOrderLine: one(rentalOrderLines, {
      fields: [
        pickupLines.rentalOrderLineId,
      ],
      references: [
        rentalOrderLines.id,
      ],
    }),

    variant: one(productVariants, {
      fields: [pickupLines.variantId],
      references: [productVariants.id],
    }),
  }),
);

// ─────────────────────────────────────
// RETURNS
// ─────────────────────────────────────

export const returnsRelations = relations(
  returns,
  ({ one, many }) => ({
    rentalOrder: one(rentalOrders, {
      fields: [returns.rentalOrderId],
      references: [rentalOrders.id],
    }),

    lines: many(returnLines),
  }),
);

export const returnLinesRelations = relations(
  returnLines,
  ({ one }) => ({
    rentalReturn: one(returns, {
      fields: [returnLines.returnId],
      references: [returns.id],
    }),

    rentalOrderLine: one(rentalOrderLines, {
      fields: [
        returnLines.rentalOrderLineId,
      ],
      references: [
        rentalOrderLines.id,
      ],
    }),

    variant: one(productVariants, {
      fields: [returnLines.variantId],
      references: [productVariants.id],
    }),
  }),
);

// ─────────────────────────────────────
// INVOICES
// ─────────────────────────────────────

export const invoicesRelations = relations(
  invoices,
  ({ one, many }) => ({
    rentalOrder: one(rentalOrders, {
      fields: [invoices.rentalOrderId],
      references: [rentalOrders.id],
    }),

    lines: many(invoiceLines),
    payments: many(payments),
  }),
);

export const invoiceLinesRelations = relations(
  invoiceLines,
  ({ one }) => ({
    invoice: one(invoices, {
      fields: [invoiceLines.invoiceId],
      references: [invoices.id],
    }),
  }),
);

export const paymentsRelations = relations(
  payments,
  ({ one }) => ({
    invoice: one(invoices, {
      fields: [payments.invoiceId],
      references: [invoices.id],
    }),

    rentalOrder: one(rentalOrders, {
      fields: [payments.rentalOrderId],
      references: [rentalOrders.id],
    }),
  }),
);

export const depositsRelations = relations(
  deposits,
  ({ one }) => ({
    rentalOrder: one(rentalOrders, {
      fields: [deposits.rentalOrderId],
      references: [rentalOrders.id],
    }),
  }),
);

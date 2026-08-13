import { pgTable, text, integer, numeric, timestamp, boolean } from "drizzle-orm/pg-core";

// 1. Users table (Customer, Vendor, Admin)
export const users = pgTable("users", {
  id: text("id").primaryKey(), // UUID string
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role", { enum: ["admin", "vendor", "customer"] }).notNull().default("customer"),
  companyName: text("company_name"),
  gstin: text("gstin"),
  couponCodeUsed: text("coupon_code_used"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 2. Categories
export const categories = pgTable("categories", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
});

// 3. Products
export const products = pgTable("products", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category").notNull().default("General"),
  vendorId: text("vendor_id").references(() => users.id),
  imageUrl: text("image_url"),
  
  // Rental pricing
  pricePerHour: numeric("price_per_hour", { precision: 10, scale: 2 }).default("0"),
  pricePerDay: numeric("price_per_day", { precision: 10, scale: 2 }).default("0"),
  pricePerWeek: numeric("price_per_week", { precision: 10, scale: 2 }).default("0"),
  
  // Costs & Inventory
  costPrice: numeric("cost_price", { precision: 10, scale: 2 }).default("0"),
  salesPrice: numeric("sales_price", { precision: 10, scale: 2 }).default("0"),
  securityDeposit: numeric("security_deposit", { precision: 10, scale: 2 }).default("0"),
  quantityOnHand: integer("quantity_on_hand").notNull().default(1),
  
  // Publishing & Config
  isRentable: boolean("is_rentable").default(true).notNull(),
  isPublished: boolean("is_published").default(true).notNull(),
  brand: text("brand"),
  color: text("color"),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 4. Rental Quotations & Orders
export const rentalOrders = pgTable("rental_orders", {
  id: text("id").primaryKey(), // e.g. RNT-2026-001
  customerId: text("customer_id").references(() => users.id).notNull(),
  status: text("status", { 
    enum: ["draft", "sent", "confirmed", "picked_up", "returned", "cancelled"] 
  }).notNull().default("draft"),
  
  // Amounts
  subtotal: numeric("subtotal", { precision: 10, scale: 2 }).notNull().default("0"),
  taxAmount: numeric("tax_amount", { precision: 10, scale: 2 }).notNull().default("0"),
  securityDepositTotal: numeric("security_deposit_total", { precision: 10, scale: 2 }).notNull().default("0"),
  totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull().default("0"),
  paidAmount: numeric("paid_amount", { precision: 10, scale: 2 }).notNull().default("0"),
  lateFee: numeric("late_fee", { precision: 10, scale: 2 }).default("0"),
  
  // Dates
  rentalStartDate: timestamp("rental_start_date").notNull(),
  rentalEndDate: timestamp("rental_end_date").notNull(),
  actualReturnDate: timestamp("actual_return_date"),
  
  // Delivery & Notes
  deliveryAddress: text("delivery_address"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 5. Rental Order Lines (Items)
export const rentalOrderItems = pgTable("rental_order_items", {
  id: text("id").primaryKey(),
  orderId: text("order_id").references(() => rentalOrders.id).notNull(),
  productId: text("product_id").references(() => products.id).notNull(),
  quantity: integer("quantity").notNull().default(1),
  unitPrice: numeric("unit_price", { precision: 10, scale: 2 }).notNull(),
  billingUnit: text("billing_unit", { enum: ["hour", "day", "week"] }).notNull().default("day"),
  rentalDuration: integer("rental_duration").notNull().default(1), // count of hours/days/weeks
  lineTotal: numeric("line_total", { precision: 10, scale: 2 }).notNull(),
});

// 6. Invoices
export const invoices = pgTable("invoices", {
  id: text("id").primaryKey(), // INV-2026-001
  orderId: text("order_id").references(() => rentalOrders.id).notNull(),
  customerId: text("customer_id").references(() => users.id).notNull(),
  status: text("status", { enum: ["draft", "issued", "partially_paid", "paid", "overdue"] }).notNull().default("draft"),
  paymentType: text("payment_type", { enum: ["upfront_full", "security_deposit_only", "custom"] }).default("upfront_full"),
  
  subtotal: numeric("subtotal", { precision: 10, scale: 2 }).notNull(),
  taxAmount: numeric("tax_amount", { precision: 10, scale: 2 }).notNull(),
  depositAmount: numeric("deposit_amount", { precision: 10, scale: 2 }).default("0"),
  totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),
  paidAmount: numeric("paid_amount", { precision: 10, scale: 2 }).default("0"),
  
  dueDate: timestamp("due_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 7. Inventory Transfers / Stock movements (Pickup & Return)
export const inventoryMovements = pgTable("inventory_movements", {
  id: text("id").primaryKey(),
  orderId: text("order_id").references(() => rentalOrders.id).notNull(),
  productId: text("product_id").references(() => products.id).notNull(),
  type: text("type", { enum: ["reservation", "pickup", "return"] }).notNull(),
  quantity: integer("quantity").notNull(),
  status: text("status", { enum: ["pending", "completed"] }).default("pending"),
  movementDate: timestamp("movement_date").defaultNow().notNull(),
  notes: text("notes"),
});

// 8. System Configurations / Settings
export const systemSettings = pgTable("system_settings", {
  id: text("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
  description: text("description"),
});

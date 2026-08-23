CREATE TYPE "address_type" AS ENUM('BILLING', 'SHIPPING', 'WAREHOUSE');--> statement-breakpoint
CREATE TYPE "deposit_status" AS ENUM('REQUIRED', 'COLLECTED', 'HELD', 'PARTIALLY_DEDUCTED', 'REFUNDED', 'FORFEITED');--> statement-breakpoint
CREATE TYPE "invoice_line_type" AS ENUM('RENTAL', 'LATE_FEE', 'DAMAGE_FEE', 'DELIVERY', 'DISCOUNT', 'OTHER');--> statement-breakpoint
CREATE TYPE "invoice_status" AS ENUM('DRAFT', 'ISSUED', 'PARTIALLY_PAID', 'PAID', 'OVERDUE', 'CANCELLED');--> statement-breakpoint
CREATE TYPE "notification_type" AS ENUM('RETURN_REMINDER', 'RETURN_OVERDUE', 'PAYMENT_RECEIVED', 'PAYMENT_DUE', 'ORDER_CONFIRMED', 'PICKUP_READY');--> statement-breakpoint
CREATE TYPE "organization_member_role" AS ENUM('OWNER', 'MANAGER', 'STAFF', 'MEMBER');--> statement-breakpoint
CREATE TYPE "organization_status" AS ENUM('ACTIVE', 'SUSPENDED', 'INACTIVE');--> statement-breakpoint
CREATE TYPE "organization_type" AS ENUM('VENDOR', 'CUSTOMER');--> statement-breakpoint
CREATE TYPE "payment_method" AS ENUM('CARD', 'UPI', 'BANK_TRANSFER', 'CASH', 'ONLINE');--> statement-breakpoint
CREATE TYPE "payment_status" AS ENUM('UNPAID', 'PARTIALLY_PAID', 'PAID', 'REFUNDED');--> statement-breakpoint
CREATE TYPE "pickup_status" AS ENUM('PENDING', 'READY', 'COMPLETED', 'CANCELLED');--> statement-breakpoint
CREATE TYPE "platform_role" AS ENUM('ADMIN', 'USER');--> statement-breakpoint
CREATE TYPE "quotation_status" AS ENUM('DRAFT', 'SENT', 'ACCEPTED', 'REJECTED', 'EXPIRED', 'CONVERTED', 'CANCELLED');--> statement-breakpoint
CREATE TYPE "rental_order_status" AS ENUM('DRAFT', 'CONFIRMED', 'READY_FOR_PICKUP', 'ACTIVE', 'RETURN_DUE', 'RETURNED', 'COMPLETED', 'CANCELLED');--> statement-breakpoint
CREATE TYPE "rental_unit" AS ENUM('HOUR', 'DAY', 'WEEK', 'CUSTOM');--> statement-breakpoint
CREATE TYPE "reservation_status" AS ENUM('RESERVED', 'ACTIVE', 'COMPLETED', 'CANCELLED');--> statement-breakpoint
CREATE TYPE "return_condition" AS ENUM('GOOD', 'DAMAGED', 'LOST');--> statement-breakpoint
CREATE TYPE "return_status" AS ENUM('PENDING', 'PARTIAL', 'COMPLETED');--> statement-breakpoint
CREATE TYPE "stock_movement_type" AS ENUM('PURCHASE', 'ADJUSTMENT', 'PICKUP', 'RETURN', 'DAMAGE', 'LOSS');--> statement-breakpoint
CREATE TYPE "transaction_status" AS ENUM('PENDING', 'PROCESSING', 'SUCCEEDED', 'FAILED', 'REFUNDED', 'PARTIALLY_REFUNDED');--> statement-breakpoint
CREATE TABLE "organizations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL UNIQUE,
	"type" "organization_type" NOT NULL,
	"status" "organization_status" DEFAULT 'ACTIVE'::"organization_status" NOT NULL,
	"gstin" varchar(15),
	"pan" varchar(10),
	"email" varchar(255),
	"phone" varchar(30),
	"logo_url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "organization_members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"organization_id" uuid NOT NULL,
	"user_id" text NOT NULL,
	"role" "organization_member_role" DEFAULT 'MEMBER'::"organization_member_role" NOT NULL,
	"joined_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "addresses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"organization_id" uuid NOT NULL,
	"type" "address_type" NOT NULL,
	"name" varchar(255),
	"phone" varchar(30),
	"address_line_1" varchar(255) NOT NULL,
	"address_line_2" varchar(255),
	"city" varchar(100) NOT NULL,
	"state" varchar(100) NOT NULL,
	"postal_code" varchar(20) NOT NULL,
	"country" varchar(100) DEFAULT 'India' NOT NULL,
	"is_default" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"vendor_id" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"description" text,
	"short_description" varchar(500),
	"thumbnail_url" text,
	"is_rentable" boolean DEFAULT true NOT NULL,
	"is_published" boolean DEFAULT false NOT NULL,
	"deleted_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_variants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"product_id" uuid NOT NULL,
	"sku" varchar(100) NOT NULL,
	"name" varchar(255) NOT NULL,
	"cost_price" numeric(12,2),
	"sales_price" numeric(12,2),
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "attributes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"vendor_id" uuid NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "attribute_values" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"attribute_id" uuid NOT NULL,
	"value" varchar(100) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "variant_values" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"variant_id" uuid NOT NULL,
	"attribute_value_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rental_rates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"variant_id" uuid NOT NULL,
	"unit" "rental_unit" NOT NULL,
	"duration" integer DEFAULT 1 NOT NULL,
	"price" numeric(12,2) NOT NULL,
	"minimum_quantity" integer DEFAULT 1 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "rental_rates_duration_positive" CHECK ("duration" > 0),
	CONSTRAINT "rental_rates_price_non_negative" CHECK ("price" >= 0),
	CONSTRAINT "rental_rates_minimum_quantity_positive" CHECK ("minimum_quantity" > 0)
);
--> statement-breakpoint
CREATE TABLE "inventory_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"vendor_id" uuid NOT NULL,
	"variant_id" uuid NOT NULL,
	"location_id" uuid NOT NULL,
	"quantity_on_hand" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "inventory_quantity_non_negative" CHECK ("quantity_on_hand" >= 0)
);
--> statement-breakpoint
CREATE TABLE "stock_movements" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"vendor_id" uuid NOT NULL,
	"variant_id" uuid NOT NULL,
	"type" "stock_movement_type" NOT NULL,
	"quantity" integer NOT NULL,
	"from_location_id" uuid,
	"to_location_id" uuid,
	"reference_type" text,
	"reference_id" uuid,
	"notes" text,
	"performed_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pickups" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"pickup_number" varchar(50) NOT NULL UNIQUE,
	"rental_order_id" uuid NOT NULL,
	"vendor_id" uuid NOT NULL,
	"status" "pickup_status" DEFAULT 'PENDING'::"pickup_status" NOT NULL,
	"scheduled_at" timestamp with time zone,
	"picked_up_at" timestamp with time zone,
	"instructions" text,
	"processed_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pickup_lines" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"pickup_id" uuid NOT NULL,
	"rental_order_line_id" uuid NOT NULL,
	"variant_id" uuid NOT NULL,
	"expected_quantity" integer NOT NULL,
	"picked_quantity" integer DEFAULT 0 NOT NULL,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "returns" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"return_number" varchar(50) NOT NULL UNIQUE,
	"rental_order_id" uuid NOT NULL,
	"vendor_id" uuid NOT NULL,
	"status" "return_status" DEFAULT 'PENDING'::"return_status" NOT NULL,
	"expected_at" timestamp with time zone NOT NULL,
	"returned_at" timestamp with time zone,
	"late_fee" numeric(12,2) DEFAULT '0' NOT NULL,
	"damage_fee" numeric(12,2) DEFAULT '0' NOT NULL,
	"processed_by" text,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "return_lines" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"return_id" uuid NOT NULL,
	"rental_order_line_id" uuid NOT NULL,
	"variant_id" uuid NOT NULL,
	"expected_quantity" integer NOT NULL,
	"returned_quantity" integer DEFAULT 0 NOT NULL,
	"condition" "return_condition",
	"damage_fee" numeric(12,2) DEFAULT '0' NOT NULL,
	"damage_notes" text
);
--> statement-breakpoint
CREATE TABLE "quotations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"quotation_number" varchar(50) NOT NULL UNIQUE,
	"vendor_id" uuid NOT NULL,
	"customer_id" uuid NOT NULL,
	"billing_address_id" uuid,
	"shipping_address_id" uuid,
	"status" "quotation_status" DEFAULT 'DRAFT'::"quotation_status" NOT NULL,
	"valid_until" timestamp with time zone,
	"subtotal" numeric(12,2) DEFAULT '0' NOT NULL,
	"discount_amount" numeric(12,2) DEFAULT '0' NOT NULL,
	"tax_amount" numeric(12,2) DEFAULT '0' NOT NULL,
	"total_amount" numeric(12,2) DEFAULT '0' NOT NULL,
	"notes" text,
	"sent_at" timestamp with time zone,
	"accepted_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quotation_lines" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"quotation_id" uuid NOT NULL,
	"variant_id" uuid NOT NULL,
	"description" varchar(500) NOT NULL,
	"quantity" integer NOT NULL,
	"rental_start" timestamp with time zone NOT NULL,
	"rental_end" timestamp with time zone NOT NULL,
	"pricing_unit" "rental_unit" NOT NULL,
	"pricing_duration" integer DEFAULT 1 NOT NULL,
	"unit_price" numeric(12,2) NOT NULL,
	"subtotal" numeric(12,2) NOT NULL,
	"discount_amount" numeric(12,2) DEFAULT '0' NOT NULL,
	"tax_rate" numeric(5,2) DEFAULT '0' NOT NULL,
	"tax_amount" numeric(12,2) DEFAULT '0' NOT NULL,
	"total_amount" numeric(12,2) NOT NULL,
	CONSTRAINT "quotation_lines_quantity_positive" CHECK ("quantity" > 0),
	CONSTRAINT "quotation_lines_valid_period" CHECK ("rental_end" > "rental_start")
);
--> statement-breakpoint
CREATE TABLE "rental_orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"order_number" varchar(50) NOT NULL UNIQUE,
	"quotation_id" uuid,
	"vendor_id" uuid NOT NULL,
	"customer_id" uuid NOT NULL,
	"billing_address_id" uuid,
	"shipping_address_id" uuid,
	"status" "rental_order_status" DEFAULT 'DRAFT'::"rental_order_status" NOT NULL,
	"payment_status" "payment_status" DEFAULT 'UNPAID'::"payment_status" NOT NULL,
	"pickup_status" "pickup_status" DEFAULT 'PENDING'::"pickup_status" NOT NULL,
	"return_status" "return_status" DEFAULT 'PENDING'::"return_status" NOT NULL,
	"rental_start" timestamp with time zone NOT NULL,
	"rental_end" timestamp with time zone NOT NULL,
	"subtotal" numeric(12,2) NOT NULL,
	"discount_amount" numeric(12,2) DEFAULT '0' NOT NULL,
	"tax_amount" numeric(12,2) DEFAULT '0' NOT NULL,
	"deposit_amount" numeric(12,2) DEFAULT '0' NOT NULL,
	"late_fee_amount" numeric(12,2) DEFAULT '0' NOT NULL,
	"damage_fee_amount" numeric(12,2) DEFAULT '0' NOT NULL,
	"total_amount" numeric(12,2) NOT NULL,
	"confirmed_at" timestamp with time zone,
	"completed_at" timestamp with time zone,
	"cancelled_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rental_order_lines" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"rental_order_id" uuid NOT NULL,
	"variant_id" uuid NOT NULL,
	"description" varchar(500) NOT NULL,
	"quantity" integer NOT NULL,
	"rental_start" timestamp with time zone NOT NULL,
	"rental_end" timestamp with time zone NOT NULL,
	"pricing_unit" "rental_unit" NOT NULL,
	"pricing_duration" integer DEFAULT 1 NOT NULL,
	"unit_price" numeric(12,2) NOT NULL,
	"subtotal" numeric(12,2) NOT NULL,
	"tax_rate" numeric(5,2) DEFAULT '0' NOT NULL,
	"tax_amount" numeric(12,2) DEFAULT '0' NOT NULL,
	"total_amount" numeric(12,2) NOT NULL,
	CONSTRAINT "rental_order_lines_quantity_positive" CHECK ("quantity" > 0),
	CONSTRAINT "rental_order_lines_valid_period" CHECK ("rental_end" > "rental_start")
);
--> statement-breakpoint
CREATE TABLE "reservations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"vendor_id" uuid NOT NULL,
	"rental_order_id" uuid NOT NULL,
	"rental_order_line_id" uuid NOT NULL,
	"variant_id" uuid NOT NULL,
	"quantity" integer NOT NULL,
	"start_at" timestamp with time zone NOT NULL,
	"end_at" timestamp with time zone NOT NULL,
	"status" "reservation_status" DEFAULT 'RESERVED'::"reservation_status" NOT NULL,
	"released_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "reservations_quantity_positive" CHECK ("quantity" > 0),
	CONSTRAINT "reservations_valid_period" CHECK ("end_at" > "start_at")
);
--> statement-breakpoint
CREATE TABLE "taxes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"vendor_id" uuid NOT NULL,
	"name" varchar(100) NOT NULL,
	"rate" numeric(5,2) NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "invoices" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"invoice_number" varchar(50) NOT NULL UNIQUE,
	"rental_order_id" uuid NOT NULL,
	"vendor_id" uuid NOT NULL,
	"customer_id" uuid NOT NULL,
	"status" "invoice_status" DEFAULT 'DRAFT'::"invoice_status" NOT NULL,
	"customer_name" varchar(255) NOT NULL,
	"company_name" varchar(255),
	"gstin" varchar(15),
	"billing_address_snapshot" text NOT NULL,
	"subtotal" numeric(12,2) NOT NULL,
	"discount_amount" numeric(12,2) DEFAULT '0' NOT NULL,
	"tax_amount" numeric(12,2) DEFAULT '0' NOT NULL,
	"total_amount" numeric(12,2) NOT NULL,
	"paid_amount" numeric(12,2) DEFAULT '0' NOT NULL,
	"balance_amount" numeric(12,2) NOT NULL,
	"issued_at" timestamp with time zone,
	"due_at" timestamp with time zone,
	"paid_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "invoice_lines" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"invoice_id" uuid NOT NULL,
	"type" "invoice_line_type" DEFAULT 'RENTAL'::"invoice_line_type" NOT NULL,
	"description" varchar(500) NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"unit_price" numeric(12,2) NOT NULL,
	"subtotal" numeric(12,2) NOT NULL,
	"tax_rate" numeric(5,2) DEFAULT '0' NOT NULL,
	"tax_amount" numeric(12,2) DEFAULT '0' NOT NULL,
	"total_amount" numeric(12,2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"invoice_id" uuid NOT NULL,
	"rental_order_id" uuid NOT NULL,
	"customer_id" uuid NOT NULL,
	"vendor_id" uuid NOT NULL,
	"amount" numeric(12,2) NOT NULL,
	"method" "payment_method" NOT NULL,
	"provider" varchar(100),
	"provider_payment_id" varchar(255),
	"provider_order_id" varchar(255),
	"status" "transaction_status" DEFAULT 'PENDING'::"transaction_status" NOT NULL,
	"paid_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "deposits" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"rental_order_id" uuid NOT NULL,
	"amount" numeric(12,2) NOT NULL,
	"status" "deposit_status" DEFAULT 'REQUIRED'::"deposit_status" NOT NULL,
	"collected_amount" numeric(12,2) DEFAULT '0' NOT NULL,
	"deducted_amount" numeric(12,2) DEFAULT '0' NOT NULL,
	"refunded_amount" numeric(12,2) DEFAULT '0' NOT NULL,
	"collected_at" timestamp with time zone,
	"refunded_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" text NOT NULL,
	"type" "notification_type" NOT NULL,
	"title" text NOT NULL,
	"message" text NOT NULL,
	"entity_type" text,
	"entity_id" uuid,
	"read_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "organizations_type_idx" ON "organizations" ("type");--> statement-breakpoint
CREATE INDEX "organizations_status_idx" ON "organizations" ("status");--> statement-breakpoint
CREATE UNIQUE INDEX "organization_members_org_user_uidx" ON "organization_members" ("organization_id","user_id");--> statement-breakpoint
CREATE INDEX "organization_members_user_idx" ON "organization_members" ("user_id");--> statement-breakpoint
CREATE INDEX "addresses_organization_idx" ON "addresses" ("organization_id");--> statement-breakpoint
CREATE INDEX "products_vendor_idx" ON "products" ("vendor_id");--> statement-breakpoint
CREATE UNIQUE INDEX "products_vendor_slug_uidx" ON "products" ("vendor_id","slug");--> statement-breakpoint
CREATE INDEX "product_variants_product_idx" ON "product_variants" ("product_id");--> statement-breakpoint
CREATE UNIQUE INDEX "product_variants_product_sku_uidx" ON "product_variants" ("product_id","sku");--> statement-breakpoint
CREATE UNIQUE INDEX "attributes_vendor_slug_uidx" ON "attributes" ("vendor_id","slug");--> statement-breakpoint
CREATE INDEX "attribute_values_attribute_idx" ON "attribute_values" ("attribute_id");--> statement-breakpoint
CREATE UNIQUE INDEX "attribute_values_attribute_value_uidx" ON "attribute_values" ("attribute_id","value");--> statement-breakpoint
CREATE UNIQUE INDEX "variant_values_variant_value_uidx" ON "variant_values" ("variant_id","attribute_value_id");--> statement-breakpoint
CREATE INDEX "variant_values_variant_idx" ON "variant_values" ("variant_id");--> statement-breakpoint
CREATE INDEX "rental_rates_variant_idx" ON "rental_rates" ("variant_id");--> statement-breakpoint
CREATE UNIQUE INDEX "rental_rates_variant_unit_duration_uidx" ON "rental_rates" ("variant_id","unit","duration");--> statement-breakpoint
CREATE UNIQUE INDEX "inventory_variant_location_uidx" ON "inventory_items" ("variant_id","location_id");--> statement-breakpoint
CREATE INDEX "inventory_vendor_idx" ON "inventory_items" ("vendor_id");--> statement-breakpoint
CREATE INDEX "inventory_variant_idx" ON "inventory_items" ("variant_id");--> statement-breakpoint
CREATE INDEX "stock_movements_variant_idx" ON "stock_movements" ("variant_id");--> statement-breakpoint
CREATE INDEX "stock_movements_vendor_idx" ON "stock_movements" ("vendor_id");--> statement-breakpoint
CREATE INDEX "stock_movements_reference_idx" ON "stock_movements" ("reference_type","reference_id");--> statement-breakpoint
CREATE INDEX "pickups_order_idx" ON "pickups" ("rental_order_id");--> statement-breakpoint
CREATE INDEX "pickups_vendor_status_idx" ON "pickups" ("vendor_id","status");--> statement-breakpoint
CREATE INDEX "pickup_lines_pickup_idx" ON "pickup_lines" ("pickup_id");--> statement-breakpoint
CREATE INDEX "returns_order_idx" ON "returns" ("rental_order_id");--> statement-breakpoint
CREATE INDEX "returns_expected_idx" ON "returns" ("expected_at");--> statement-breakpoint
CREATE INDEX "return_lines_return_idx" ON "return_lines" ("return_id");--> statement-breakpoint
CREATE INDEX "quotations_vendor_idx" ON "quotations" ("vendor_id");--> statement-breakpoint
CREATE INDEX "quotations_customer_idx" ON "quotations" ("customer_id");--> statement-breakpoint
CREATE INDEX "quotations_status_idx" ON "quotations" ("status");--> statement-breakpoint
CREATE INDEX "quotation_lines_quotation_idx" ON "quotation_lines" ("quotation_id");--> statement-breakpoint
CREATE INDEX "quotation_lines_variant_idx" ON "quotation_lines" ("variant_id");--> statement-breakpoint
CREATE INDEX "rental_orders_vendor_idx" ON "rental_orders" ("vendor_id");--> statement-breakpoint
CREATE INDEX "rental_orders_customer_idx" ON "rental_orders" ("customer_id");--> statement-breakpoint
CREATE INDEX "rental_orders_status_idx" ON "rental_orders" ("status");--> statement-breakpoint
CREATE INDEX "rental_orders_period_idx" ON "rental_orders" ("rental_start","rental_end");--> statement-breakpoint
CREATE INDEX "rental_order_lines_order_idx" ON "rental_order_lines" ("rental_order_id");--> statement-breakpoint
CREATE INDEX "rental_order_lines_variant_idx" ON "rental_order_lines" ("variant_id");--> statement-breakpoint
CREATE INDEX "reservations_variant_idx" ON "reservations" ("variant_id");--> statement-breakpoint
CREATE INDEX "reservations_order_idx" ON "reservations" ("rental_order_id");--> statement-breakpoint
CREATE INDEX "reservations_availability_idx" ON "reservations" ("variant_id","status","start_at","end_at");--> statement-breakpoint
CREATE UNIQUE INDEX "taxes_vendor_name_uidx" ON "taxes" ("vendor_id","name");--> statement-breakpoint
CREATE INDEX "invoices_order_idx" ON "invoices" ("rental_order_id");--> statement-breakpoint
CREATE INDEX "invoices_vendor_idx" ON "invoices" ("vendor_id");--> statement-breakpoint
CREATE INDEX "invoices_customer_idx" ON "invoices" ("customer_id");--> statement-breakpoint
CREATE INDEX "invoices_status_idx" ON "invoices" ("status");--> statement-breakpoint
CREATE INDEX "invoice_lines_invoice_idx" ON "invoice_lines" ("invoice_id");--> statement-breakpoint
CREATE INDEX "payments_invoice_idx" ON "payments" ("invoice_id");--> statement-breakpoint
CREATE INDEX "payments_order_idx" ON "payments" ("rental_order_id");--> statement-breakpoint
CREATE INDEX "payments_vendor_idx" ON "payments" ("vendor_id");--> statement-breakpoint
CREATE INDEX "deposits_order_idx" ON "deposits" ("rental_order_id");--> statement-breakpoint
CREATE INDEX "notifications_user_idx" ON "notifications" ("user_id");--> statement-breakpoint
CREATE INDEX "notifications_user_read_idx" ON "notifications" ("user_id","read_at");--> statement-breakpoint
ALTER TABLE "organization_members" ADD CONSTRAINT "organization_members_organization_id_organizations_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "organization_members" ADD CONSTRAINT "organization_members_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_organization_id_organizations_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_vendor_id_organizations_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "organizations"("id");--> statement-breakpoint
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_product_id_products_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "attributes" ADD CONSTRAINT "attributes_vendor_id_organizations_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "organizations"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "attribute_values" ADD CONSTRAINT "attribute_values_attribute_id_attributes_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "attributes"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "variant_values" ADD CONSTRAINT "variant_values_variant_id_product_variants_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "product_variants"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "variant_values" ADD CONSTRAINT "variant_values_attribute_value_id_attribute_values_id_fkey" FOREIGN KEY ("attribute_value_id") REFERENCES "attribute_values"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "rental_rates" ADD CONSTRAINT "rental_rates_variant_id_product_variants_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "product_variants"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "inventory_items" ADD CONSTRAINT "inventory_items_vendor_id_organizations_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "organizations"("id");--> statement-breakpoint
ALTER TABLE "inventory_items" ADD CONSTRAINT "inventory_items_variant_id_product_variants_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "product_variants"("id");--> statement-breakpoint
ALTER TABLE "inventory_items" ADD CONSTRAINT "inventory_items_location_id_addresses_id_fkey" FOREIGN KEY ("location_id") REFERENCES "addresses"("id");--> statement-breakpoint
ALTER TABLE "stock_movements" ADD CONSTRAINT "stock_movements_vendor_id_organizations_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "organizations"("id");--> statement-breakpoint
ALTER TABLE "stock_movements" ADD CONSTRAINT "stock_movements_variant_id_product_variants_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "product_variants"("id");--> statement-breakpoint
ALTER TABLE "stock_movements" ADD CONSTRAINT "stock_movements_from_location_id_addresses_id_fkey" FOREIGN KEY ("from_location_id") REFERENCES "addresses"("id");--> statement-breakpoint
ALTER TABLE "stock_movements" ADD CONSTRAINT "stock_movements_to_location_id_addresses_id_fkey" FOREIGN KEY ("to_location_id") REFERENCES "addresses"("id");--> statement-breakpoint
ALTER TABLE "stock_movements" ADD CONSTRAINT "stock_movements_performed_by_user_id_fkey" FOREIGN KEY ("performed_by") REFERENCES "user"("id");--> statement-breakpoint
ALTER TABLE "pickups" ADD CONSTRAINT "pickups_rental_order_id_rental_orders_id_fkey" FOREIGN KEY ("rental_order_id") REFERENCES "rental_orders"("id");--> statement-breakpoint
ALTER TABLE "pickups" ADD CONSTRAINT "pickups_vendor_id_organizations_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "organizations"("id");--> statement-breakpoint
ALTER TABLE "pickups" ADD CONSTRAINT "pickups_processed_by_user_id_fkey" FOREIGN KEY ("processed_by") REFERENCES "user"("id");--> statement-breakpoint
ALTER TABLE "pickup_lines" ADD CONSTRAINT "pickup_lines_pickup_id_pickups_id_fkey" FOREIGN KEY ("pickup_id") REFERENCES "pickups"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "pickup_lines" ADD CONSTRAINT "pickup_lines_rental_order_line_id_rental_order_lines_id_fkey" FOREIGN KEY ("rental_order_line_id") REFERENCES "rental_order_lines"("id");--> statement-breakpoint
ALTER TABLE "pickup_lines" ADD CONSTRAINT "pickup_lines_variant_id_product_variants_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "product_variants"("id");--> statement-breakpoint
ALTER TABLE "returns" ADD CONSTRAINT "returns_rental_order_id_rental_orders_id_fkey" FOREIGN KEY ("rental_order_id") REFERENCES "rental_orders"("id");--> statement-breakpoint
ALTER TABLE "returns" ADD CONSTRAINT "returns_vendor_id_organizations_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "organizations"("id");--> statement-breakpoint
ALTER TABLE "returns" ADD CONSTRAINT "returns_processed_by_user_id_fkey" FOREIGN KEY ("processed_by") REFERENCES "user"("id");--> statement-breakpoint
ALTER TABLE "return_lines" ADD CONSTRAINT "return_lines_return_id_returns_id_fkey" FOREIGN KEY ("return_id") REFERENCES "returns"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "return_lines" ADD CONSTRAINT "return_lines_rental_order_line_id_rental_order_lines_id_fkey" FOREIGN KEY ("rental_order_line_id") REFERENCES "rental_order_lines"("id");--> statement-breakpoint
ALTER TABLE "return_lines" ADD CONSTRAINT "return_lines_variant_id_product_variants_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "product_variants"("id");--> statement-breakpoint
ALTER TABLE "quotations" ADD CONSTRAINT "quotations_vendor_id_organizations_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "organizations"("id");--> statement-breakpoint
ALTER TABLE "quotations" ADD CONSTRAINT "quotations_customer_id_organizations_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "organizations"("id");--> statement-breakpoint
ALTER TABLE "quotations" ADD CONSTRAINT "quotations_billing_address_id_addresses_id_fkey" FOREIGN KEY ("billing_address_id") REFERENCES "addresses"("id");--> statement-breakpoint
ALTER TABLE "quotations" ADD CONSTRAINT "quotations_shipping_address_id_addresses_id_fkey" FOREIGN KEY ("shipping_address_id") REFERENCES "addresses"("id");--> statement-breakpoint
ALTER TABLE "quotation_lines" ADD CONSTRAINT "quotation_lines_quotation_id_quotations_id_fkey" FOREIGN KEY ("quotation_id") REFERENCES "quotations"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "quotation_lines" ADD CONSTRAINT "quotation_lines_variant_id_product_variants_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "product_variants"("id");--> statement-breakpoint
ALTER TABLE "rental_orders" ADD CONSTRAINT "rental_orders_quotation_id_quotations_id_fkey" FOREIGN KEY ("quotation_id") REFERENCES "quotations"("id");--> statement-breakpoint
ALTER TABLE "rental_orders" ADD CONSTRAINT "rental_orders_vendor_id_organizations_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "organizations"("id");--> statement-breakpoint
ALTER TABLE "rental_orders" ADD CONSTRAINT "rental_orders_customer_id_organizations_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "organizations"("id");--> statement-breakpoint
ALTER TABLE "rental_orders" ADD CONSTRAINT "rental_orders_billing_address_id_addresses_id_fkey" FOREIGN KEY ("billing_address_id") REFERENCES "addresses"("id");--> statement-breakpoint
ALTER TABLE "rental_orders" ADD CONSTRAINT "rental_orders_shipping_address_id_addresses_id_fkey" FOREIGN KEY ("shipping_address_id") REFERENCES "addresses"("id");--> statement-breakpoint
ALTER TABLE "rental_order_lines" ADD CONSTRAINT "rental_order_lines_rental_order_id_rental_orders_id_fkey" FOREIGN KEY ("rental_order_id") REFERENCES "rental_orders"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "rental_order_lines" ADD CONSTRAINT "rental_order_lines_variant_id_product_variants_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "product_variants"("id");--> statement-breakpoint
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_vendor_id_organizations_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "organizations"("id");--> statement-breakpoint
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_rental_order_id_rental_orders_id_fkey" FOREIGN KEY ("rental_order_id") REFERENCES "rental_orders"("id");--> statement-breakpoint
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_rental_order_line_id_rental_order_lines_id_fkey" FOREIGN KEY ("rental_order_line_id") REFERENCES "rental_order_lines"("id");--> statement-breakpoint
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_variant_id_product_variants_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "product_variants"("id");--> statement-breakpoint
ALTER TABLE "taxes" ADD CONSTRAINT "taxes_vendor_id_organizations_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "organizations"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_rental_order_id_rental_orders_id_fkey" FOREIGN KEY ("rental_order_id") REFERENCES "rental_orders"("id");--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_vendor_id_organizations_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "organizations"("id");--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_customer_id_organizations_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "organizations"("id");--> statement-breakpoint
ALTER TABLE "invoice_lines" ADD CONSTRAINT "invoice_lines_invoice_id_invoices_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_invoice_id_invoices_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id");--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_rental_order_id_rental_orders_id_fkey" FOREIGN KEY ("rental_order_id") REFERENCES "rental_orders"("id");--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_customer_id_organizations_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "organizations"("id");--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_vendor_id_organizations_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "organizations"("id");--> statement-breakpoint
ALTER TABLE "deposits" ADD CONSTRAINT "deposits_rental_order_id_rental_orders_id_fkey" FOREIGN KEY ("rental_order_id") REFERENCES "rental_orders"("id");--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;
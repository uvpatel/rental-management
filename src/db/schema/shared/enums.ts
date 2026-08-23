import { pgEnum } from "drizzle-orm/pg-core";

export const platformRoleEnum = pgEnum("platform_role", [
  "ADMIN",
  "USER",
]);

export const organizationTypeEnum = pgEnum("organization_type", [
  "VENDOR",
  "CUSTOMER",
]);

export const organizationStatusEnum = pgEnum("organization_status", [
  "ACTIVE",
  "SUSPENDED",
  "INACTIVE",
]);

export const organizationMemberRoleEnum = pgEnum(
  "organization_member_role",
  ["OWNER", "MANAGER", "STAFF", "MEMBER"],
);

export const addressTypeEnum = pgEnum("address_type", [
  "BILLING",
  "SHIPPING",
  "WAREHOUSE",
]);

export const rentalUnitEnum = pgEnum("rental_unit", [
  "HOUR",
  "DAY",
  "WEEK",
  "CUSTOM",
]);

export const quotationStatusEnum = pgEnum("quotation_status", [
  "DRAFT",
  "SENT",
  "ACCEPTED",
  "REJECTED",
  "EXPIRED",
  "CONVERTED",
  "CANCELLED",
]);

export const rentalOrderStatusEnum = pgEnum("rental_order_status", [
  "DRAFT",
  "CONFIRMED",
  "READY_FOR_PICKUP",
  "ACTIVE",
  "RETURN_DUE",
  "RETURNED",
  "COMPLETED",
  "CANCELLED",
]);

export const paymentStatusEnum = pgEnum("payment_status", [
  "UNPAID",
  "PARTIALLY_PAID",
  "PAID",
  "REFUNDED",
]);

export const pickupStatusEnum = pgEnum("pickup_status", [
  "PENDING",
  "READY",
  "COMPLETED",
  "CANCELLED",
]);

export const returnStatusEnum = pgEnum("return_status", [
  "PENDING",
  "PARTIAL",
  "COMPLETED",
]);

export const reservationStatusEnum = pgEnum("reservation_status", [
  "RESERVED",
  "ACTIVE",
  "COMPLETED",
  "CANCELLED",
]);

export const stockMovementTypeEnum = pgEnum("stock_movement_type", [
  "PURCHASE",
  "ADJUSTMENT",
  "PICKUP",
  "RETURN",
  "DAMAGE",
  "LOSS",
]);

export const returnConditionEnum = pgEnum("return_condition", [
  "GOOD",
  "DAMAGED",
  "LOST",
]);

export const invoiceStatusEnum = pgEnum("invoice_status", [
  "DRAFT",
  "ISSUED",
  "PARTIALLY_PAID",
  "PAID",
  "OVERDUE",
  "CANCELLED",
]);

export const invoiceLineTypeEnum = pgEnum("invoice_line_type", [
  "RENTAL",
  "LATE_FEE",
  "DAMAGE_FEE",
  "DELIVERY",
  "DISCOUNT",
  "OTHER",
]);

export const paymentMethodEnum = pgEnum("payment_method", [
  "CARD",
  "UPI",
  "BANK_TRANSFER",
  "CASH",
  "ONLINE",
]);

export const transactionStatusEnum = pgEnum("transaction_status", [
  "PENDING",
  "PROCESSING",
  "SUCCEEDED",
  "FAILED",
  "REFUNDED",
  "PARTIALLY_REFUNDED",
]);

export const depositStatusEnum = pgEnum("deposit_status", [
  "REQUIRED",
  "COLLECTED",
  "HELD",
  "PARTIALLY_DEDUCTED",
  "REFUNDED",
  "FORFEITED",
]);

export const notificationTypeEnum = pgEnum("notification_type", [
  "RETURN_REMINDER",
  "RETURN_OVERDUE",
  "PAYMENT_RECEIVED",
  "PAYMENT_DUE",
  "ORDER_CONFIRMED",
  "PICKUP_READY",
]);
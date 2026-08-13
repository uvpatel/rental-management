Rental Management System
Problem Overview
Build a Rental Management System that enables businesses to rent products online while
managing quotations, rental orders, inventory, invoicing, and returns.
The system must support Customers, Vendors, and Admins, and should follow a complete
rental lifecycle, from product browsing and quotation creation to payment, invoicing, pickup,
return, and reporting.
Objectives
● Implement an end-to-end rental flow
● Prevent overbooking through reservation logic
● Support flexible rental durations and time-based pricing
● Generate invoices with partial or full payments
● Provide dashboards and reports for business insights
User Roles
1. Customer (End User)
● Accesses the website portal
● Browses rentable products
● Creates rental quotations
● Confirms orders and makes payments
● Views invoices and order history
2. Vendor (Internal User)
● Manages rental products
● Views and processes rental orders
● Creates invoices
● Tracks pickups, returns, and earnings
3. Admin (System Administrator)
● Full access to backend (Settings, Users, Reports)
● Manages vendors, products, and configurations
● Views global analytics and reports
Core Functional Modules
1. Authentication & User Management
Features:
● Login using email and password
● Signup via website with:
○ Name
○ Email
○ Company Name
○ GSTIN (mandatory for invoicing)
○ Password & confirmation
● Forgot password with email verification
● Coupon code support during signup
2. Rental Product Management
Product Configuration:
● Products marked as Rentable
● Rental pricing per:
○ Hour
○ Day
○ Week
○ Custom period
● Quantity on hand
● Cost price & sales price
● Publish / Unpublish on website
Attributes & Variants:
● Product attributes (e.g., Brand, Color)
● Variant-based pricing
● Attribute values configurable from Settings
3. Rental Quotations & Orders
Rental Flow:
1. Quotation
○ Created when customer adds products to cart
○ Editable until confirmation
2. Rental Order
○ Created when quotation is confirmed
○ Automatically reserves stock
3. Sales Order Status
○ Draft → Sent → Confirmed
Key Rules:
● Reserved products cannot be double-booked
● Rental period blocks availability
● Order lines include rental start & end dates
4. Pickup, Delivery & Return Flow
Pickup:
● Pickup document generated on order confirmation
● Stock moved to “With Customer”
● Pickup instructions visible to vendor
Return:
● Return document generated when rental ends
● Stock restored after return
● Late return fees applied automatically
Notifications:
● Automated reminders before return date
● Alerts for delayed returns
5. Invoicing & Payments
Invoice Features:
● Draft invoice created from rental order
● Supports:
○ Full upfront payment
○ Partial payment / security deposit
● Taxes calculated automatically
● Print & export invoice
Payment:
● Online payment gateway integration
● Payment confirmation updates invoice state
6. Website & Customer Portal
Website Features:
● Product listing with filters
● Product detail page with rental configuration
● Cart and checkout flow
● Address & payment selection
Portal Features:
● View rental orders
● Download invoices
● Order status tracking
7. Settings & Configuration
Admin Settings:
● Rental periods (Hourly, Daily, Weekly)
● Product attributes & values
● User roles (Admin / Vendor / Customer)
● GST and company details
User Profile:
● Company information
● GSTIN
● Password change
8. Reports & Dashboards
Dashboards:
● Total rental revenue
● Most rented products
● Vendor-wise performance
● Order trends over time
Reports:
● Exportable reports (PDF, XLSX, CSV)
● Date-range filters
● Separate views for Admin and Vendor
Terminology & Document Reference
- Quotation: It is a price proposal sent to a customer before an order is confirmed.
- Rental Order: It is a confirmed agreement that products will be rented for a specific
period.
- Reservation: It ensures that a product cannot be rented by multiple customers at the
same time.
- Invoice: It is a legal financial document requesting payment from the customer.
- Security deposit: It is an amount collected upfront to protect against damage or late
returns.
- Vendor: A vendor is a business user who owns rental products.
- Admin: It is the super user of the system.
Deliverables (Hackathon Evaluation)
Participants must deliver:
● Functional rental flow (Quotation → Order → Invoice → Return)
● Website + backend integration
● Role-based access implementation
● At least one dashboard or report
● Clean UI aligned with business flow
Learning Outcomes
By completing this problem statement, students will demonstrate:
● Practical understanding of ERP workflows
● Ability to model real-world rental businesses
● Full-stack thinking
Mockup: https://link.excalidraw.com/l/65VNwvy7c4X/3tAPpflFLrG
**BudgetPal — Personal Finance Tracker API**

BudgetPal is a RESTful API that helps users take control of their personal finances by tracking income and expenses, managing category-based budgets, and generating spending reports.

**Core Features**

Users authenticate securely via JWT. Once in, they can log transactions (income or expenses) with a category, amount, description, and date — with full CRUD support. They can also set monthly spending limits per category, and the system automatically monitors their transactions against those limits, flagging when they're approaching or have exceeded their budget.

The reporting layer goes beyond basic data retrieval — users can query total income vs expenses, spending breakdowns by category, and month-by-month overviews, all driven by real aggregation logic.

**Email Service**

The application integrates an email service (Nodemailer) to handle transactional and notification emails including: welcome emails on registration, forgot password and password reset flows, budget alert notifications (at 80% and 100% of a budget limit), monthly spending summary emails, and on-demand report delivery via email.

**Additional**

All inputs are validated with express-validator and every error response follows a consistent JSON structure. The API is versioned under `/api/v1/`, fully documented with Swagger, and ships with a lightweight EJS web interface for visual testing of the core flows.

**Stack:** Node.js, Express.js, MySQL (Sequelize), Nodemailer, EJS

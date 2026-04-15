## Project Overview

### Timeline

1 week

---

## Technologies & Tools Used

- **Frontend:** React + Vite
- **Styling:** Tailwindcss
- **Routing:** React Router DOM
- **Charts** Reaviz (PieChart, BarChart)
- **Icons** Lucide React
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT + bcrypt
- **Deployment:** Netlify

---

# DebtFlow: Debt & Repayment Tracker

![DebtFlow Logo](frontend/public/Logo_h.svg)

**Live App:** [Deploy Link Here](https://debtflow-financial.netlify.app/auth/login)

Authors: @Ramakrishnan Jagadesh · @Mathisha Mahawalage

DebtFlow is a dedicated debt management system designed to solve the problem of fragmented financial obligations. Unlike standard budgeting apps that focus on daily expenses, DebtFlow models debt as a time-based liability structure, giving users absolute visibility into their total exposure, repayment progress, and upcoming deadlines.

---

## Approach to Development

### 1. Initial thinking

**The Problem**
Debt is difficult to manage because it is invisible, fragmented, and time-dependent.

**For individuals:**

- No clear view of total financial exposure
- Mental overhead of tracking multiple obligations across lenders
- Missed or delayed payments from poor visibility

**For small businesses:**

- Unpaid invoices create cash flow instability
- Manual tracking via spreadsheets leads to missed deadlines, inconsistent follow-ups, and strained relationships

Debt is not just financial — it creates cognitive stress, social friction, and operational inefficiency.

---

**The Insight**
Most financial apps model cash outflow, not liabilities over time.
They focus on budgeting, expense tracking, and saving goals. What's missing:

- Structured debt objects
- Repayment lifecycle tracking
- Visibility into how debt reduces over time

Debt is not a static number. It is a time-based system of obligations and repayments. Without modeling that system, users cannot predict future burden, prioritise repayments, or maintain financial clarity.

---

**The Solution**

DebtFlow tracks:

- What you owe
- Who you owe it to
- When payments are due
- How each repayment reduces your liability over time

---

### 2. MVP planning

## Key Features

**1.Authentication & Security**

- **Secure Access:** JWT-based authentication for private, encrypted financial sessions.
- **Data Ownership:** Strict authorization ensures you only see and interact with your own debt records.

**2.Debt Management (CRUD)**

- **Structured Entries:** Log Mortgages, Credit Cards, and Personal Loans with detailed parameters (Principal, Due Date, Interest, Frequency).
- **Dynamic Updates and Delete:** Edit terms as they change, such as interest rate hikes or deadline extensions. Delete debts, cascades to remove all related payment records.

**3.Repayment Tracking**

- **Payment Logging:** Log payments against a specific debt — automatically reduces current balance. Subtract payments from the total outstanding balance in real-time. Edit or delete individual payment entries with balance correction.
- **Progress:** Full payment history log per user and Auto-sets debt status to `paidOff` when balance reaches zero

**4.Smart Dashboard**

- **Total Exposure:** A prominent view of your Total outstanding debt and total payments made at a glance. Active debt count and overdue count summary cards.
- **Upcoming Alerts:** A 30-day upcoming payment list with calculated amounts. Overdue detection per frequency type (monthly, annual, one-time). Supports one-off late fee interest calculation on overdue amounts

- **Urgency Flags:** Overdue debts are visually flagged in red for immediate prioritization.

**5. Insights**

- **Data Visualization:** Grouped bar chart: original principal vs remaining balance per debt. Pie chart: debt breakdown by category (mortgage / credit card / loan).

### 3. Wireframe and planning

**App Structure**

```
DebtFlow
│
├── Page 0 → Login / Signup
├── Page 1 → Dashboard
├── Page 2 → All-Debts
├── Page 3 → Log-entry
├── Page 4 → Insights
└── Page 5 → Account Details
```

[Wireframes](../docs/wireframes)
[Planning Doc for Wireframes](https://www.figma.com/design/VqnOCCdcwd31uNRM0Hwmh8/Unit-3?node-id=1-3&t=JcD6dPQ02a6zBhxN-1)

## Styling Approach

- Mobile-first layout using Tailwind CSS utility classes
- Fixed bottom navigation bar for thumb-friendly mobile use
- Card-based layout with consistent `rounded-2xl`, `border-gray-100`, `shadow-sm` treatment
- Semantic colour system: red for overdue, green for paid/active, blue for informational
- Typography hierarchy: `text-[10px] uppercase tracking-widest` labels, `text-lg font-semibold` values

## Future Roadmap

- Payment reminders and overdue email notifications
- 3-month cash flow forecast
- Projected payoff date per debt based on repayment pace
- Export to CSV / PDF
- Receipt and invoice attachments on payment entries
- Multi-currency support
- Business accounts with invoice tracking and multi-user view

## References & Resources

[references](docs/references/references.md)

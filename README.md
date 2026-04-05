## Project Overview

### Timeline

1 week

---

## Technologies & Tools Used

- **Frontend:** React + Vite
- **Styling:** Tailwindcss
- **Routing:** React Router DOM
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT
- **Deployment:** Netlify

---

# DebtFlow: Debt & Repayment Tracker

![DebtFlow Logo][logo]

[logo]: ../DebtFlow-Financial-App/frontend/public/Logo_h.svg

**Live App:** [Deploy Link Here]

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

Debt is not a static number. It is a time-based system of obligations and repayments.

Without modeling that system, users cannot predict future burden, prioritise repayments, or maintain financial clarity.

---

**The Solution**

DebtFlow is a dedicated debt management system that tracks:

- What you owe
- Who you owe it to
- When payments are due
- How each repayment reduces your liability over time

A system that models debt as a time-based liability structure, giving users clear visibility into obligations and repayment progress.

---

### 2. MVP planning

## Key Features

**1.Authentication & Security**

- **Secure Access:** JWT-based authentication for private, encrypted financial sessions.
- **Data Ownership:** Strict authorization ensures you only see and interact with your own debt records.

**2.Debt Management (CRUD)**

- **Structured Entries:** Log Mortgages, Credit Cards, and Personal Loans with detailed parameters (Principal, Due Date, Interest, Frequency).
- **Dynamic Updates:** Edit terms as they change, such as interest rate hikes or deadline extensions.

**3.Repayment Tracking**

- **Payment Logging:** Subtract payments from the total outstanding balance in real-time.
- **Progress Visualization:** Visual progress bars (e.g., "45% Paid"), insights and payment history logs to stay motivated.

**4.Smart Dashboard**

- **Total Exposure:** A prominent view of your total outstanding debt across all accounts.
- **Upcoming Alerts:** A 30-day "Upcoming Payments" list to plan cash flow.

- **Urgency Flags:** Overdue debts are visually flagged in red for immediate prioritization.

### 3. Wireframe and planning

**App Structure**

```
DebtFlow
│
├── Page 0 → Login / Signup
├── Page 1 → Home Dashboard
├── Page 2 → Debt Ticket Form
├── Page 3 → All Tickets
├── Page 5 → Insights
└── Page 6 → Account Details
```

[ Link to the wireframe exports ]
[ Link to Trello / LucidChart / Figma ]

## Styling Approach

- Clean, dashboard-style UI with strong visual hierarchy for quick scanning
- Card-based layout for modular content blocks
- Light theme with semantic colours (red for overdue, green for paid progress)
- Consistent spacing and clear typography via Tailwind CSS

## Future Roadmap

- Business accounts with invoice tracking and multi-user view
- Receipt and invoice attachments on payment entries
- 3-month cash flow forecast
- Payment reminders and overdue email notifications
- Export to CSV / PDF
- Multi-currency support

## References & Resources

Planning Materials: [Link to Trello/LucidChart/Figma]

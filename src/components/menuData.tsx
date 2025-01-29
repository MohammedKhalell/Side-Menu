export interface MenuItem {
  id: string;
  label: string;
  iconName: string;
  subItems?: SubMenuItem[];
  disabled?: boolean;
}

interface SubMenuItem {
  id: string;
  label: string;
  to?: string;
}

export const menuData: MenuItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      iconName: "/icons/home-2.svg",
      subItems: [
        {
          id: "analytics",
          label: "Analytics Dashboard",
          to: "/dashboard/analytics",
        },
        { id: "overview", label: "Overview", to: "/dashboard/overview" },
        { id: "metrics", label: "Key Metrics", to: "/dashboard/metrics" },
      ],
    },
    {
      id: "user-management",
      label: "User Management",
      iconName: "/icons/profile-2user.svg",
      subItems: [
        { id: "users-list", label: "Users List", to: "/users" },
        { id: "roles", label: "Roles & Permissions", to: "/users/roles" },
        { id: "groups", label: "User Groups", to: "/users/groups" },
      ],
    },
    {
      id: "workflow",
      label: "Workflow Management",
      iconName: "/icons/hierarchy-square-3.svg",
    },
    {
      id: "audit",
      label: "Audit Trail",
      iconName: "/icons/receipt-search.svg",
      subItems: [
        { id: "logs", label: "System Logs", to: "/audit/logs" },
        { id: "reports", label: "Audit Reports", to: "/audit/reports" },
        { id: "alerts", label: "Security Alerts", to: "/audit/alerts" },
      ],
    },
    {
      id: "transactions",
      label: "Customer Transactions",
      iconName: "/icons/arrange-square.svg",
      subItems: [
        {
          id: "recent",
          label: "Recent Transactions",
          to: "/transactions/recent",
        },
        { id: "pending", label: "Pending Approval", to: "/transactions/pending" },
      ],
    },
    {
      id: "customer360",
      label: "Customer 360",
      disabled: true,
      iconName: "/icons/briefcase.svg",
    },
    {
      id: "customer-onboarding",
      label: "Customer Onboarding",
      disabled: true,
      iconName: "/icons/user-octagon.svg",
      subItems: [
        {
          id: "new-applications",
          label: "New Applications",
          to: "/onboarding/new",
        },
        {
          id: "verification",
          label: "Verification Queue",
          to: "/onboarding/verify",
        },
        {
          id: "approved",
          label: "Approved Applications",
          to: "/onboarding/approved",
        },
      ],
    },
    {
      id: "complaints",
      label: "Complaints Management",
      iconName: "/icons/message-question.svg",
    },
    {
      id: "trade-finance",
      label: "Trade Finance",
      iconName: "/icons/trade.svg",
    },
    {
      id: "lead-management",
      label: "Lead Management",
      iconName: "/icons/personalcard.svg",
    },
    {
      id: "loan-management",
      label: "Loan Management",
      iconName: "/icons/money-send.svg",
    },
    {
      id: "knowledge-base",
      label: "Knowledge Base",
      iconName: "/icons/book.svg",
    },
    {
      id: "license",
      label: "License Management",
      iconName: "/icons/key-square.svg",
    },
    {
      id: "settings",
      label: "Admin Settings",
      iconName: "/icons/setting-3.svg",
    },
  ];
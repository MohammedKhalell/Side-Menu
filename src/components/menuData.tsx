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
      iconName: "dashboard",
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
      iconName: "user-management",
      subItems: [
        { id: "users-list", label: "Users List", to: "/users" },
        { id: "roles", label: "Roles & Permissions", to: "/users/roles" },
        { id: "groups", label: "User Groups", to: "/users/groups" },
      ],
    },
    {
      id: "workflow",
      label: "Workflow Management",
      iconName: "workflow",
    },
    {
      id: "audit",
      label: "Audit Trail",
      iconName: "audit",
      subItems: [
        { id: "logs", label: "System Logs", to: "/audit/logs" },
        { id: "reports", label: "Audit Reports", to: "/audit/reports" },
        { id: "alerts", label: "Security Alerts", to: "/audit/alerts" },
      ],
    },
    {
      id: "transactions",
      label: "Customer Transactions",
      iconName: "transactions",
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
      iconName: "customer360",
    },
    {
      id: "customer-onboarding",
      label: "Customer Onboarding",
      disabled: true,
      iconName: "customer-onboarding",
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
      iconName: "complaints",
    },
    {
      id: "trade-finance",
      label: "Trade Finance",
      iconName: "trade-finance",
    },
    {
      id: "lead-management",
      label: "Lead Management",
      iconName: "lead-management",
    },
    {
      id: "loan-management",
      label: "Loan Management",
      iconName: "loan-management",
    },
    {
      id: "knowledge-base",
      label: "Knowledge Base",
      iconName: "knowledge-base",
    },
    {
      id: "license",
      label: "License Management",
      iconName: "license",
    },
    {
      id: "settings",
      label: "Admin Settings",
      iconName: "settings",
    },
  ];
export const ROLES = {
  CITIZEN: 'citizen',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin',
};

export const ROLE_HOME_ROUTE = {
  [ROLES.CITIZEN]: '/citizen/dashboard',
  [ROLES.ADMIN]: '/admin/dashboard',
  [ROLES.SUPER_ADMIN]: '/admin/dashboard',
};

export const COMPLAINT_STATUS = ['Pending', 'In Progress', 'Resolved', 'Closed'];
export const COMPLAINT_PRIORITY = ['Low', 'Medium', 'High', 'Critical'];
export const RISK_LEVELS = ['Low', 'Medium', 'High', 'Critical'];

export const AUTH_TOKEN_KEY = 'aquaalert_token';

export const EMERGENCY_HELPLINE = '1077';

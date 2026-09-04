const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s-]{10,15}$/;

export function isValidEmail(value) {
  return EMAIL_RE.test(value.trim());
}

export function isValidPhone(value) {
  return PHONE_RE.test(value.trim());
}

export function isValidEmailOrPhone(value) {
  return isValidEmail(value) || isValidPhone(value);
}

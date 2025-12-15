export function formatPhoneNumber(phone: string): string {
  if (phone.length < 5) return phone;

  return phone[2] === '0' && phone[3] === '0'
    ? `${phone.slice(0, 4)}-${phone.slice(4)}`
    : `${phone.slice(0, 3)}-${phone.slice(3)}`;
}

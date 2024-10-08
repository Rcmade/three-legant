export const cartBreadcrumb = {
  label: "Shopping Cart",
  href: "/user/cart",
} as const;

export const checkoutDetailsBreadcrumb = {
  label: "Checkout Details",
  href: "/user/checkout",
} as const;

export const orderComplete = {
  label: "Order Complete",
  href: "/user/order-complete",
} as const;

export const checkoutBreadcrumb = {
  "/user/cart": cartBreadcrumb,
  "/user/checkout": checkoutDetailsBreadcrumb,
  "/user/order-complete": orderComplete,
} as const;


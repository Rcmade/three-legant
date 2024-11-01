export const defaultShippingType = {
  title: "Free Shipping",
  description: "Free shipping on all orders over $100",
  id: "free-shipping",
  cost: 0,
};

export const shippingContent = [
  defaultShippingType,
  {
    title: "Express Shipping",
    description: "Get your order within two days",
    id: "express-shipping",
    cost: 10,
  },
  {
    title: "Pick Up",
    description: "Pick up your order at the store",
    id: "pick-up",
    cost: 0,
  },
] 

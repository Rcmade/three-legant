import LockIcon from "@/icons/LockIcon";
import TruckIcon from "@/icons/TruckIcon";
import { CompanyValueT } from "@/types";
import { Banknote, Phone } from "lucide-react";

// Only to prevent hydration error
export const companyValueIconContent = {
  truck: TruckIcon,
  banknote: Banknote,
  phone: Phone,
  lock: LockIcon,
};

export const companyValueContent: CompanyValueT[] = [
  {
    title: "Free Shipping",
    sortDesc: "Order over $200",
    Icon: "truck",
  },

  {
    title: "Money Back",
    sortDesc: "30 days guarantee",
    Icon: "banknote",
  },

  {
    title: "Secure Payments",
    sortDesc: "Secured by Stripe",
    Icon: "lock",
  },

  {
    title: "24/7 Support",
    sortDesc: "Phone and Email support",
    Icon: "phone",
  },
];

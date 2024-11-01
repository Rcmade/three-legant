// "use client";
// import React from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { AddressInfoT, ContactInfoT } from "@/types";
// import { addressSchema } from "@/zodSchema/addressSchema";

// const ShippingInfoForm = () => {
//   const form = useForm<AddressInfoT>({
//     resolver: zodResolver(addressSchema),
//     defaultValues: {
//       city: "",
//       country: "",
//       state: "",
//       street: "",
//       zipCode: "",
//     },
//   });

//   // 2. Define a submit handler.
//   function onSubmit(values: AddressInfoT) {
//     console.log(values);
//   }
//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-xl">Shipping Address</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <FormField
//               control={form.control}
//               name="street"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="uppercase">Street Address</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Street Address" {...field} />
//                   </FormControl>

//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="country"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="uppercase">Country</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Country" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="city"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="uppercase">Town/City</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Town/City" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <div className="flex gap-4">
//               <FormField
//                 control={form.control}
//                 name="state"
//                 render={({ field }) => (
//                   <FormItem className="flex-1">
//                     <FormLabel className="uppercase">State</FormLabel>
//                     <FormControl>
//                       <Input placeholder="State" {...field} />
//                     </FormControl>

//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="zipCode"
//                 render={({ field }) => (
//                   <FormItem className="flex-1">
//                     <FormLabel className="uppercase">Zip code</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Zip code" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <Button type="submit">Submit</Button>
//           </CardContent>
//         </Card>
//       </form>
//     </Form>
//   );
// };

// export default ShippingInfoForm;

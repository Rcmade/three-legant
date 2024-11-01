"use client";
import { Editor } from "@/components/RichText";
import EditorInput from "@/components/RichText/editor-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { getProperNumber } from "@/lib/utils/numberUtils";
import { ProductSchemaT } from "@/types";
import { AdminProductDetailsResponseT } from "@/types/apiResponse";
import productSchema from "@/zodSchema/productSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import {
  ChevronDownIcon,
  CircleDot,
  Dot,
  ExternalLink,
  LinkIcon,
  PlusCircle,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { getAdminProductNavigateString } from "@/lib/utils/stringUtils";
import Image from "next/image";

interface ProductUpdateFormProps extends AdminProductDetailsResponseT {}
const ProductUpdateForm = ({ product, variants }: ProductUpdateFormProps) => {
  const form = useForm<ProductSchemaT>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      brand: product.brand || "",
      currentVariantType: product.currentVariantType || "",
      currentVariantValue: product.currentVariantValue || "",
      description: product.description || "",
      discountedPrice: getProperNumber(product.discountedPrice),
      id: product.id || "",
      isAvailable: product.isAvailable || false,
      name: product.name || "",
      primaryImage: product.primaryImage || "",
      price: getProperNumber(product.price),
      sku: product.sku || "",
      sortDescription: product.sortDescription || "",
      stock: product.stock || 0,
      meta: product.meta || {},
    },
    mode: "onBlur",
  });

  const onSubmit = (values: ProductSchemaT) => {
    console.log(values);
  };

  const isLoading = form.formState.isSubmitting;

  console.log(getProperNumber(product.price));

  const allVariants = [
    {
      stock: product.stock,
      id: product.id,
      sku: product.sku,
      price: product.price,
      discountedPrice: product.discountedPrice || product.price,
      isCurrent: true,
      primaryImage: product.primaryImage,
    },
    ...(variants || []).map((variant) => ({
      stock: variant?.stock || 0,
      sku: variant?.sku || "",
      id: variant?.id || "",
      price: variant?.price || "",
      discountedPrice: variant?.discountedPrice || variant?.price || 0,
      isCurrent: false,
      primaryImage: variant?.primaryImage || "",
    })),
  ];

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-full"
        >
          <div className="flex flex-col gap-4">
            <Card className="max-w-full">
              <CardContent className="space-y-4">
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                </CardHeader>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="uppercase">Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sortDescription"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="uppercase">
                        Sort Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={isLoading}
                          placeholder="Sort Description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="uppercase">Description</FormLabel>
                      <FormControl>
                        <EditorInput
                          placeholder="Sort Description"
                          onChange={(e) => {
                            form.setValue("description", e);
                          }}
                          content={product.description}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="uppercase">Brand</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="Brand"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="currentVariantType"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="uppercase">Variant type</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="Brand"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Type the variant type that will be used for this
                        product. This will be used to display the product
                        variants to the user. all the product variants should
                        have same variant otherwise other product variants will
                        be lost.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="currentVariantValue"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="uppercase">Variant Value</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="Variant value"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            <Separator />

            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>Stock</CardTitle>
              </CardHeader>
              <CardContent className="overflow-hidden">
                <Table className="scrollbar block max-w-72 overflow-x-auto xs:max-w-full">
                  <TableHeader className="overflow-x-hidden">
                    <TableRow>
                      <TableHead className="min-w-18 text-xs">Image</TableHead>
                      <TableHead className="min-w-18 text-xs">SKU</TableHead>
                      <TableHead className="min-w-28">Stock</TableHead>
                      <TableHead className="min-w-28">Price</TableHead>
                      <TableHead className="min-w-28 whitespace-nowrap text-right">
                        Discounted Price
                      </TableHead>

                      <TableHead className="text-center">
                        Variant Link
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allVariants.map((v) => {
                      return (
                        <TableRow key={v.id}>
                          <TableCell>
                            <Image
                              alt=""
                              src={v.primaryImage}
                              width={50}
                              height={50}
                            />
                          </TableCell>
                          <TableCell className="font-semibold">
                            <FormField
                              control={form.control}
                              name="sku"
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <FormControl>
                                    <Input
                                      disabled={isLoading}
                                      placeholder="Sku"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell>
                            <FormField
                              control={form.control}
                              name="stock"
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <FormControl>
                                    <Input
                                      disabled={isLoading}
                                      placeholder="Stock"
                                      min={0}
                                      type="number"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell>
                            <FormField
                              control={form.control}
                              name="price"
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <FormControl>
                                    <Input
                                      disabled={isLoading}
                                      placeholder="Price"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell>
                            <FormField
                              control={form.control}
                              name="discountedPrice"
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <FormControl>
                                    <Input
                                      disabled={isLoading}
                                      placeholder="Discount Price"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            {v.isCurrent ? (
                              <span className="flex items-center justify-center text-secondary-red">
                                <CircleDot className="h-6 w-6" />
                              </span>
                            ) : (
                              <Link
                                className="flex items-center justify-center text-secondary-blue"
                                href={getAdminProductNavigateString(v.id)}
                                target="_blank"
                              >
                                <ExternalLink />
                              </Link>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
};

export default ProductUpdateForm;

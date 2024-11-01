import RatingStarButtons from "@/components/buttons/RatingStarButtons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProductCommonAdditionalInfoT } from "@/types";

interface ReviewsProps extends Partial<ProductCommonAdditionalInfoT> {}

const Reviews = ({}: ReviewsProps) => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-medium text-primary">Customer Reviews</h1>
      <div className="flex gap-4">
        <RatingStarButtons rating={5} />
        <span>11 Reviews</span>
      </div>

      <Card className="flex items-center justify-between rounded-lg p-4">
        <h1 className="text-xl font-medium text-primary">Tray table</h1>
        <Button className="rounded-full px-6">Write Review</Button>
      </Card>

      <div className="flex items-center justify-between">
        <span className="text-2xl font-semibold">11 Reviews</span>
        <Select>
          <SelectTrigger className="w-[180px] text-lg font-medium">
            <SelectValue
              placeholder="Newest"
              className="font-bold placeholder:text-2xl"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-[8rem_1fr] grid-rows-1 gap-4">
        <Avatar className="row-start-1 row-end-3 h-16 w-16 max-w-fit">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <h3 className="text-lg font-semibold">Nicolas</h3>
        <RatingStarButtons rating={5} />
        <p className="col-start-1 col-end-3 md:col-start-2">
          I bought it 3 weeks ago and now come back just to say “Awesome
          Product”. I really enjoy it. At vero eos et accusamus et iusto odio
          dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
          atque corrupt et quas molestias excepturi sint non provident.
        </p>

        <div className="col-start-1 col-end-3 flex w-full justify-center gap-4 md:col-start-2 md:justify-normal">
          <span>Like</span>
          <span>Replay</span>
        </div>
      </div>
    </div>
  );
};

export default Reviews;

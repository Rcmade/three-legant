import { currentUser } from "@/actions/currentUser";
import AccountInfoHeading from "@/components/heading/AccountInfoHeading";
import UserInfoSidebar from "@/components/sidebar/UserInfoSidebar";
import { Children } from "@/types";
import { redirect } from "next/navigation";

export default async function Layout({ children }: Children) {
  return (
    <section className="">
      <div className="my-6 flex w-full justify-center">
        <AccountInfoHeading />
      </div>
      <div className="flex flex-col gap-14 md:flex-row">
        <UserInfoSidebar />
        <main className="flex-1">{children}</main>
      </div>
    </section>
  );
}

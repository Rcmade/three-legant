import { currentUser } from "@/actions/currentUser";
import AccountInfoHeading from "@/components/heading/AccountInfoHeading";
import UserInfoSidebar from "@/components/sidebar/UserInfoSidebar";
import { Children } from "@/types";
import { redirect } from "next/navigation";

export default async function Layout({ children }: Children) {

  return (
    <section className="">
      <div className="flex w-full justify-center">
        <AccountInfoHeading />
      </div>
      <div className="flex flex-col gap-16 md:flex-row">
        <UserInfoSidebar />
        <main>{children}</main>
      </div>
    </section>
  );
}

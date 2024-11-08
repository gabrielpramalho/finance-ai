import { auth } from "@clerk/nextjs/server";
import { Navbar } from "../_components/navbar";
import { redirect } from "next/navigation";

export default function Subscription() {
  const { userId } = auth();

  if (!userId) {
    redirect("/login");
  }
  return (
    <>
      <Navbar />
      <h1 className="item-center flex">Subscription</h1>;
    </>
  );
}

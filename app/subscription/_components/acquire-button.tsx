"use client";

import { Button } from "@/app/_components/ui/button";
import { loadStripe } from "@stripe/stripe-js";
import { createStripeCheckout } from "../_actions/create-checkout";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export function AcquireButton() {
  const { user } = useUser();

  async function handleAcquirePlan() {
    const { sessionId } = await createStripeCheckout();

    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error("Stripe key not found");
    }

    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    );

    if (!stripe) {
      throw new Error("Stripe client not found");
    }

    await stripe.redirectToCheckout({ sessionId });
  }

  const hasPremiumPlan = user?.publicMetadata.subscriptionPlan == "premium";

  if (hasPremiumPlan) {
    return (
      <Button className="w-full rounded-full font-bold" variant="link">
        <Link
          href={`${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL as string}?prefilled_email=${user.emailAddresses[0]}`}
        >
          Gerenciar plano
        </Link>
      </Button>
    );
  }

  return (
    <Button
      onClick={handleAcquirePlan}
      className="w-full rounded-full font-bold"
    >
      Adquirir plano
    </Button>
  );
}

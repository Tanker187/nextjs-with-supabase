import Link from "next/link";

import { StripeCheckout } from "@/components/stripe-checkout";

export default function CheckoutPage() {
  return (
    <div className="flex w-full flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold">Checkout</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Start a Stripe Checkout session using your authenticated Supabase session.
        </p>
      </div>

      <StripeCheckout />

      <Link href="/protected" className="text-sm underline underline-offset-4">
        Back to protected area
      </Link>
    </div>
  );
}

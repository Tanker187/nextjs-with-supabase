"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function StripeCheckout() {
  const [priceId, setPriceId] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!priceId.trim()) {
      setError("Enter a Stripe Price ID.");
      return;
    }

    const parsedQuantity = Number(quantity);
    if (!Number.isInteger(parsedQuantity) || parsedQuantity < 1 || parsedQuantity > 10) {
      setError("Quantity must be a whole number from 1 to 10.");
      return;
    }

    if (window.location.protocol !== "https:") {
      setError("Checkout requires the HTTPS deployment URL.");
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error: invokeError } = await supabase.functions.invoke(
        "stripe-create-checkout",
        {
          body: {
            price_id: priceId.trim(),
            quantity: parsedQuantity,
            success_url: `${window.location.origin}/protected/checkout?status=success`,
            cancel_url: `${window.location.origin}/protected/checkout?status=cancelled`,
          },
        },
      );

      if (invokeError) throw invokeError;
      if (!data?.url || typeof data.url !== "string") {
        throw new Error("Stripe did not return a checkout URL.");
      }

      window.location.assign(data.url);
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : "Unable to start checkout.",
      );
      setLoading(false);
    }
  }

  return (
    <form onSubmit={startCheckout} className="flex w-full max-w-md flex-col gap-4">
      <label className="flex flex-col gap-2 text-sm font-medium">
        Stripe Price ID
        <input
          value={priceId}
          onChange={(event) => setPriceId(event.target.value)}
          placeholder="price_..."
          className="rounded-md border bg-background px-3 py-2 font-mono text-sm"
          autoComplete="off"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm font-medium">
        Quantity
        <input
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
          type="number"
          min="1"
          max="10"
          step="1"
          className="rounded-md border bg-background px-3 py-2 text-sm"
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
      >
        {loading ? "Starting checkout…" : "Continue to Stripe"}
      </button>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </form>
  );
}

import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { FaHome, FaTachometerAlt } from "react-icons/fa";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Invalid Session ID");
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  const {
    metadata,
    status,
    customer_details,
    amount_total,
    payment_intent,
  } = session;

  if (status === "open") {
    redirect("/");
  }

  if (status !== "complete") {
    redirect("/");
  }
  
  if (
  session.payment_status === "paid" &&
  metadata?.hiringId
) {
  await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/payment-success`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stripeSessionId: session.id,
        paymentIntentId: payment_intent?.id,
        amount: amount_total / 100,
        hiringId: metadata.hiringId,
        lawyerId: metadata.lawyerId,
        userId: metadata.userId,
        userEmail: metadata.userEmail,
        title: metadata.title,
      }),
      cache: "no-store",
    }
  );
}

  return (
    <div className="min-h-[64vh] bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 p-10 text-center">
            <RiCheckboxCircleFill
              size={110}
              className="mx-auto text-white drop-shadow-xl"
            />

            <h1 className="mt-4 text-4xl font-bold text-white">
              Payment Successful
            </h1>

            <p className="mt-2 text-green-100 text-lg">
              Thank you for your payment 🎉
            </p>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-800">
                Your transaction has been completed
              </h2>

              <p className="text-gray-500 mt-3">
                A confirmation email has been sent to
              </p>

              <p className="font-semibold text-green-600 text-lg mt-1">
                {customer_details?.email}
              </p>
            </div>

            {/* Payment Summary */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 mb-6">
              <h3 className="font-bold text-gray-800 text-lg mb-4">
                Payment Summary
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Amount Paid</span>
                  <span className="font-bold text-green-600">
                    $ {(amount_total / 100).toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Status</span>
                  <span className="font-semibold text-green-600">
                    Completed
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Transaction ID</span>

                  <span className="font-mono text-xs md:text-sm bg-white px-3 py-1 rounded-lg border">
                    {payment_intent?.id}
                  </span>
                </div>
              </div>
            </div>

            

            {/* Success Message */}
            <div className="bg-green-50 border border-green-100 rounded-2xl p-5 mb-8">
              <p className="text-green-700 text-center">
                Your payment has been verified successfully. You can now
                continue using all services without interruption.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Need assistance? Contact our support team anytime.
        </p>
      </div>
    </div>
  );
}
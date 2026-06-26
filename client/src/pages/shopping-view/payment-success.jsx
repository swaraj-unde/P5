import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ShoppingBag, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <Card className="w-full max-w-lg border border-zinc-800 bg-zinc-900 text-white shadow-2xl">
        <CardContent className="flex flex-col items-center p-10">

          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-500/20">
            <CheckCircle2 className="h-14 w-14 text-green-500" />
          </div>


          <h1 className="text-3xl font-bold">Payment Successful!</h1>


          <p className="mt-4 text-center text-zinc-400">
            Thank you for your purchase. Your payment has been confirmed and
            your order has been placed successfully.
          </p>


          <div className="mt-8 w-full rounded-xl border border-zinc-800 bg-zinc-950 p-5">
            <div className="flex items-center gap-3">
              <Package className="h-6 w-6 text-violet-500" />
              <div>
                <p className="font-medium">Order Confirmed</p>
                <p className="text-sm text-zinc-500">
                  You can track your order from your account.
                </p>
              </div>
            </div>
          </div>

          
          <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
            <Button
              className="flex-1 bg-violet-600 hover:bg-violet-700"
              onClick={() => navigate("/shop/account")}
            >
              <Package className="mr-2 h-4 w-4" />
              View Orders
            </Button>

            <Button
              variant="outline"
              className="flex-1 border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800"
              onClick={() => navigate("/shop/home")}
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

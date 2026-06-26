import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ShieldCheck } from "lucide-react";
import { capturePayment } from "@/store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

function PaypalReturnPage() {
  const dispatch = useDispatch();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (!paymentId || !payerId) return;

    const orderId = JSON.parse(sessionStorage.getItem("currOrderId"));

    if (!orderId) return;

    dispatch(capturePayment({ paymentId, payerId, orderId })).then((data) => {
      if (data?.payload?.success) {
        sessionStorage.removeItem("currOrderId");
        window.location.replace("/shop/payment-success");
      }
    });
  }, [paymentId, payerId, dispatch]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <Card className="w-full max-w-md border-zinc-800 bg-zinc-900 text-white shadow-2xl">
        <CardHeader className="flex flex-col items-center space-y-4 pb-2">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-600/20">
            <ShieldCheck className="h-8 w-8 text-violet-500" />
          </div>

          <CardTitle className="text-center text-2xl font-bold">
            Processing Payment
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 text-center">
          <Loader2 className="mx-auto h-10 w-10 animate-spin text-violet-500" />

          <p className="text-sm leading-6 text-zinc-400">
            Please wait while we securely verify your payment with PayPal.
          </p>

          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
            <p className="text-sm text-zinc-500">
              ⚠️ Do not refresh or close this page.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PaypalReturnPage;

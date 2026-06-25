import { DialogContent, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import CommonForm from "../common/form";
import { useState } from "react";
import {
  getAllOrders,
  getOrderDetails,
  updateOrderStatus,
} from "@/store/admin/orders-slice";
import { toast } from "sonner";

export default function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState({
    status: "",
  });

  const dispatch = useDispatch();

  function handleUpdateStatus(e) {
    e.preventDefault();
    dispatch(
      updateOrderStatus({
        orderId: orderDetails?._id,
        orderStatus: formData?.status,
      }),
    ).then((data) => {

      if (data?.payload?.success) {
        toast.success(data?.payload?.message);
        dispatch(getOrderDetails(orderDetails?._id));
        dispatch(getAllOrders());
      }
    });
  }

  return (
    <DialogContent
      className="
        bg-zinc-950
        border-zinc-800
        text-white
        w-[95vw]
        sm:max-w-2xl
        lg:max-w-4xl
        max-h-[85vh]
        overflow-y-auto
        p-0
      "
    >
      <DialogTitle className="sr-only">Order Details</DialogTitle>
      <div className="sticky top-0 z-10 bg-zinc-950 border-b border-zinc-800 px-6 py-4">
        <h2 className="text-xl font-semibold">Order Details</h2>
        <p className="text-sm text-zinc-400">
          Manage order information & status
        </p>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 space-y-3">
            <h3 className="text-lg font-semibold mb-2">Order Info</h3>

            <div className="flex justify-between">
              <span className="text-zinc-400">Order ID</span>
              <Label>{orderDetails?._id}</Label>
            </div>

            <Separator className="bg-zinc-800" />

            <div className="flex justify-between">
              <span className="text-zinc-400">Date</span>
              <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
            </div>

            <Separator className="bg-zinc-800" />

            <div className="flex justify-between">
              <span className="text-zinc-400">Total</span>
              <Label className="text-green-400">
                ₹{orderDetails?.totalAmount}
              </Label>
            </div>

            <Separator className="bg-zinc-800" />

            <div className="flex justify-between">
              <span className="text-zinc-400">Status</span>

              <Badge
                className={`
                  px-3 py-1
                  ${
                    orderDetails?.orderStatus === "delivered"
                      ? "bg-green-500/15 text-green-400 border border-green-500/30"
                      : orderDetails?.orderStatus === "rejected"
                        ? "bg-red-500/15 text-red-400 border border-red-500/30"
                        : "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30"
                  }
                `}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 space-y-3">
            <h3 className="text-lg font-semibold mb-2">Payment & Customer</h3>

            <div className="flex justify-between">
              <span className="text-zinc-400">Method</span>
              <Label>{orderDetails?.paymentMethod}</Label>
            </div>

            <Separator className="bg-zinc-800" />

            <div className="flex justify-between">
              <span className="text-zinc-400">Payment</span>
              <Label className="text-green-400">
                {orderDetails?.paymentStatus}
              </Label>
            </div>

            <Separator className="bg-zinc-800" />

            <div className="flex justify-between">
              <span className="text-zinc-400">Payer Id</span>
              <Label>{orderDetails?.payerId}</Label>
            </div>

            <Separator className="bg-zinc-800" />

            <div className="flex justify-between">
              <span className="text-zinc-400">Payment Id</span>
              <Label>{orderDetails?.paymentId}</Label>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
          <h3 className="text-lg font-semibold mb-4">Ordered Items</h3>

          <div className="space-y-3">
            {orderDetails?.cartItems?.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-zinc-800 p-4 rounded-lg"
              >
                <div>
                  <p className="font-medium">{item?.title}</p>
                  <p className="text-sm text-zinc-400">Qty: {item?.quantity}</p>
                </div>

                <p className="text-green-400 font-semibold">₹{item?.price}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
          <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>

          <div className="text-zinc-300 space-y-1">
            <p>{orderDetails?.addressInfo?.address}</p>
            <p>{orderDetails?.addressInfo?.city}</p>
            <p>{orderDetails?.addressInfo?.pincode}</p>
            <p>{orderDetails?.addressInfo?.phone}</p>
            <p className="text-zinc-400">{orderDetails?.addressInfo?.notes}</p>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
          <h3 className="text-lg font-semibold mb-4">Update Status</h3>

          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText="Update Order Status"
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
}

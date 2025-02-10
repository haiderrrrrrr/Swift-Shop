import Cookies from "js-cookie";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useCart } from "react-use-cart";
import useRazorpay from "react-razorpay";

//internal import
import useAsync from "./useAsync";
import { getUserSession } from "@lib/auth";
import { UserContext } from "@context/UserContext";
import OrderServices from "@services/OrderServices";
import CouponServices from "@services/CouponServices";
import { notifyError, notifySuccess } from "@utils/toast";
import CustomerServices from "@services/CustomerServices";
import NotificationServices from "@services/NotificationServices";

// here is the useCheckoutSubmit hook
const useCheckoutSubmit = (storeSetting) => {
  const { dispatch } = useContext(UserContext);

  const [error, setError] = useState("");
  const [total, setTotal] = useState("");
  const [couponInfo, setCouponInfo] = useState({});
  const [minimumAmount, setMinimumAmount] = useState(0);
  const [showCard, setShowCard] = useState(false);
  const [shippingCost, setShippingCost] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [isCheckoutSubmit, setIsCheckoutSubmit] = useState(false);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [useExistingAddress, setUseExistingAddress] = useState(false);
  const [isCouponAvailable, setIsCouponAvailable] = useState(false);

  const router = useRouter();
  const couponRef = useRef("");
  const [Razorpay] = useRazorpay();
  const { isEmpty, emptyCart, items, cartTotal } = useCart();

  const userInfo = getUserSession();

  const { data, loading } = useAsync(() =>
    CustomerServices.getShippingAddress({
      userId: userInfo?.id,
    })
  );

  // here we are checking if the user has a shipping address
  const hasShippingAddress =
    !loading &&
    data?.shippingAddress &&
    Object.keys(data?.shippingAddress)?.length > 0;

  // console.log("storeSetting", storeSetting);

  // console.log("res", data);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // here we are setting the default value of the form fields
    if (Cookies.get("couponInfo")) {
      const coupon = JSON.parse(Cookies.get("couponInfo"));
      // console.log('coupon information',coupon)
      setCouponInfo(coupon);
      setDiscountPercentage(coupon.discountType);
      setMinimumAmount(coupon.minimumAmount);
    }
    setValue("email", userInfo?.email);
  }, [isCouponApplied]);

  //remove coupon if total value less then minimum amount of coupon
  useEffect(() => {
    if (minimumAmount - discountAmount > total || isEmpty) {
      setDiscountPercentage(0);
      Cookies.remove("couponInfo");
    }
  }, [minimumAmount, total]);

  //calculate total and discount value
  //calculate total and discount value
  useEffect(() => {
    const discountProductTotal = items?.reduce(
      (preValue, currentValue) => preValue + currentValue.itemTotal,
      0
    );

    let totalValue = 0;
    const subTotal = parseFloat(cartTotal + Number(shippingCost)).toFixed(2);
    const discountAmount =
      discountPercentage?.type === "fixed"
        ? discountPercentage?.value
        : discountProductTotal * (discountPercentage?.value / 100);

    const discountAmountTotal = discountAmount ? discountAmount : 0;

    totalValue = Number(subTotal) - discountAmountTotal;

    setDiscountAmount(discountAmountTotal);

    // console.log("total", totalValue);

    setTotal(totalValue);
  }, [cartTotal, shippingCost, discountPercentage]);

  const submitHandler = async (data) => {
    // console.log("data", data);
    // return;
    try {
      // dispatch({ type: "SAVE_SHIPPING_ADDRESS", payload: data });
      // Cookies.set("shippingAddress", JSON.stringify(data));
      setIsCheckoutSubmit(true);
      setError("");

      const userDetails = {
        name: `${data.firstName} ${data.lastName}`,
        contact: data.contact,
        email: data.email,
        address: data.address,
        country: data.country,
        city: data.city,
        zipCode: data.zipCode,
      };

      let orderInfo = {
        user_info: userDetails,
        shippingOption: data.shippingOption,
        paymentMethod: data.paymentMethod,
        status: "Pending",
        cart: items,
        subTotal: cartTotal,
        shippingCost: shippingCost,
        discount: discountAmount,
        total: total,
      };

      await CustomerServices.addShippingAddress({
        userId: userInfo?.id,
        shippingAddressData: {
          name: data.firstName + " " + data.lastName,
          contact: data.contact,
          email: userInfo?.email,
          address: data.address,
          country: data.country,
          city: data.city,
          // area: data.area,
          zipCode: data.zipCode,
        },
      });

      if (data.paymentMethod === "RazorPay") {
        await handlePaymentWithRazorpay(orderInfo);
      }
      if (data.paymentMethod === "Cash") {
        const orderResponse = await OrderServices.addOrder(orderInfo);

        // notification info
        const notificationInfo = {
          orderId: orderResponse?._id,
          message: `${orderResponse?.user_info?.name}, Placed ${parseFloat(
            orderResponse?.total
          ).toFixed(2)} order!`,
          image:
            "https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png",
        };
        // notification api call
        await NotificationServices.addNotification(notificationInfo);

        router.push(`/order/${orderResponse?._id}`);
        notifySuccess("Your Order Confirmed!");
        Cookies.remove("couponInfo");

        emptyCart();
        setIsCheckoutSubmit(false);
      }
    } catch (err) {
      notifyError(err ? err?.response?.data?.message : err?.message);
      setIsCheckoutSubmit(false);
    }
  };

  //handle razorpay payment
  const handlePaymentWithRazorpay = async (orderInfo) => {
    try {
      const { amount, id, currency } =
        await OrderServices.createOrderByRazorPay({
          amount: Math.round(total).toString(),
        });

      // console.log("amount:::", amount);
      // setIsCheckoutSubmit(false);

      if ((amount, id, currency)) {
        const razorpayKey = storeSetting?.razorpay_id;

        // console.log("razorpayKey", razorpayKey);

        const options = {
          key: razorpayKey,
          amount: amount,
          currency: currency,
          name: "Fably Store",
          description: "This is total cost of your purchase",
          order_id: id,
          handler: async function (response) {
            const razorpay = {
              amount: total,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            };

            const orderData = {
              ...orderInfo,
              total: total,
              cardCharge: cardCharge,
              razorpay,
            };

            const res = await OrderServices.addRazorpayOrder(orderData);
            if (res) {
              router.push(`/order/${res._id}`);
              notifySuccess("Your Order Confirmed!");
              Cookies.remove("couponInfo");
              localStorage.removeItem("products");
              emptyCart();

              await NotificationServices.addNotification({
                message: `${data?.firstName} placed $${total} order!`,
                orderId: res._id,
                image: userInfo?.image,
              });
              socket.emit("notification", {
                message: `${data.firstName} placed $${total} order!`,
                orderId: res._id,
                image: userInfo?.image,
              });
            }
          },

          modal: {
            ondismiss: function () {
              setTotal(total);
              setIsCheckoutSubmit(false);
              console.log("Checkout form closed!");
            },
          },

          prefill: {
            name: "Alamgir",
            email: "alamgirh389@example.com",
            contact: "01957434434",
          },
          notes: {
            address: "Mumbai, India",
          },
          theme: {
            color: "#10b981",
          },
        };

        const rzpay = new Razorpay(options);
        rzpay.open();
      }
    } catch (err) {
      setIsCheckoutSubmit(false);
      notifyError(err.message);
    }
  };

  // here we are handling the shipping cost
  const handleShippingCost = (value) => {
    // console.log("handleShippingCost", value);
    setShippingCost(Number(value));
  };

  //handle default shipping address
  const handleDefaultShippingAddress = (value) => {
    // console.log("handle default shipping", value);
    setUseExistingAddress(value);
    if (value) {
      const address = data?.shippingAddress;
      setValue("firstName", address.name);

      setValue("address", address.address);
      setValue("contact", address.contact);
      // setValue("email", address.email);
      setValue("city", address.city);
      setValue("country", address.country);
      setValue("zipCode", address.zipCode);
    } else {
      setValue("firstName");
      setValue("lastName");
      setValue("address");
      setValue("contact");
      // setValue("email");
      setValue("city");
      setValue("country");
      setValue("zipCode");
    }
  };

  // here we are handling the coupon code
  const handleCouponCode = async (e) => {
    e.preventDefault();

    if (!couponRef.current.value) {
      notifyError("Please Input a Coupon Code!");
      return;
    }
    setIsCouponAvailable(true);

    try {
      const coupons = await CouponServices.getShowingCoupons();
      const result = coupons.filter(
        (coupon) => coupon.couponCode === couponRef.current.value
      );
      setIsCouponAvailable(false);

      if (result.length < 1) {
        notifyError("Please Input a Valid Coupon!");
        return;
      }

      if (dayjs().isAfter(dayjs(result[0]?.endTime))) {
        notifyError("This coupon is not valid!");
        return;
      }

      if (total < result[0]?.minimumAmount) {
        notifyError(
          `Minimum ${result[0].minimumAmount} Rs. required for Apply this coupon!`
        );
        return;
      } else {
        notifySuccess(
          `Your Coupon ${result[0].couponCode} is Applied on ${result[0].productType}!`
        );
        setIsCouponApplied(true);
        setMinimumAmount(result[0]?.minimumAmount);
        setDiscountPercentage(result[0].discountType);
        dispatch({ type: "SAVE_COUPON", payload: result[0] });
        Cookies.set("couponInfo", JSON.stringify(result[0]));
      }
    } catch (error) {
      return notifyError(error.message);
    }
  };

  // here we are returning the required functions and states
  return {
    register,
    errors,
    showCard,
    setShowCard,
    error,
    couponInfo,
    couponRef,
    total,
    isEmpty,
    items,
    cartTotal,
    handleSubmit,
    submitHandler,
    handleShippingCost,
    handleCouponCode,
    discountPercentage,
    discountAmount,
    shippingCost,
    isCheckoutSubmit,
    isCouponApplied,
    useExistingAddress,
    hasShippingAddress,
    isCouponAvailable,
    handleDefaultShippingAddress,
  };
};

export default useCheckoutSubmit;

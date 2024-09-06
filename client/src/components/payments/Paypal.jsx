import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Swal from "sweetalert2"
import { apiCreatePayment } from "~/apis/payment"
import { useUserStore } from "~/store"
import pathname from "~/utilities/path"

// This value is from the props in the UI
const style = { layout: "vertical" }

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ showSpinner, amount = 0, payload }) => {
  const [{ isPending, options }, dispatch] = usePayPalScriptReducer()
  const { current } = useUserStore()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: "USD",
      },
    })
  }, [showSpinner])

  const handleSaveOrder = async () => {
    if (current) payload.userId = current?.id
    const response = await apiCreatePayment(payload)
    if (response.success) {
      toast.success(response.mes)
      window.open(`/${pathname.user.CONTRACT}`, "_blank")
      navigate("/")
    } else toast.error(response.mes)
  }

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[style, "USD", amount]}
        fundingSource={undefined}
        createOrder={(data, actions) =>
          actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: Math.round(amount / 235) / 100,
                  },
                },
              ],
            })
            .then((orderId) => orderId)
        }
        onApprove={(data, actions) =>
          actions.order.capture().then(async (response) => {
            if (response.status === "COMPLETED") {
              handleSaveOrder()
            }
          })
        }
      />
    </>
  )
}

export default function Paypal({ amount, payload, setIsSuccess }) {
  return (
    <div style={{ maxWidth: "500px", minHeight: "200px", margin: "auto" }}>
      <PayPalScriptProvider
        options={{ clientId: "test", components: "buttons", currency: "USD" }}
      >
        <ButtonWrapper
          payload={payload}
          currency={"USD"}
          amount={amount}
          showSpinner={false}
        />
      </PayPalScriptProvider>
    </div>
  )
}

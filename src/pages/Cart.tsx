import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Trash2, Loader2, MapPin, AlertCircle, Minus, Plus } from "lucide-react";

interface ShippingAddress {
  fullName: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

const EMPTY_ADDRESS: ShippingAddress = {
  fullName: "",
  streetAddress: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
};

const ADDRESS_LABELS: Record<keyof ShippingAddress, string> = {
  fullName: "Full Name",
  streetAddress: "Street Address",
  city: "City",
  state: "State",
  zipCode: "ZIP Code",
  country: "Country",
};

export function Cart() {
  const {
    cart,
    addToCart,
    updateCart,
    setQuantity,
    removeFromCart,
    cartTotal,
    handleCheckout,
  } = useCart();

  const [isProcessing, setIsProcessing] = useState(false);
  const [address, setAddress] = useState<ShippingAddress>(EMPTY_ADDRESS);
  const [errors, setErrors] = useState<Partial<ShippingAddress>>({});
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const validate = () => {
    const found: Partial<ShippingAddress> = {};
    (Object.keys(ADDRESS_LABELS) as (keyof ShippingAddress)[]).forEach((key) => {
      if (!address[key].trim()) {
        found[key] = `${ADDRESS_LABELS[key]} is required`;
      }
    });
    setErrors(found);
    return Object.keys(found).length === 0;
  };

  // The address fields carried `required` but sat outside any <form>, so the
  // browser never enforced them and checkout ran with an empty address.
  const onCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutError(null);

    if (!validate()) return;

    setIsProcessing(true);
    try {
      await handleCheckout();
    } catch (error) {
      // Previously this only reached console.error, so the button spun and
      // then silently gave up with no explanation on screen.
      setCheckoutError(
        error instanceof Error
          ? error.message
          : "Checkout failed. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        <div className="bg-white rounded-lg shadow-md p-10 text-center">
          <p className="text-lg font-semibold mb-2">Your cart is empty</p>
          <p className="text-gray-600 mb-6">
            Browse the catalogue and add something you like.
          </p>
          <Link
            to="/home"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  const field = (name: keyof ShippingAddress, span2 = false) => (
    <div className={span2 ? "sm:col-span-2" : undefined}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {ADDRESS_LABELS[name]}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        value={address[name]}
        onChange={handleAddressChange}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
        className={`w-full px-3 py-2 border rounded-md focus:outline-hidden focus:ring-2 ${
          errors[name]
            ? "border-red-500 focus:ring-red-400"
            : "border-gray-300 focus:ring-yellow-400"
        }`}
      />
      {errors[name] && (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {/* The summary was nested in a lg:col-span-1 with no grid parent, so it
          never became a sidebar. This grid gives that class something to act on. */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-sm"
                />
                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <button
                      onClick={() => updateCart(item)}
                      className="bg-red-200 hover:bg-red-300 text-red-800 font-bold p-1 rounded-sm disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
                      disabled={item.quantity <= 1}
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <label htmlFor={`qty-${item.id}`} className="sr-only">
                      Quantity of {item.name}
                    </label>
                    <input
                      id={`qty-${item.id}`}
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => {
                        const parsed = parseInt(e.target.value, 10);
                        // Typing 0 used to delete the row outright, with no
                        // warning and no undo. Clamp to 1 and leave removal to
                        // the explicit trash button.
                        if (!Number.isNaN(parsed)) {
                          setQuantity(item.id, Math.max(1, parsed));
                        }
                      }}
                      className="w-16 text-center border border-gray-300 rounded-sm py-1"
                    />
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-red-200 hover:bg-red-300 text-red-800 font-bold p-1 rounded-sm"
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-gray-700 mt-1">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 focus:outline-hidden transition-colors duration-200"
                aria-label={`Remove ${item.name} from cart`}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        <form className="lg:col-span-1" onSubmit={onCheckout} noValidate>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-6">
              <MapPin className="w-5 h-5 mr-2 text-gray-600" />
              <h2 className="text-xl font-semibold">Shipping Address</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {field("fullName", true)}
              {field("streetAddress", true)}
              {field("city")}
              {field("state")}
              {field("zipCode")}
              {field("country")}
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-xs">
            <div className="text-2xl font-bold text-gray-800">
              Total: ₹ {cartTotal.toLocaleString("en-IN")}
            </div>

            {checkoutError && (
              <div
                role="alert"
                className="mt-4 flex items-start gap-2 rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-800"
              >
                <AlertCircle
                  className="w-5 h-5 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span>{checkoutError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isProcessing}
              className={`mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg w-full flex items-center justify-center transition-colors duration-200 ${
                isProcessing ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                "Proceed to Checkout"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

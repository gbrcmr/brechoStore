import { CheckoutContext } from "../contexts/checkout";
import { useContext } from "react";

const useCheckout = () => {
    const context = useContext(CheckoutContext);

    return context;
};

export default useCheckout;
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../components/CheckoutForm";

// Connexion au compte Stripe en fournissant la clef publique
const stripePromise = loadStripe(
  "pk_test_51S2rhKDjCkxcXAtkpFctcVnVpIHScCXs75eArSXw7Xik21qVMpmYS9G3kZZ6xEMz8IkSXE2y5JNS8t1G3vzk3Myt00Ht1XEfXw"
);

const Payment = () => {
  const location = useLocation();
  const { amount } = location.state;
  //const { title } = location.state;
  const newAmount = amount*100
  const options = {
    // Type de transaction
    mode: "payment",
    // Montant de la transaction
    amount: newAmount,
    // Devise de la transaction
    currency: "eur",
    // On peut customiser l'apparence ici
    appearance: {
      /*...*/
    },
  };

  return (
    // Le composant Elements doit contenir toute notre logique de paiement
    // On lui donner la preuve que nous sommes connectés et les options de paiement
    <Elements stripe={stripePromise} options={options}>
      <CheckOutForm />
    </Elements>
  );
};

export default Payment;

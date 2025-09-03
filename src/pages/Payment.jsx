import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../components/CheckoutForm";

// Connexion au compte Stripe en fournissant la clef publique, en dehors du composant
const stripePromise = loadStripe(
  "pk_test_51S2rhKDjCkxcXAtkpFctcVnVpIHScCXs75eArSXw7Xik21qVMpmYS9G3kZZ6xEMz8IkSXE2y5JNS8t1G3vzk3Myt00Ht1XEfXw"
);

const Payment = () => {
  const location = useLocation();
  const { amount } = location.state;
  const { title } = location.state;
  const { description } = location.state;
  const newAmount = amount * 100;
  const fraisPort = 0.8;
  const fraisProtection = 0.4;

  const options = {
    // Type de transaction
    mode: "payment",
    // Montant de la transaction
    amount: newAmount,
    // Devise de la transaction
    currency: "eur",
    // On peut customiser l'apparence ici
    appearance: {
      title: title,
      description: description,
    },
  };

  return (
    <>
      <div className="innerContainer contPayment">
        <main className="payment">
          <div className="resume">
            <h3>Résumé de la commande</h3>
            <div className="flexContainer">
              <span>Commande</span>
              <span>{amount} €</span>
            </div>
            <div className="flexContainer">
              <span>Frais protection acheteurs</span>
              <span>{fraisProtection.toFixed(2)} €</span>
            </div>
            <div className="flexContainer">
              <span>Frais de port</span>
              <span>{fraisPort.toFixed(2)} €</span>
            </div>
          </div>
          <div className="total flexContainer">
            <span>Total</span>
            <span>
              {(Number(amount) + fraisPort + fraisProtection).toFixed(2)} €
            </span>
          </div>
          <div className="finally">
            Il ne vous reste plus qu'une étape pour vous offrir <b>{title}</b>.
            <br />
            Vous allez payer {(Number(amount) + 0.4 + 0.8).toFixed(2)} (frais de
            protection et frais de port inclus)
          </div>
        </main>
        {/* // Le composant Elements doit contenir toute notre logique de paiement
            // On lui donner la preuve que nous sommes connectés et les options de paiement */}
        <Elements stripe={stripePromise} options={options}>
          <CheckOutForm options={options} />
        </Elements>
      </div>
    </>
  );
};

export default Payment;

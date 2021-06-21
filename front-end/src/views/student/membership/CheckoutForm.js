/* eslint-disable react/react-in-jsx-scope */
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';
import { CircularLoading } from 'respinner';

// import Loader from 'src/components/Loader';

const CheckoutForm = ({ payinfo, isLoading }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    const result = await stripe.createToken(cardElement);

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      payinfo(result);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <div className="payButton-container">
        {
            isLoading ? <CircularLoading fill="#01025C" stroke="#01025C" /> : (
              <button type="submit" disabled={!stripe} className="payButton" id="button-7">
                <div id="dub-arrow">
                  <img src="https://github.com/atloomer/atloomer.github.io/blob/master/img/iconmonstr-arrow-48-240.png?raw=true" alt="pay" />
                </div>
                Pay
              </button>
            )
        }
      </div>
    </form>
  );
};

CheckoutForm.propTypes = {
  payinfo: PropTypes.func,
  isLoading: PropTypes.bool
};

export default CheckoutForm;

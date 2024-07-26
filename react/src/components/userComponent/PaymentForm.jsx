import { useState } from 'react';

function PaymentForm() {
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    // try {
    //   const response = await axios.post('/api/payments', {
    //     amount,
    //     email,
    //   });

    //   setLoading(false);
    //   setSuccessMessage('Paiement effectué avec succès !');
    // } catch (error) {
    //   setLoading(false);
    //   setError(error.response.data.message || 'Une erreur est survenue.');
    // }
  };

  return (
    <div>
      <h2>Formulaire de paiement</h2>
      {loading && <p>Traitement en cours...</p>}
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Montant :
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>
        <label>
          Email :
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <button type="submit" disabled={loading}>Payer</button>
      </form>
    </div>
  );
}

export default PaymentForm;

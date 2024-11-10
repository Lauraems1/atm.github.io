import React from 'react';
import './App.css';

function App() {

  const ATMDeposit = ({ onChange, isDeposit, isValid, deposit }) => {
    const choice = ["Deposit", "Cash Back"];
    console.log(`ATM isDeposit: ${isDeposit}`);
    return (
      <label className="label huge">
        <h3> {choice[Number(!isDeposit)]}</h3>
        <input type="number" width="200" onChange={onChange} value={deposit} min="0"></input>
        <input type="submit" width="200" value="Submit" disabled={!isValid}></input>
      </label>
    );
  };
  
  const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(false);
  const [validTransaction, setValidTransaction] = React.useState(true); //Invalid that Cash Back could exceed balance

    let status = `Account Balance $ ${totalState} `;
    console.log(`Account Rendered with isDeposit: ${isDeposit}`);

    const handleChange = (event) => { //El mio tiene parentesis
      const inputValue = Number(event.target.value); //Get deposit or cashback value
      setDeposit(inputValue); //Update deposit state
    
      if(inputValue <= 0) {
        setValidTransaction(false);
        return;
      }
      if(!isDeposit && inputValue > totalState) {
        setValidTransaction(false);
      } else {
        setValidTransaction(true);
      }
    };

    const handleSubmit = (event) => { //El mio tiene even dentro de parentesis
      event.preventDefault(); //el mio agrega otra linea de setValidTransaction(false) y de lat handleModelSelection
      let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
      setTotalState(newTotal);
      setDeposit(0);
     };
  
    return (
      <form onSubmit={handleSubmit}>
        <h2 id="total">{status}</h2>

        <button className="deposit-button" onClick={() => setIsDeposit(true)}>Deposit</button>
        <button className="cashback-button" onClick={() => setIsDeposit(false)}>Cash Back</button>

        {/* Conditionally render ATMDeposit component */}
      {isDeposit !==null && (
      <ATMDeposit onChange={handleChange} isDeposit={isDeposit} isValid={validTransaction} deposit={deposit}></ATMDeposit>
      )}

      </form>
    );
  };
  // ========================================
  return (
    <div className="App">
      <Account />
    </div>
  );
   
}

export default App;

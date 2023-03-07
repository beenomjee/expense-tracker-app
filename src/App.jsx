import Tracker from "./Tracker"
import Transactions from "./Transactions"
import './App.css'
import { useRef, useState } from "react"
import PieGraph from "./PieGraph"
import { useDispatch, useSelector } from "react-redux"
import { saveEditTransaction } from "./redux"
const App = () => {
  const [isTransactionsShowing, setIsTransactionsShowing] = useState(false);
  const showTransactions = () => setIsTransactionsShowing(state => !state);
  const transactions = useSelector(store => store.transactions);
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [amount, setAmount] = useState("");
  const [indexOfSelectedEditTransaction, setIndexOfSelectedEditTransaction] = useState('');
  const descriptionEl = useRef(null);
  let clickOnEdit = (index) => {
    const { description, type, amount } = transactions[index];
    setDescription(description);
    setAmount(amount);
    setType(type);
    setIndexOfSelectedEditTransaction(`${index}`);
    descriptionEl.current && descriptionEl.current.focus();
  }
  let updateTransaction = () => {
    dispatch(saveEditTransaction({ index: indexOfSelectedEditTransaction, transaction: { description, type, amount: Number(amount) } }))
    setDescription("");
    setAmount("");
    setType("");
    setIndexOfSelectedEditTransaction(``);
  }
  return (
    <div className="app-container">
      {isTransactionsShowing && <Transactions clickOnEdit={clickOnEdit} />}
      <Tracker isTransactionsShowing={isTransactionsShowing} showTransactions={showTransactions} description={description} setDescription={setDescription} type={type} setType={setType} amount={amount} setAmount={setAmount} indexOfSelectedEditTransaction={indexOfSelectedEditTransaction} updateTransaction={updateTransaction} descriptionEl={descriptionEl} />
      {isTransactionsShowing && <PieGraph />}
    </div>
  )
}

export default App
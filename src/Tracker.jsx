
import { useDispatch, useSelector } from 'react-redux';
import { addNewTransaction } from './redux';
import styles from './Tracker.module.css';

const Tracker = ({ isTransactionsShowing, showTransactions, description, setDescription, type, setType, amount, setAmount, indexOfSelectedEditTransaction, updateTransaction, descriptionEl }) => {
    const dispatch = useDispatch();

    const transactions = useSelector(store => store.transactions);
    const formHandler = e => {
        e.preventDefault();
        if (indexOfSelectedEditTransaction) {
            updateTransaction();
        }
        else {
            dispatch(addNewTransaction({ description, type, amount: Number(amount) }))
            setDescription('');
            setType('');
            setAmount("");
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.center}>
                <h1>Expense Tracker</h1>
                <h6>Your Balance</h6>
                <span className={styles.balance}>${(transactions.filter(transaction => transaction.type === 'income').reduce((prev, cur) => prev + cur.amount, 0) - transactions.filter(transaction => transaction.type === 'expense').reduce((prev, cur) => prev + cur.amount, 0)).toFixed(2)}</span>
                <div className={styles.total}>
                    <div className={styles.left}>
                        <h6>INCOME</h6>
                        <span className={styles.plus}>{transactions.filter(transaction => transaction.type === 'income').reduce((prev, cur) => prev + cur.amount, 0).toFixed(2)}</span>
                    </div>
                    <div className={styles.bar}></div>
                    <div className={styles.right}>
                        <h6>EXPENSE</h6>
                        <span className={styles.minus}>{transactions.filter(transaction => transaction.type === 'expense').reduce((prev, cur) => prev + cur.amount, 0).toFixed(2)}</span>
                    </div>
                </div>
                <h6 className={styles.heading}>Add new transaction</h6>
                <form onSubmit={formHandler}>
                    <label htmlFor="desc">Description</label>
                    <input type="text" id="desc" required placeholder='Enter Description' value={description} onChange={(e) => setDescription(e.target.value)} ref={descriptionEl} />
                    <label htmlFor="type">Type</label>
                    <select id="type" required value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="" disabled>Select Type</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                    <label htmlFor="amount">Amount</label>
                    <input type="number" id="amount" required placeholder='Enter Amount' value={amount} onChange={e => setAmount(e.target.value)} />
                    <button type='submit'>{indexOfSelectedEditTransaction ? "Save" : "Add"} Transaction</button>
                </form>
                <button onClick={showTransactions}>{isTransactionsShowing ? "Hide" : "Show"} Transactions</button>
            </div>
        </div>
    )
}

export default Tracker
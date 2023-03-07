import styles from './Transactions.module.css'
import { MdModeEditOutline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAllTransaction, deleteSeletedTransaction } from './redux';

const Transaction = ({ index, transaction, clickOnEdit }) => {
    const dispatch = useDispatch();
    return (
        <div className={styles.transaction} style={{ "--index": index }}>
            <div className={styles.left}>
                <span>{transaction.description}</span>
                <span>${transaction.amount.toFixed(2)}</span>
            </div>
            <div className={styles.right} style={{ "--i": transaction.type === 'income' ? '#2ecc71' : '#c0392b' }}></div>
            <div className={styles.editBox}><button onClick={() => clickOnEdit(index)}><MdModeEditOutline /></button><button onClick={() => dispatch(deleteSeletedTransaction(index))}><AiTwotoneDelete /></button></div>
        </div>
    )
}

const Transactions = ({ clickOnEdit }) => {
    const transactions = useSelector(store => store.transactions);
    const dispatch = useDispatch();
    return (
        <div className={styles.container}>
            <h2>Previous Transactions</h2>
            {
                transactions.length === 0 ? "No Record!" : transactions.map((transaction, index) => <Transaction key={index} index={index} transaction={transaction} clickOnEdit={clickOnEdit} />)
            }
            {transactions.length !== 0 && <div onClick={() => dispatch(deleteAllTransaction())} className={styles.clearAll}><button>Clear All</button></div>}
        </div>
    )
}

export default Transactions
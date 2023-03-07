import { memo, useCallback } from 'react';
import { PieChart } from 'react-minimal-pie-chart'
import { useSelector } from 'react-redux';
import styles from './PieGraph.module.css'
// function getShadesOfColor(hue) {

// }
const Graph = () => {
    const transactions = useSelector(store => store.transactions);
    const cacheValue = useCallback((hue) => {
        let saturation = Math.floor(Math.random() * 30) + 40;
        let lightness = Math.floor(Math.random() * 30) + 40;
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`
    }, [transactions])
    let incomeArray = transactions.filter(transaction => transaction.type === 'income');
    incomeArray = Array.from(new Set(incomeArray.map(transaction => transaction.description))).map(description =>
        ({ title: description, value: Number(incomeArray.filter(transaction => transaction.description === description).reduce((prev, transaction) => Number(transaction.amount) + prev, 0).toFixed(0)), color: cacheValue(130) })
    )
    let expenseArray = transactions.filter(transaction => transaction.type === 'expense');
    expenseArray = Array.from(new Set(expenseArray.map(transaction => transaction.description))).map(description =>
        ({ title: description, value: Number(expenseArray.filter(transaction => transaction.description === description).reduce((prev, transaction) => Number(transaction.amount) + prev, 0).toFixed(0)), color: cacheValue(6) })
    )
    return (
        <div>
            <div className={styles.container}>
                <h2>Total Income</h2>
                {
                    transactions.filter(transaction => transaction.type === 'income').length === 0 ? "No Record!" :
                        <div className={styles.graphContainer} style={{ "--i": "0" }}>
                            <div style={{ width: "50%", margin: "0 auto" }}>
                                <PieChart
                                    data={
                                        incomeArray
                                    }
                                    label={(labelRenderProps) => labelRenderProps.dataEntry.value}
                                    labelStyle={{ fontSize: 8, fill: "#fff" }}
                                    animate
                                />
                            </div>
                        </div>
                }
            </div>
            <div className={styles.container}>
                <h2>Total Expense</h2>
                {
                    transactions.filter(transaction => transaction.type === 'expense').length === 0 ? "No Record!" :
                        <div className={styles.graphContainer} style={{ "--i": "1" }}>
                            <div style={{ width: "50%", margin: "0 auto" }}>
                                <PieChart
                                    data={expenseArray}
                                    label={(labelRenderProps) => labelRenderProps.dataEntry.value}
                                    labelStyle={{ fontSize: 8, fill: "#fff" }}
                                    animate
                                    animationDuration={700}
                                />
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}

export default memo(Graph)
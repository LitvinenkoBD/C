import style from "../Exchange/Exchange.module.css";
import {useEffect} from "react";

const Exchange = (props) => {

    let userLang = navigator.language || navigator.userLanguage;
    userLang = userLang.slice(0, 2).toLowerCase();

    let baseApp
    switch (userLang) {
        case 'ru':
            baseApp = "RUB";
            break;

        case 'en':
            baseApp = "USD"
            break;

        case 'de':
        case 'cs':
        case 'fr':
        case 'it':
            baseApp = "EUR"
            break;
        default:
            baseApp = "USD"
    }

    const interests = props.exchange.interests.filter(el => el !== baseApp)

    useEffect( () => {
        props.setActualRates(interests, baseApp);
    }, [])


    const table = props.exchange.actualRates.map(el => {
        const actualBaseApp = props.exchange.baseApp
        return <tr><td>1 {el.base}</td><td>{el.rates[actualBaseApp]}</td></tr>
    })

    return (
        <div className={style.Main}>
            <h2 className="visuallyHidden">Exchange rates</h2>
            <div className={style.baseCurrency}>
                <p>Your base currency: {props.exchange.baseApp}</p>
            </div>
            <table>
                <tbody>
                    <tr><th>From</th><th>To</th></tr>
                    {table}
                </tbody>
            </table>
        </div>
    )
}

export default Exchange;
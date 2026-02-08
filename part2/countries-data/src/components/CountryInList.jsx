import { useState } from 'react'
import Country from "./Country";

const CountryInList = ({country}) => {

    const [showFlag, setShowFlag] = useState(false)
    let showLabel = showFlag
    ? 'Hide' : 'Show'

    const handleShowButton = (event) =>{
        setShowFlag(!showFlag)
        
    }  

    return (
        <li className="countryInList">
            {country.name.common} 
            <button onClick={handleShowButton}>{showLabel}</button>
            {showFlag ? <Country country={country} /> : null}
        </li>
    )
}

export default CountryInList
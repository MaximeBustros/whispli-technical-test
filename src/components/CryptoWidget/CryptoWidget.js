import React, { useState, useEffect } from 'react'
import './CryptoWidget.css';
 
const CryptoWidget = () => {
  const [searchedText, setSearchedText] = useState('')
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://api2.binance.com/api/v3/ticker/24hr', {
          method: 'GET'
        })

        const json = await res.json()
        console.log(json);
        setData(json)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const result = data?.find(x => x.symbol === searchedText);

  return(
    <div className='AddBorder CryptoWidgetContainer'>
      <input 
        className='SearchBox' 
        placeholder='Search for Symbol' 
        value={searchedText}
        onChange={(e) => setSearchedText(e.target.value)}
      />
      <span className='InformationBar'>
        <label>Symbol</label>
        <label>High Price</label>
        <label>Low Price</label>
      </span>
      <span className='InformationBar'>
        <label>{result?.symbol}</label>
        <label>{result?.highPrice}</label>
        <label>{result?.lowPrice}</label>
      </span>
    </div>
  )
}
 
export default CryptoWidget
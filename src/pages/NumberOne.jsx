import { useEffect, useState } from "react";
import axios from "axios";

const NumberOne = () => {
  const [rate, setRate] = useState(1); 
  const [field, setField] = useState('');
  const [result, setResult] = useState(0);
  const [checkedValute, setCheckedValute] = useState('USD');

  useEffect(() => {
    axios.get(`https://api.fastforex.io/fetch-one?from=${checkedValute === 'USD' ? 'EUR' : 'USD'}&to=${checkedValute === 'USD' ? 'USD' : 'EUR'}&api_key=${import.meta.env.VITE_API_KEY}`)
      .then(response => {
        if (response.status === 200) {
          setRate(checkedValute === 'USD' ? response.data.result.USD : response.data.result.EUR);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [checkedValute]); 

  function handleConvert(event) {
    event.preventDefault();
    setResult((field * rate).toFixed(2));
  }

  return (
    <div className="max-w-[1100px] w-full mx-auto py-[50px] flex flex-col justify-center items-center gap-[25px]">
      <h1 className="text-[30px]">Birinchi Masala!</h1>
      <p>Qaysini tanlasangiz oshanga konvertatsiya qilinadi!</p>
      <div className="flex gap-8">
        <label className="select-none cursor-pointer flex items-center gap-2" htmlFor="usd">
          <input id="usd" name="checked" value={'USD'} onChange={(e) => { setCheckedValute(e.target.value) }} type="radio" checked={checkedValute === 'USD'} />
          USD
        </label>
        <label className="select-none cursor-pointer flex items-center gap-3" htmlFor="eur">
          <input id="eur" name="checked" value={'EUR'} onChange={(e) => { setCheckedValute(e.target.value) }} type="radio" checked={checkedValute === 'EUR'} />
          EUR
        </label>
      </div>
      <form className="flex gap-4 bg-blue-500 max-w-[350px] w-full rounded-md" onSubmit={handleConvert}>
        <input className="w-full px-[15px] py-[7px] border-[2px] rounded-md" onChange={(e) => { setField(e.target.value) }} type="number" placeholder="Enter your money.." />
        <button className="pr-[20px] text-center text-white" type="submit">Convert</button>
      </form>
      <h1 className="text-green-500 text-[20px] select-none">{result}</h1>
    </div>
  );
};

export default NumberOne;

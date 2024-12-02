import axios from 'axios';
import React, { useState } from 'react';

const NumberTwo = () => {
  const [username, setUsername] = useState('');
  const [data, setData] = useState([]);
  const [notFoundUsername, setNotFoundUsername] = useState(false);
  function handleSearch(event) {
    event.preventDefault();


    if (username.trim()) {
      setNotFoundUsername(false);

      axios.get(`https://api.github.com/users/${username}/repos`, {
        headers: {
          'Authorization': `token ${import.meta.env.VITE_GITHUB_TOKEN}`
        }
      })
        .then(response => {
          if (response.status === 200) {
            if (response.data.length === 0) {
              setNotFoundUsername(true);
            } else {
              setData(response.data);
            }
          }
        })
        .catch(er => {
          setNotFoundUsername(true);
          console.log(er);
        });
    } else {
      setNotFoundUsername(true);
    }
  }

  return (
    <div className="max-w-[1100px] w-full mx-auto py-[50px] flex flex-col justify-center items-center gap-[25px]">
      <h1 className="text-[30px]">Ikkinchi Masala!</h1>
      <form className='flex gap-4 bg-blue-500 max-w-[350px] w-full rounded-md'>
        <input
          className="w-full px-[15px] py-[7px] border-[2px] rounded-md"
          onChange={(e) => { setUsername(e.target.value); }}
          type="text"
          placeholder='Enter your GitHub username..'
        />
        <button className="pr-[20px] text-center text-white" onClick={handleSearch}>Search</button>
      </form>

      <p className='text-[18px] mt-[20px]'>{notFoundUsername ? 'Foydalanuvchini GitHub username topilmadi!!' : ''}</p>

      <div className="mt-[20px] w-full max-w-[800px] flex flex-col gap-[30px]">
        {data.length > 0 ? (
          data.map((value, index) => (
            <div key={index} className="border-[2px] rounded-lg p-4 flex items-center gap-6">
              <img src={value.owner.avatar_url} alt={`${value.name} Avatar`} className="w-[60px] h-[60px] rounded-full" />
              <div>
                <p><strong>Repo Name:</strong> {value.name}</p>
                <p className='flex gap-2'><strong>Star:</strong> <p className='text-yellow-400'>{value.stargazers_count}</p></p>
                <p><strong>Vercel link:</strong> <span className='text-blue-500 underline cursor-pointer select-none'>{value.homepage ? value.homepage : ''}</span></p>
              </div>
            </div>
          ))
        ) : null}
      </div>
    </div>
  );
};

export default NumberTwo;

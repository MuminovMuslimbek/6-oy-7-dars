import axios from 'axios'
import React, { useState } from 'react'

function NumberThree() {
  const [bookname, setBookname] = useState('')
  const [data, setData] = useState([])
  const [notFoundBook, setNotFoundBook] = useState(false)
  function handleSearch(event) {
    const value = event.target.value
    setBookname(value)
    if (value) {
      axios
        .get(`https://www.googleapis.com/books/v1/volumes?q=${value}`)
        .then(response => {
          if (response.status === 200 && response.data.items) {
            setData(response.data.items)
            setNotFoundBook(false)
          } else {
            setData([])
            setNotFoundBook(true)
          }
        })
        .catch(error => {
          console.log(error)
          setData([])
          setNotFoundBook(true)
        })
    } else {
      setData([])
      setNotFoundBook(false)
    }
  }

  return (
    <div className="max-w-[2000px] w-full mx-auto py-[50px] flex flex-col justify-center items-center gap-[25px]">
      <h1 className="text-[30px]">Uchinchi Masala!</h1>
      <form className="flex gap-4 bg-blue-500 max-w-[350px] w-full rounded-md">
        <input className="w-full px-[15px] py-[7px] border-[2px] rounded-md"onChange={handleSearch}value={bookname}type="text"placeholder="Enter your book name.."/>
      </form>
      <p className="text-[18px] mt-[20px]">
        {notFoundBook && 'Bunday kitob mavjud emas !!'}
      </p>
      <div className="flex flex-wrap gap-[30px] justify-center">
        {data.map((value, index) => (
          <div key={index} className="border mb-2 max-w-[500px] w-full flex gap-4 rounded-md">
            <img src={value.volumeInfo.imageLinks.thumbnail} className="w-[150px] h-[200px] object-cover mt-2" />
            <div className='flex flex-col gap-2 p-4'>
              <h3 className="font-bold">{value.volumeInfo.title || 'Title not available'}</h3>
              <p>{value.volumeInfo.authors?.join(', ')}</p>
              <p>{value.volumeInfo.publishedDate}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NumberThree

import React, { Dispatch, SetStateAction } from 'react'
type SearchBooks = {
  searchValue: string
  setSearchValue: Dispatch<SetStateAction<string>>
}
function SearchBook({ searchValue, setSearchValue }: SearchBooks) {

  const onSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setSearchValue(e.target.value)
  }
  return (
    <div className="flex justify-center my-10">
      <div className="join">
        <div>
          <div>
            <input
              className="input join-item input-bordered input-primary w-full max-w-xs"
              value={searchValue}
              placeholder="Buscar..."
              onChange={onSearchValueChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchBook

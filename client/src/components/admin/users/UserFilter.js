import React from 'react'

const UserFilter = () => {
  return (
    <form className="form-inline my-2 my-lg-0 float-right">
      <input
        className="form-control mr-sm-2"
        // ref={text}
        type="search"
        placeholder="Search user..."
        // onChange={onChange}
      />
    </form>
  )
}

export default UserFilter

import { useEffect, useState } from "react";
import './App.scss'




const App = () => {

  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false);
  // console.log(users, 'users')

  useEffect(() => {
    if (searchTerm === '') {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => setUsers(data))
    } else {
      setUsers(users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())))
    }

  }, [searchTerm])

  const onInputChange = (value) => {
    setSearchTerm(value)
  }

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setSearchTerm('');
    setIsOpen(false);
  }

  return (
    <div className="container">

      {/* search-box */}

      <div className="search-box">

        <input
          type="text"
          placeholder=" "
          value={searchTerm}
          onChange={(e) => onInputChange(e.target.value)}
          onFocus={handleOpen}
        />

        
        {isOpen && <button onClick={handleClose}
        type="reset"
        />}

      </div>

      {/* card-container */}

      <div className="card-container">
        {users?.map((user) => (
          <div key={user?.id} className="card">
            <img className="user-img"
              src={`https://avatars.dicebear.com/api/adventurer/co.uk.${user.email}.svg`}
              alt={"avatar"}
              style={{ width: "100%" }}
            />
            <div className="info">
              <h3 >{user?.name}</h3>
              <p>{user?.email}</p>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default App;

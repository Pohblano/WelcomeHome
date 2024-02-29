import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
   
    const userToken = JSON.parse(tokenString);
    // console.log(userToken, 'get token')
    // console.log(userToken, typeof(userToken), 'GETTOKEN')

    return userToken
  };

  const [token, setToken] = useState(getToken());
 
  const saveToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken.token));
    setToken(userToken.token);
    // console.log(userToken.token, typeof(userToken.token), 'GETTOKEN')
  };

  const deleteToken = () => {
    localStorage.removeItem("token")
    setToken()
  }
  return {
    setToken: saveToken,
    deleteToken,
    token
  }
}
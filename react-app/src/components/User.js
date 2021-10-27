import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function User({ profile }) {
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const sessionUser = useSelector(state => state.session.user);

  console.log("profile", profile)
  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }
  if( profile === "self" ){
    return (
      <div className="userMain">
        <div className="topInfo">

        </div>
        <div>

        </div>
        <ul>
          <li>
            <strong>User Id</strong> {}
          </li>
          <li>
            <strong>Name</strong> {sessionUser?.fname} {sessionUser?.lname[0]}.
          </li>
          <li>
            <strong>Email</strong> {user.email}
          </li>
        </ul>
      </div>
    )
  } else {
    return (
      <div>
        <ul>
          <li>
            <strong>User Id</strong> {userId}
          </li>
          <li>
            <strong>Username</strong> {user.username}
          </li>
          <li>
            <strong>Email</strong> {user.email}
          </li>
        </ul>
      </div>
    )
  }
}
export default User;

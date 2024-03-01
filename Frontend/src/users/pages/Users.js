import React, { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/componets/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/componets/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users"
        );
        if (isMounted) {
          setLoadedUsers(responseData.users);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
    return () => {
      setIsMounted(false);
    };
  }, [sendRequest, isMounted]);

  return (
    <React.Fragment>
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      {isLoading && (
        <div className="spinner">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;

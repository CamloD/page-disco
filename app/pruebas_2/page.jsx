"use client";

import React, { useEffect, useState } from 'react';
import User from './User';
import AddUser from './AddUser';

const UserList = () => {
  const USER_API_BASE_URL = "http://localhost:8080/api/v1/users";
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(USER_API_BASE_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("No se pudieron obtener los usuarios");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const editUser = (e, id) => {
    e.preventDefault();
    setUserId(id);
  };

  const deleteUser = (e, id) => {
    e.preventDefault();
    fetch(USER_API_BASE_URL + "/" + id, {
      method: "DELETE",
    }).then((res) => {
      if (users) {
        setUsers((prevElement) => {
          return prevElement.filter((user) => user.id !== id);
        });
      }
    });
  };

  return (
    <div className='flex flex-col w-full py-24 sm:py-16 md:py-12 min-h-screen bg-[#3a3a3a]'>
        <div className="container mx-auto my-8 mb-24">
            <div className="flex justify-end mb-4">
            <AddUser onUserAdded={fetchUsers} />
            </div>
            <div className="flex">
            <table className="min-w-full rounded-lg border border-gray-300 bg-white overflow-hidden shadow-md">
                <thead className="bg-gray-50">
                <tr>
                    <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">Nombres</th>
                    <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">Apellidos</th>
                    <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">Correo Electrónico</th>
                    <th className="text-right font-medium text-gray-500 uppercase tracking-wide py-3 px-6">Acciones</th>
                </tr>
                </thead>
                <tbody className="bg-[#eaeaea]">
                {loading ? (
                    <tr>
                    <td colSpan="4" className="text-center py-3">Cargando...</td>
                    </tr>
                ) : error ? (
                    <tr>
                    <td colSpan="4" className="text-center py-3 text-red-600">{error}</td>
                    </tr>
                ) : users.length > 0 ? (
                    users.map(user => (
                    <User 
                    user={user}
                    key={user.id}
                    deleteUser={deleteUser}
                    editUser={editUser}
                    />
                    ))
                ) : (
                    <tr>
                    <td colSpan="4" className="text-center py-3">No se encontraron usuarios</td>
                    </tr>
                )}
                </tbody>
            </table>
            </div>
        </div>
    </div>
  );
};

export default UserList;

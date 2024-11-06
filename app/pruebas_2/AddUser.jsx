import { Button, Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';

const AddUser = ({ onUserAdded }) => {
  const USER_API_BASE_URL = "http://localhost:8080/api/v1/users";

  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    emailId: "",
  });

  const [error, setError] = useState('');

  const open = () => {
    setIsOpen(true);
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.paddingRight = '0px';
  };

  const close = () => {
    setIsOpen(false);
    document.documentElement.style.overflow = '';
    document.documentElement.style.paddingRight = '';
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  const validateUser = () => {
    const { firstName, lastName, emailId } = user;
    if (!firstName || !lastName || !emailId) {
      setError('Todos los campos son obligatorios.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(emailId)) {
      setError('Dirección de correo electrónico no válida.');
      return false;
    }
    setError('');
    return true;
  };

  const saveUser = async (e) => {
    e.preventDefault();
    if (!validateUser()) return;

    try {
      const response = await fetch(USER_API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("No se pudo guardar la usuario.");
      }

      await response.json();
      onUserAdded(); // Notificar a UserList para actualizar la lista de usuarios
      reset(); // Resetea el estado del usuario
      close(); // Cierra el modal
    } catch (error) {
      console.error("No se pudo guardar la usuario:", error);
      setError('No se pudo guardar la usuario.');
    }
  };

  const reset = () => {
    setUser({
      id: "",
      firstName: "",
      lastName: "",
      emailId: "",
    });
  };

  return (
    <>
      <div className="container mx-auto my-8 w-full">
        <div className="h-12">
          <Button
            onClick={open}
            className="rounded bg-slate-600 hover:bg-slate-800 text-white px-6 py-2 font-semibold"
          >
             Añadir Usuario
          </Button>
        </div>
      </div>
      <Dialog open={isOpen} onClose={close} className="relative z-10">
        <Transition show={isOpen} as={Fragment}>
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md p-6 mx-auto bg-white shadow-lg rounded">
                <DialogTitle as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Añadir Nuevo Usuario
                </DialogTitle>
                <div className="flex flex-col space-y-4 mt-4">
                  {error && <p className="text-red-500">{error}</p>}
                  <div>
                    <label className="block text-gray-600 text-sm font-normal">Nombres</label>
                    <input
                      type="text"
                      name="firstName"
                      value={user.firstName}
                      onChange={handleChange}
                      className="mt-2 block w-full rounded-lg border bg-gray-100 py-1.5 px-3 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm font-normal">Apellidos</label>
                    <input
                      type="text"
                      name="lastName"
                      value={user.lastName}
                      onChange={handleChange}
                      className="mt-2 block w-full rounded-lg border bg-gray-100 py-1.5 px-3 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm font-normal">Correo Electrónico</label>
                    <input
                      type="text"
                      name="emailId"
                      value={user.emailId}
                      onChange={handleChange}
                      className="mt-2 block w-full rounded-lg border bg-gray-100 py-1.5 px-3 text-sm"
                    />
                  </div>
                  <div className="flex space-x-4 pt-4">
                    <Button
                      onClick={saveUser}
                      className="rounded text-white font-semibold bg-green-500 hover:bg-green-700 py-2 px-6"
                    >
                      Guardar
                    </Button>
                    <Button
                      onClick={close}
                      className="rounded text-white font-semibold bg-red-500 hover:bg-red-700 py-2 px-6"
                    >
                      Cerrar
                    </Button>
                  </div>
                </div>
              </DialogPanel>
            </Transition.Child>
          </div>
        </Transition>
      </Dialog>
    </>
  );
};

export default AddUser;


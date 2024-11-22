import { Dialog, Transition } from "@headlessui/react";
import { React, useState, useEffect, Fragment } from "react";

const EditUser = ({ userId, setResponseUser, closeModal }) => {
  const USER_API_BASE_URL = "http://localhost:8080/api/v1/users";

  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    emailId: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      setIsOpen(true);
      const fetchData = async () => {
        try {
          const response = await fetch(USER_API_BASE_URL + "/" + userId);
          if (!response.ok) {
            throw new Error("No se pudo obtener el usuario");
          }
          const _user = await response.json();
          setUser(_user);
        } catch (error) {
          setError(error.message);
        }
      };
      fetchData();
    }
  }, [userId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const validateForm = () => {
    if (!user.firstName || !user.lastName || !user.emailId) {
      setError("Por favor complete todos los campos.");
      return false;
    }
    return true;
  };

  const updateUser = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(USER_API_BASE_URL + "/" + userId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Algo salió mal al actualizar el usuario");
      }

      const updatedUser = await response.json();
      setResponseUser(updatedUser);
      closeModal();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
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
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                Actualizar Usuario
              </Dialog.Title>
              <div className="py-2">
                {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
                <div className="h-14 my-4">
                  <label className="block text-gray-600 text-sm font-normal">Nombres</label>
                  <input
                    type="text"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleChange}
                    className="h-10 w-96 border mt-2 px-2 py-2"
                  />
                </div>
                <div className="h-14 my-4">
                  <label className="block text-gray-600 text-sm font-normal">Apellidos</label>
                  <input
                    type="text"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleChange}
                    className="h-10 w-96 border mt-2 px-2 py-2"
                  />
                </div>
                <div className="h-14 my-4">
                  <label className="block text-gray-600 text-sm font-normal">Correo Electrónico</label>
                  <input
                    type="text"
                    name="emailId"
                    value={user.emailId}
                    onChange={handleChange}
                    className="h-10 w-96 border mt-2 px-2 py-2"
                  />
                </div>
                <div className="h-14 my-4 space-x-4 pt-4">
                  <button
                    onClick={updateUser}
                    disabled={loading}
                    className="rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6"
                  >
                    {loading ? "Actualizando..." : "Actualizar"}
                  </button>
                  <button
                    onClick={closeModal}
                    className="rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditUser;

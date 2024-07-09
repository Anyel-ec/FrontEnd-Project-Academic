import React, { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { setPageTitle } from '../../../store/themeConfigSlice';
import UserList from './UserList';
import UserGrid from './UserGrid';
import UserForm from './UserForm';
import { IconUserPlus, IconListCheck, IconLayoutGrid, IconSearch, IconX } from './IconImports';
import { getAllStudents, saveStudent, updateStudent, deleteStudent } from '../../api';

const Users = () => {
    const dispatch = useDispatch();
    const isRtl = useSelector((state) => state.themeConfig.rtlClass === 'rtl');
    
    useEffect(() => {
        dispatch(setPageTitle('Users'));
        fetchUsers();
    }, [dispatch]);

    const [addContactModal, setAddContactModal] = useState(false);
    const [date1, setDate1] = useState('2022-07-05');
    const [value, setValue] = useState('list');
    const [params, setParams] = useState({
        id: null,
        name: '',
        email: '',
        phone: '',
        role: '',
        location: ''
    });
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const data = await getAllStudents();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const saveUser = async () => {
        const { name, email, phone, role, id } = params;
        if (!name || !email || !phone || !role) {
            showMessage('All fields are required.', 'error');
            return;
        }

        try {
            if (id) {
                await updateStudent(id, params);
            } else {
                await saveStudent(params);
            }
            showMessage('User has been saved successfully.');
            fetchUsers();
            setAddContactModal(false);
        } catch (error) {
            console.error('Error saving user:', error);
            showMessage('Error saving user.', 'error');
        }
    };

    const editUser = (user = {}) => {
        setParams(user);
        setAddContactModal(true);
    };

    const deleteUserHandler = async (user) => {
        try {
            await deleteStudent(user.id);
            showMessage('User has been deleted successfully.');
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
            showMessage('Error deleting user.', 'error');
        }
    };

    const showMessage = (msg, type = 'success') => {
        Swal.fire({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    };

    return (
        <div>
            <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-xl">Users</h2>
                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                    <div className="flex gap-3">
                        <button className="btn btn-primary" onClick={() => editUser()}>
                            <IconUserPlus className="ltr:mr-2 rtl:ml-2" /> Add Contact
                        </button>
                        <button className={`btn btn-outline-primary p-2 ${value === 'list' && 'bg-primary text-white'}`} onClick={() => setValue('list')}>
                            <IconListCheck />
                        </button>
                        <button className={`btn btn-outline-primary p-2 ${value === 'grid' && 'bg-primary text-white'}`} onClick={() => setValue('grid')}>
                            <IconLayoutGrid />
                        </button>
                    </div>
                    <div className="relative">
                        <input type="text" placeholder="Search Users" className="form-input py-2 ltr:pr-11 rtl:pl-11 peer" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <button type="button" className="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-primary">
                            <IconSearch className="mx-auto" />
                        </button>
                    </div>
                </div>
            </div>
            {value === 'list' && <UserList users={users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()))} editUser={editUser} deleteUser={deleteUserHandler} />}
            {value === 'grid' && <UserGrid users={users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()))} editUser={editUser} deleteUser={deleteUserHandler} />}
            
            <Transition appear show={addContactModal} as={Fragment}>
                <Dialog as="div" open={addContactModal} onClose={() => setAddContactModal(false)} className="relative z-[51]">
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-[black]/60" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center px-4 py-8">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                    <button
                                        type="button"
                                        onClick={() => setAddContactModal(false)}
                                        className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                    >
                                        <IconX />
                                    </button>
                                    <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                        {params.id ? 'Edit Contact' : 'Add Contact'}
                                    </div>
                                    <UserForm 
                                        params={params} 
                                        setParams={setParams} 
                                        date={date1} 
                                        setDate={setDate1} 
                                        isRtl={isRtl} 
                                        saveUser={saveUser} 
                                        closeModal={() => setAddContactModal(false)} 
                                    />
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default Users;

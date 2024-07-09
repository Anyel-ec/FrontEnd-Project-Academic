import { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { IconUserPlus, IconListCheck, IconLayoutGrid, IconUser, IconX, IconSearch } from './IconImports';

import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';

const Users = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Users'));
    }, [dispatch]);

    const [addContactModal, setAddContactModal] = useState(false);
    const isRtl = useSelector((state) => state.themeConfig.rtlClass === 'rtl');
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
    const contactList = [
        {
            id: 1,
            path: 'profile-35.png',
            name: 'Alan Green',
            role: 'Web Developer',
            email: 'alan@mail.com',
            location: 'Boston, USA',
            phone: '+1 202 555 0197',
            posts: 25,
            followers: '5K',
            following: 500,
        },
        {
            id: 2,
            path: 'profile-35.png',
            name: 'Linda Nelson',
            role: 'Web Designer',
            email: 'linda@mail.com',
            location: 'Sydney, Australia',
            phone: '+1 202 555 0170',
            posts: 25,
            followers: '21.5K',
            following: 350,
        },
        {
            id: 3,
            path: 'profile-35.png',
            name: 'Lila Perry',
            role: 'UX/UI Designer',
            email: 'lila@mail.com',
            location: 'Miami, USA',
            phone: '+1 202 555 0105',
            posts: 20,
            followers: '21.5K',
            following: 350,
        },
    ];
    const [filteredItems, setFilteredItems] = useState(contactList);

    useEffect(() => {
        setFilteredItems(contactList.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
        ));
    }, [search, contactList]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setParams({ ...params, [id]: value });
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

    const saveUser = () => {
        const { name, email, phone, role, id } = params;
        if (!name || !email || !phone || !role) {
            showMessage('All fields are required.', 'error');
            return;
        }

        if (id) {
            const user = filteredItems.find((d) => d.id === id);
            Object.assign(user, params);
        } else {
            const maxUserId = filteredItems.reduce((max, user) => Math.max(max, user.id), 0);
            const newUser = { ...params, id: maxUserId + 1, path: 'profile-35.png', posts: 20, followers: '5K', following: 500 };
            setFilteredItems([newUser, ...filteredItems]);
        }

        showMessage('User has been saved successfully.');
        setAddContactModal(false);
    };

    const editUser = (user = {}) => {
        setParams(user);
        setAddContactModal(true);
    };

    const deleteUser = (user) => {
        setFilteredItems(filteredItems.filter((d) => d.id !== user.id));
        showMessage('User has been deleted successfully.');
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
            {value === 'list' && (
                <div className="mt-5 panel p-0 border-0 overflow-hidden">
                    <div className="table-responsive">
                        <table className="table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Location</th>
                                    <th>Phone</th>
                                    <th className="!text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map((contact) => (
                                    <tr key={contact.id}>
                                        <td className="flex items-center w-max">
                                            {contact.path ? (
                                                <img src={`/assets/images/${contact.path}`} className="h-8 w-8 rounded-full object-cover ltr:mr-2 rtl:ml-2" alt="avatar" />
                                            ) : (
                                                <div className="border border-gray-300 dark:border-gray-800 rounded-full p-2 ltr:mr-2 rtl:ml-2">
                                                    <IconUser className="w-4.5 h-4.5" />
                                                </div>
                                            )}

                                            <div>{contact.name}</div>
                                        </td>
                                        <td>{contact.email}</td>
                                        <td className="whitespace-nowrap">{contact.location}</td>
                                        <td className="whitespace-nowrap">{contact.phone}</td>
                                        <td className="flex gap-4 items-center justify-center">
                                            <button className="btn btn-sm btn-outline-primary" onClick={() => editUser(contact)}>Edit</button>
                                            <button className="btn btn-sm btn-outline-danger" onClick={() => deleteUser(contact)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {value === 'grid' && (
                <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-5 w-full">
                    {filteredItems.map((contact) => (
                        <div className="bg-white dark:bg-[#1c232f] rounded-md overflow-hidden text-center shadow relative" key={contact.id}>
                            <div className="bg-white/40 rounded-t-md bg-center bg-cover p-6 pb-0" style={{ backgroundImage: `url('/assets/images/notification-bg.png')` }}>
                                <img className="object-contain w-4/5 max-h-40 mx-auto" src={`/assets/images/${contact.path}`} alt="contact_image" />
                            </div>
                            <div className="px-6 pb-24 -mt-10 relative">
                                <div className="shadow-md bg-white dark:bg-gray-900 rounded-md px-2 py-4">
                                    <div className="text-xl">{contact.name}</div>
                                    <div className="text-white-dark">{contact.role}</div>
                                    <div className="flex items-center justify-between flex-wrap mt-6 gap-3">
                                        <div className="flex-auto">
                                            <div className="text-info">{contact.posts}</div>
                                            <div>Posts</div>
                                        </div>
                                        <div className="flex-auto">
                                            <div className="text-info">{contact.following}</div>
                                            <div>Following</div>
                                        </div>
                                        <div className="flex-auto">
                                            <div className="text-info">{contact.followers}</div>
                                            <div>Followers</div>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <ul className="flex space-x-4 rtl:space-x-reverse items-center justify-center">
                                            {[IconFacebook, IconInstagram, IconLinkedin, IconTwitter].map((Icon, idx) => (
                                                <li key={idx}>
                                                    <button className="btn btn-outline-primary p-0 h-7 w-7 rounded-full">
                                                        <Icon />
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="mt-6 grid grid-cols-1 gap-4 ltr:text-left rtl:text-right">
                                    <div className="flex items-center">
                                        <div className="flex-none ltr:mr-2 rtl:ml-2">Email :</div>
                                        <div className="truncate text-white-dark">{contact.email}</div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="flex-none ltr:mr-2 rtl:ml-2">Phone :</div>
                                        <div className="text-white-dark">{contact.phone}</div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="flex-none ltr:mr-2 rtl:ml-2">Address :</div>
                                        <div className="text-white-dark">{contact.location}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex gap-4 absolute bottom-0 w-full ltr:left-0 rtl:right-0 p-6">
                                <button className="btn btn-outline-primary w-1/2" onClick={() => editUser(contact)}>Edit</button>
                                <button className="btn btn-outline-danger w-1/2" onClick={() => deleteUser(contact)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

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
                                    <div className="p-5">
                                        <form>
                                            {['name', 'email', 'phone', 'role'].map((field, idx) => (
                                                <div className="mb-5" key={idx}>
                                                    <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                                                    <input 
                                                        id={field} 
                                                        type={field === 'email' ? 'email' : 'text'} 
                                                        placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`} 
                                                        className="form-input" 
                                                        value={params[field]} 
                                                        onChange={handleChange} 
                                                    />
                                                </div>
                                            ))}
                                            <div className="mb-5">
                                                <label>Date of Birth</label>
                                                <Flatpickr
                                                    value={date1}
                                                    options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }}
                                                    className="form-input"
                                                    onChange={setDate1}
                                                />
                                            </div>
                                            <div className="flex justify-end items-center mt-8">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setAddContactModal(false)}>Cancel</button>
                                                <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={saveUser}>{params.id ? 'Update' : 'Add'}</button>
                                            </div>
                                        </form>
                                    </div>
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

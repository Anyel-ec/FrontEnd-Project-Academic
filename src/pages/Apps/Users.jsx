import { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconUserPlus from '../../components/Icon/IconUserPlus';
import IconListCheck from '../../components/Icon/IconListCheck';
import IconLayoutGrid from '../../components/Icon/IconLayoutGrid';
import IconSearch from '../../components/Icon/IconSearch';
import IconUser from '../../components/Icon/IconUser';
import IconFacebook from '../../components/Icon/IconFacebook';
import IconInstagram from '../../components/Icon/IconInstagram';
import IconLinkedin from '../../components/Icon/IconLinkedin';
import IconTwitter from '../../components/Icon/IconTwitter';
import IconX from '../../components/Icon/IconX';

const Users = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Users'));
        fetchUsers();
    }, []);

    const [addContactModal, setAddContactModal] = useState(false);
    const [value, setValue] = useState('list');
    const [defaultParams] = useState({
        id: null,
        firstName: '',
        lastName: '',
        email: '',
    });
    const [params, setParams] = useState(JSON.parse(JSON.stringify(defaultParams)));
    const [search, setSearch] = useState('');
    const [contactList, setContactList] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        setFilteredItems(() => {
            return contactList.filter((item) => item.firstName.toLowerCase().includes(search.toLowerCase()));
        });
    }, [search, contactList]);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/students');
            const data = await response.json();
            setContactList(data);
            setFilteredItems(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const saveUser = async () => {
        if (!params.firstName) {
            showMessage('First Name is required.', 'error');
            return;
        }
        if (!params.lastName) {
            showMessage('Last Name is required.', 'error');
            return;
        }
        if (!params.email) {
            showMessage('Email is required.', 'error');
            return;
        }

        try {
            const method = params.id ? 'PUT' : 'POST';
            const endpoint = params.id ? `http://localhost:8080/api/v1/students/${params.id}` : 'http://localhost:8080/api/v1/students';
            const response = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });
            if (response.ok) {
                fetchUsers();
                showMessage(`User has been ${params.id ? 'updated' : 'added'} successfully.`);
                setAddContactModal(false);
            } else {
                showMessage(`Error ${params.id ? 'updating' : 'adding'} user.`, 'error');
            }
        } catch (error) {
            console.error(`Error ${params.id ? 'updating' : 'adding'} user:`, error);
            showMessage(`Error ${params.id ? 'updating' : 'adding'} user.`, 'error');
        }
    };

    const editUser = (user = null) => {
        setParams(user ? { ...user } : JSON.parse(JSON.stringify(defaultParams)));
        setAddContactModal(true);
    };
    const deleteUser = async (user) => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/students/${user.studentId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchUsers();
                showMessage('User has been deleted successfully.');
            } else {
                showMessage('Error deleting user.', 'error');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            showMessage('Error deleting user.', 'error');
        }
    };

    const showMessage = (msg = '', type = 'success') => {
        const toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    };

    const changeValue = (e) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };

    return (
        <div>
            <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-xl">Users</h2>
                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                    <div className="flex gap-3">
                        <div>
                            <button type="button" className="btn btn-primary" onClick={() => editUser()}>
                                <IconUserPlus className="ltr:mr-2 rtl:ml-2" />
                                Add Contact
                            </button>
                        </div>
                        <div>
                            <button type="button" className={`btn btn-outline-primary p-2 ${value === 'list' && 'bg-primary text-white'}`} onClick={() => setValue('list')}>
                                <IconListCheck />
                            </button>
                        </div>
                        <div>
                            <button type="button" className={`btn btn-outline-primary p-2 ${value === 'grid' && 'bg-primary text-white'}`} onClick={() => setValue('grid')}>
                                <IconLayoutGrid />
                            </button>
                        </div>
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
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th className="!text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map((contact) => (
                                    <tr key={contact.id}>
                                        <td>{contact.firstName}</td>
                                        <td>{contact.lastName}</td>
                                        <td>{contact.email}</td>
                                        <td>
                                            <div className="flex gap-4 items-center justify-center">
                                                <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => editUser(contact)}>
                                                    Edit
                                                </button>
                                                <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => deleteUser(contact)}>
                                                    Delete
                                                </button>
                                            </div>
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
                            <div
                                className="bg-white/40 rounded-t-md bg-center bg-cover p-6 pb-0"
                                style={{
                                    backgroundImage: `url('/assets/images/notification-bg.png')`,
                                    backgroundRepeat: 'no-repeat',
                                    width: '100%',
                                    height: '100%',
                                }}
                            >
                                <img className="object-contain w-4/5 max-h-40 mx-auto" src={`/assets/images/${contact.path}`} alt="contact_image" />
                            </div>
                            <div className="px-6 pb-24 -mt-10 relative">
                                <div className="shadow-md bg-white dark:bg-gray-900 rounded-md px-2 py-4">
                                    <div className="text-xl">{contact.firstName}</div>
                                    <div className="text-white-dark">{contact.role}</div>
                                    <div className="flex items-center justify-between flex-wrap mt-6 gap-3">
                                        <div className="flex-auto">
                                            <div className="text-info">{contact.posts}</div>
                                            <div>Posts</div>
                                        </div>
                                        <div className="flex-auto">
                                            <div className="text-success">{contact.followers}</div>
                                            <div>Followers</div>
                                        </div>
                                        <div className="flex-auto">
                                            <div className="text-danger">{contact.following}</div>
                                            <div>Following</div>
                                        </div>
                                    </div>
                                </div>
                                <ul className="flex justify-center gap-4 mt-6">
                                    <li>
                                        <button type="button" className="bg-facebook">
                                            <IconFacebook className="w-4 h-4" />
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" className="bg-twitter">
                                            <IconTwitter className="w-4 h-4" />
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" className="bg-linkedin">
                                            <IconLinkedin className="w-4 h-4" />
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" className="bg-instagram">
                                            <IconInstagram className="w-4 h-4" />
                                        </button>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex justify-center gap-4 pb-6">
                                <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => editUser(contact)}>
                                    Edit
                                </button>
                                <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => deleteUser(contact)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Transition appear show={addContactModal} as={Fragment}>
                <Dialog as="div" open={addContactModal} onClose={() => setAddContactModal(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="min-h-full flex items-center justify-center p-4">
                            <Transition.Child
                                as={Fragment}
                                enter="transition-transform duration-300"
                                enterFrom="scale-95"
                                enterTo="scale-100"
                                leave="transition-transform duration-200"
                                leaveFrom="scale-100"
                                leaveTo="scale-95"
                            >
                                <Dialog.Panel className="panel border-0 p-0 rounded-lg w-full max-w-lg text-black dark:text-white-dark">
                                    <button type="button" className="absolute top-3 ltr:right-3 rtl:left-3 text-white-dark hover:text-dark" onClick={() => setAddContactModal(false)}>
                                        <IconX />
                                    </button>
                                    <div className="p-5">
                                        <h4 className="text-lg font-medium mb-5">Add Contact</h4>
                                        <form>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="form-group">
                                                    <label htmlFor="firstName">First Name</label>
                                                    <input id="firstName" type="text" value={params.firstName} onChange={changeValue} className="form-input" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="lastName">Last Name</label>
                                                    <input id="lastName" type="text" value={params.lastName} onChange={changeValue} className="form-input" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="email">Email</label>
                                                    <input id="email" type="email" value={params.email} onChange={changeValue} className="form-input" />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="bg-gray-100 dark:bg-gray-800 p-3 flex justify-end gap-2">
                                        <button type="button" className="btn btn-outline-danger" onClick={() => setAddContactModal(false)}>
                                            Cancel
                                        </button>
                                        <button type="button" className="btn btn-primary" onClick={saveUser}>
                                            {params.id ? 'Update' : 'Add'}
                                        </button>
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

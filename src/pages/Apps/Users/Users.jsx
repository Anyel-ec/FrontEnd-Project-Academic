import { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import IconUserPlus from '../../../components/Icon/IconUserPlus';
import IconListCheck from '../../../components/Icon/IconListCheck';
import IconLayoutGrid from '../../../components/Icon/IconLayoutGrid';
import IconSearch from '../../../components/Icon/IconSearch';
import IconX from '../../../components/Icon/IconX';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';

const Users = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Users'));
        fetchUsers();
    }, [dispatch]);

    const isRtl = useSelector((state) => state.themeConfig.rtlClass) === 'rtl';
    // const [date1, setDate1] = useState('2022-07-05');

    const [addContactModal, setAddContactModal] = useState(false);
    const [value, setValue] = useState('list');
    const [defaultParams] = useState({
        id: null,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        dni: '',
        gender: '',
        acceptedTermsAndConditions: false,
    });
    const [params, setParams] = useState(JSON.parse(JSON.stringify(defaultParams)));
    const [search, setSearch] = useState('');
    const [contactList, setContactList] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        setFilteredItems(contactList.filter(item => item.firstName.toLowerCase().includes(search.toLowerCase())));
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

    const requiredFields = {
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        phone: 'Phone',
        dateOfBirth: 'Date Of Birth',
        dni: 'DNI',
        gender: 'Gender',
        acceptedTermsAndConditions: 'Accepted Terms And Conditions',
    };

    const saveUser = async () => {
        for (const field in requiredFields) {
            if (!params[field]) {
                showMessage(`${requiredFields[field]} is required.`, 'error');
                return;
            }
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
        const { id, value, type, checked } = e.target;
        setParams({ ...params, [id]: type === 'checkbox' ? checked : value });
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
                                    <th>Phone</th>
                                    <th>Date Of Birth</th>
                                    <th>DNI</th>
                                    <th>Gender</th>
                                    <th>Accepted Terms</th>
                                    <th className="!text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map((contact) => (
                                    <tr key={contact.id}>
                                        <td>{contact.firstName}</td>
                                        <td>{contact.lastName}</td>
                                        <td>{contact.email}</td>
                                        <td>{contact.phone}</td>
                                        <td>{contact.dateOfBirth}</td>
                                        <td>{contact.dni}</td>
                                        <td>{contact.gender}</td>
                                        <td>{contact.acceptedTermsAndConditions ? 'Yes' : 'No'}</td>
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
                                                    <label htmlFor="dni">DNI</label>
                                                    <input id="dni" type="text" value={params.dni} onChange={changeValue} className="form-input" />
                                                </div>
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
                                                <div className="form-group">
                                                    <label htmlFor="phone">Phone</label>
                                                    <input id="phone" type="text" value={params.phone} onChange={changeValue} className="form-input" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="dateOfBirth">Date of Birth</label>
                                                    <Flatpickr
                                                        id="dateOfBirth"
                                                        value={params.dateOfBirth}
                                                        options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }}
                                                        className="form-input"
                                                        onChange={(date) => setParams({ ...params, dateOfBirth: date[0] })}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="gender">Gender</label>
                                                    <select id="gender" className="form-select" value={params.gender} onChange={changeValue} required>
                                                        <option value="">Select Gender</option>
                                                        <option value="male">Male</option>
                                                        <option value="female">Female</option>
                                                        <option value="other">Other</option>
                                                    </select>
                                                </div>
                                                <div className="form-group flex items-center">
                                                    <label className="flex items-center">
                                                        <input id="acceptedTermsAndConditions" type="checkbox" className="form-checkbox" checked={params.acceptedTermsAndConditions} onChange={changeValue} />
                                                        <span className="ml-2">Accept Terms and Conditions</span>
                                                    </label>
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

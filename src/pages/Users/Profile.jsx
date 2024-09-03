import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from '../../components/Dropdown';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useEffect } from 'react';
import IconPencilPaper from '../../components/Icon/IconPencilPaper';
import IconCoffee from '../../components/Icon/IconCoffee';
import IconCalendar from '../../components/Icon/IconCalendar';
import IconMapPin from '../../components/Icon/IconMapPin';
import IconMail from '../../components/Icon/IconMail';
import IconPhone from '../../components/Icon/IconPhone';
import IconTwitter from '../../components/Icon/IconTwitter';
import IconDribbble from '../../components/Icon/IconDribbble';
import IconGithub from '../../components/Icon/IconGithub';
import IconShoppingBag from '../../components/Icon/IconShoppingBag';
import IconTag from '../../components/Icon/IconTag';
import IconCreditCard from '../../components/Icon/IconCreditCard';
import IconClock from '../../components/Icon/IconClock';
import IconHorizontalDots from '../../components/Icon/IconHorizontalDots';

const Profile = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Profile'));
    });
    const isRtl = useSelector((state) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    return (
        <div>

            <div className="pt-5">
                <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-5">
                    <div className="panel">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Profile</h5>
                        </div>
                        <div className="mb-5">
                            <div className="flex flex-col justify-center items-center">
                                <img src="/assets/images/profile-34.jpeg" alt="img" className="w-24 h-24 rounded-full object-cover  mb-5" />
                                <p className="font-semibold text-primary text-xl">Jimmy Turner</p>
                            </div>
                            <ul className="mt-5 flex flex-col max-w-[160px] m-auto space-y-4 font-semibold text-white-dark">
                                <li className="flex items-center gap-2">
                                    <IconCoffee className="shrink-0" />
                                    Web Developer
                                </li>
                                <li className="flex items-center gap-2">
                                    <IconCalendar className="shrink-0" />
                                    Jan 20, 1989
                                </li>
                                <li className="flex items-center gap-2">
                                    <IconMapPin className="shrink-0" />
                                    New York, USA
                                </li>
                                <li>
                                    <button className="flex items-center gap-2">
                                        <IconMail className="w-5 h-5 shrink-0" />
                                        <span className="text-primary truncate">jimmy@gmail.com</span>
                                    </button>
                                </li>
                                <li className="flex items-center gap-2">
                                    <IconPhone />
                                    <span className="whitespace-nowrap" dir="ltr">
                                        +1 (530) 555-12121
                                    </span>
                                </li>
                            </ul>
                            <ul className="mt-7 flex items-center justify-center gap-2">
                                <li>
                                    <button className="btn btn-info flex items-center justify-center rounded-full w-10 h-10 p-0">
                                        <IconTwitter className="w-5 h-5" />
                                    </button>
                                </li>
                                <li>
                                    <button className="btn btn-danger flex items-center justify-center rounded-full w-10 h-10 p-0">
                                        <IconDribbble />
                                    </button>
                                </li>
                                <li>
                                    <button className="btn btn-dark flex items-center justify-center rounded-full w-10 h-10 p-0">
                                        <IconGithub />
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="panel lg:col-span-2 xl:col-span-3">
                        <div className="mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Task</h5>
                        </div>
                        <div className="mb-5">
                            <div className="table-responsive text-[#515365] dark:text-white-light font-semibold">
                                <table className="whitespace-nowrap">
                                    <thead>
                                        <tr>
                                            <th>Projects</th>
                                            <th>Progress</th>
                                            <th>Task Done</th>
                                            <th className="text-center">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody className="dark:text-white-dark">
                                        <tr>
                                            <td>Paso 1</td>
                                            <td>
                                                <div className="h-1.5 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex w-full">
                                                    <div className="bg-danger rounded-full w-[29.56%]"></div>
                                                </div>
                                            </td>
                                            <td className="text-danger">29.56%</td>
                                            <td className="text-center">2 mins ago</td>
                                        </tr>
                                        <tr>
                                            <td>Paso 2</td>
                                            <td>
                                                <div className="h-1.5 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex w-full">
                                                    <div className="bg-info rounded-full w-1/2"></div>
                                                </div>
                                            </td>
                                            <td className="text-success">50%</td>
                                            <td className="text-center">4 hrs ago</td>
                                        </tr>
                                        <tr>
                                            <td>Paso 3</td>
                                            <td>
                                                <div className="h-1.5 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex w-full">
                                                    <div className="bg-warning rounded-full  w-[39%]"></div>
                                                </div>
                                            </td>
                                            <td className="text-danger">39%</td>
                                            <td className="text-center">a min ago</td>
                                        </tr>
                                        <tr>
                                            <td>Paso 4</td>
                                            <td>
                                                <div className="h-1.5 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex w-full">
                                                    <div className="bg-success rounded-full  w-[78.03%]"></div>
                                                </div>
                                            </td>
                                            <td className="text-success">78.03%</td>
                                            <td className="text-center">2 weeks ago</td>
                                        </tr>

                                        <tr>
                                            <td>Paso 4</td>
                                            <td>
                                                <div className="h-1.5 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex w-full">
                                                    <div className="bg-secondary  rounded-full  w-full"></div>
                                                </div>
                                            </td>
                                            <td className="text-success">100%</td>
                                            <td className="text-center">18 hrs ago</td>
                                        </tr>
                                        <tr>
                                            <td>Paso 5</td>
                                            <td>
                                                <div className="h-1.5 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex w-full">
                                                    <div className="bg-danger rounded-full  w-[19.15%]"></div>
                                                </div>
                                            </td>
                                            <td className="text-danger">19.15%</td>
                                            <td className="text-center">5 days ago</td>
                                        </tr>
                                        <tr>
                                            <td>Paso 6</td>
                                            <td>
                                                <div className="h-1.5 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex w-full">
                                                    <div className="bg-primary rounded-full w-[60.55%]"></div>
                                                </div>
                                            </td>
                                            <td className="text-success">60.55%</td>
                                            <td className="text-center">8 days ago</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Profile;

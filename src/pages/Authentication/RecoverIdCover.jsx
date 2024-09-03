import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setPageTitle } from '../../store/themeConfigSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import IconLockDots from '../../components/Icon/IconLockDots';
import Swal from 'sweetalert2';
import authService from '../../api/AuthService'; // Importar el servicio de autenticación

const RecoverIdCover = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Password Reset'));
    }, [dispatch]);

    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [passwordRequirements, setPasswordRequirements] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validatePasswords = () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]:;"'<>,.?/])[A-Za-z\d!@#$%^&*()_\-+={}[\]:;"'<>,.?/]{8,}$/;

        if (!passwordRegex.test(newPassword)) {
            setPasswordRequirements(
                'La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una minúscula, un número y un símbolo especial.'
            );
            setError('');
            return false;
        }

        if (newPassword !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            setPasswordRequirements('');
            return false;
        }

        setError('');
        setPasswordRequirements('');
        return true;
    };

    useEffect(() => {
        validatePasswords();
    }, [newPassword, confirmPassword]);

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const submitForm = async (e) => {
        e.preventDefault();
        if (validatePasswords()) {
            const username = JSON.parse(localStorage.getItem('user')).username;
            console.log("username", username);
            console.log("newPassword", newPassword);
            try {
                const response = await authService.actualizarContrasena(username, newPassword); // Ahora debería funcionar correctamente

                if (response && response.respuesta) {
                    Swal.fire({
                        title: 'Éxito',
                        text: 'Contraseña actualizada correctamente.',
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                    await authService.updateFirstAccess(username);
                    navigate('/');
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: response.mensaje || 'Hubo un error al intentar actualizar la contraseña.',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                }
            } catch (error) {
                console.error("Error al actualizar la contraseña", error);
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un error al intentar actualizar la contraseña.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        }
    };



    return (
        <div>
            <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
            </div>
            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <img src="/assets/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src="/assets/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <img src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
                <img src="/assets/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" />
                <div className="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px] lg:flex-row lg:gap-10 xl:gap-0">
                    <div className="relative hidden w-full items-center justify-center bg-[linear-gradient(225deg,rgba(239,18,98,1)_0%,rgba(67,97,238,1)_100%)] p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]">
                        <div className="absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent ltr:-right-10 ltr:bg-gradient-to-r rtl:-left-10 rtl:bg-gradient-to-l xl:w-16 ltr:xl:-right-20 rtl:xl:-left-20"></div>
                        <div className="ltr:xl:-skew-x-[14deg] rtl:xl:skew-x-[14deg]">

                            <div className="mt-24 hidden w-full max-w-[430px] lg:block">
                                <img src="/assets/images/logo.png" alt="Cover Image" className="w-full" />
                            </div>
                        </div>
                    </div>
                    <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
                        <div className="flex w-full max-w-[440px] items-center gap-2 lg:absolute lg:end-6 lg:top-6 lg:max-w-full">
                            <Link to="/" className="w-8 block lg:hidden">
                                <img src="/assets/images/logo.png" alt="Logo" className="mx-auto w-10" />
                            </Link>
                        </div>
                        <div className="w-full max-w-[440px] lg:mt-16">
                            <div className="mb-7">
                                <h1 className="mb-3 text-2xl font-bold !leading-snug dark:text-white">Password Reset</h1>
                                <p>Cambiar contraseña</p>
                            </div>
                            <form className="space-y-5" onSubmit={submitForm}>
                                {passwordRequirements && <p className="text-yellow-500">{passwordRequirements}</p>}
                                {error && <p className="text-red-500">{error}</p>}
                                <div>
                                    <label htmlFor="NewPassword">Nueva Contraseña</label>
                                    <div className="relative text-white-dark">
                                        <input
                                            id="NewPassword"
                                            type={showNewPassword ? "text" : "password"}
                                            placeholder="Ingrese nueva contraseña"
                                            className={`form-input pl-10 pr-10 placeholder:text-white-dark ${newPassword && confirmPassword && newPassword === confirmPassword && !passwordRequirements ? 'bg-green-100' : ''}`}
                                            value={newPassword}
                                            onChange={handleNewPasswordChange}
                                        />
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2">
                                            <IconLockDots fill={true} />
                                        </span>
                                        <span
                                            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                        >
                                            <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="ConfirmPassword">Confirmar Contraseña</label>
                                    <div className="relative text-white-dark">
                                        <input
                                            id="ConfirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Confirme nueva contraseña"
                                            className={`form-input pl-10 pr-10 placeholder:text-white-dark ${newPassword && confirmPassword && newPassword === confirmPassword && !passwordRequirements ? 'bg-green-100' : ''}`}
                                            value={confirmPassword}
                                            onChange={handleConfirmPasswordChange}
                                        />
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2">
                                            <IconLockDots fill={true} />
                                        </span>
                                        <span
                                            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                                        </span>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary w-full"
                                    disabled={newPassword !== confirmPassword || passwordRequirements}
                                >
                                    Reset Password
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecoverIdCover;

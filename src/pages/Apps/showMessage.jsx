import Swal from "sweetalert2";

export const showMessage = (msg = "", type = "success") => {
    Swal.fire({
        icon: type,
        title: type === "success" ? "Éxito" : "Error",
        text: msg,
        showConfirmButton: true,
    });
};

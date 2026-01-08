import Swal from 'sweetalert2';

export const showConfirmationAlert = (title, message, onConfirm, onCancel) => {
  Swal.fire({
    title: title,
    text: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#2e7d32',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, confirm!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
    } else if (result.isDismissed) {
      if (onCancel) onCancel();
    }
  });
};

export const showSuccessAlert = (title, message, onClose) => {
  Swal.fire({
    title: title,
    text: message,
    icon: 'success',
    confirmButtonColor: '#2e7d32',
    confirmButtonText: 'OK'
  }).then((result) => {
    if (result.isConfirmed) {
      if (onClose) onClose();
    }
  });
};

export const showErrorAlert = (title, message, onClose) => {
  Swal.fire({
    title: title,
    text: message,
    icon: 'error',
    confirmButtonColor: '#2e7d32',
    confirmButtonText: 'OK'
  }).then((result) => {
    if (result.isConfirmed) {
      if (onClose) onClose();
    }
  });
};

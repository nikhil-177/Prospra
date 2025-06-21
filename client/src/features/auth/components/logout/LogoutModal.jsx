import { toast } from 'react-toastify';
import { useLogoutUiStore } from '../../../../store/useLogoutUi';
import { useLogout } from '../../hooks/useLogout';
import { useAuthStore } from '../../../../store/useAuthStore';

export const LogoutModal = () => {
  const { showLogoutModal, openLogoutModal, closeLogoutModal } =
    useLogoutUiStore();
  const { mutate } = useLogout();
  const { clearAuth } = useAuthStore();

  function logoutUser() {
    mutate(
      {},
      {
        onSuccess: (data) => {
          toast.success(data.message || 'Logged out successfully', {
            autoClose: 1000,
          });
          clearAuth();
          setTimeout(() => {
            closeLogoutModal();
            window.location.reload();
          }, 1500);
        },
      }
    );
  }

  return (
    <>
      <button onClick={openLogoutModal}>Logout</button>

      {showLogoutModal ? (
        <div className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.4)] px-4 flex items-center justify-center">
          <div className="bg-white p-5 poppins flex flex-col gap-3 rounded-2xl">
            <h2 className="text-2xl font-semibold primary-txt self-center">
              Confirm Logout
            </h2>
            <p className="">Are you sure you want to logout of your Account?</p>

            <div className="grid grid-cols-2 gap-2 mt-2">
              <button
                className="bg-red-500 text-white font-medium p-2 rounded-xl"
                onClick={closeLogoutModal}
              >
                Cancel
              </button>
              <button
                className="bg-[#00a991] text-white font-medium p-2 rounded-xl"
                onClick={logoutUser}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

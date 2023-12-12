import "./DeleteButton.styless.css";
import Swal from 'sweetalert2';
import { useItems } from "../Context/ItemsContext";
import { getAllItemsBdd } from "../../../redux/actions";
import {useDispatch} from "react-redux"

const DeleteButton = ({ id }) => {
    const {deleteItemById} = useItems()
    const dispatch = useDispatch()


  const handleDeleteClick = async () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteItemById(id);
            console.log(response.status)
          if (response.message === 'Item deleted successfully') {
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            dispatch(getAllItemsBdd());
          } else {
            swalWithBootstrapButtons.fire({
              title: "Error",
              text: "An error occurred while deleting the file.",
              icon: "error"
            });
          }
        } catch (error) {
          console.log("Error deleting item:", error);
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });
  };

  return (
    <div>
      <button className="button" onClick={handleDeleteClick}>
        <svg viewBox="0 0 448 512" className="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
      </button>
    </div>
  );
};

export default DeleteButton;

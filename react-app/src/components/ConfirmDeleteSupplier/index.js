import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteUserSupplierById, fetchUserSuppliers } from "../../store/supplier";

function ConfirmDeleteSupplier({ supplierId, supplierName }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    { console.log('SUPPLIER', supplierId) }

    const handleDelete = async (supplierId) => {

        await dispatch(deleteUserSupplierById(supplierId))
        await dispatch(fetchUserSuppliers())

        closeModal();
    }

    return (
        <>

            <div className="delete-item-container">
                <div className="delete-item-heading-container">
                    <div>confirm delete <span>{supplierName}</span>?</div>
                </div>
                <div className="delete-item-btns">
                    <button id='delete-item-yes' onClick={() => handleDelete(supplierId)}>Yes</button>
                    <button id='delete-item-no' onClick={() => closeModal()}>No</button>
                </div>
            </div>

        </>
    )
}

export default ConfirmDeleteSupplier;
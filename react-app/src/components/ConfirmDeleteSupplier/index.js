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
            <h1>confirm delete {supplierName}?</h1>
            <button onClick={() => handleDelete(supplierId)}>Yes</button>
            <button onClick={() => closeModal()}>No</button>
        </>
    )
}

export default ConfirmDeleteSupplier;
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './NoItemsNoSheetModal.css'
import { useModal } from '../../context/Modal';

function NoItemsNoSheetModal() {
    const { closeModal } = useModal();
    const history = useHistory();
    const goToItems = () => {
        history.push('/items')
        closeModal();
    }

    return (
        <div className='no-items-no-sheet-container'>
            <h1>smh.</h1>
            <p>you can't track inventory with no items</p>
            <button id='goToItemsBtn' onClick={goToItems}>go to items</button>
        </div>
    )
}

export default NoItemsNoSheetModal;
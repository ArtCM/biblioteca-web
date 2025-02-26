
import './mobAddButton.css'

import { MobAddButtonProps } from "../../types/AddButtons";

export default function MobAddButton({ buttonText, buttonIcon, onClick }: MobAddButtonProps) {

    return(
        <button className='mobAddButton' onClick={onClick}>
            {buttonIcon}
            {buttonText}
        </button>
    )
}
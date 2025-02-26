
import './mobAddButton.css'

import { AddButtonProps } from "../../types/AddButtons";

export default function MobAddButton({ buttonText, buttonIcon, onClick }: AddButtonProps) {

    return(
        <button className='mobAddButton' onClick={onClick}>
            {buttonIcon}
            {buttonText}
        </button>
    )
} 
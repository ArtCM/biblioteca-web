
import './deskAddButton.css'

import { AddButtonProps } from "../../types/AddButtons";

export default function DeskAddButton({ buttonText, buttonIcon, onClick }: AddButtonProps) {

    return(
        <button className='deskAddButton' onClick={onClick}>
            {buttonText}
            {buttonIcon}
        </button>
    )
} 
import ButtonInverse from "../ButtonInverse";
import ButtonPrimary from "../ButtonPrimary";

type Props = {
    id: string;
    message: string;
    onDialogAnswer: Function;
}

export default function DialogConfirmation({ id, message, onDialogAnswer }: Props) {

    return (
        <div className="dialog-background" onClick={() => onDialogAnswer(false, id)}>
            <div className="dialog-box" onClick={(event) => event.stopPropagation()}>
                <h2>{message}</h2>
                <div className="dialog-btn-container" >
                    <div onClick={() => onDialogAnswer(false, id)}>
                        <ButtonInverse text="Não" />
                    </div>
                    <div onClick={() => onDialogAnswer(true, id)}>
                        <ButtonPrimary text="Sim" />
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
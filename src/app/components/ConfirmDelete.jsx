import { Button } from "@nextui-org/react";


function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {

    return (
        <div className=" max-w-2xl flex flex-col justify-end gap-6">
        <h1 className="text-3xl font-bold dark:text-black">Supprimer {resourceName}</h1>
        <p className=" text-gray-500 mb-5">
            Êtes-vous sûr de vouloir supprimer définitivement {resourceName} ? Cette action
            ne peut pas être défait.
        </p>

        <div className="flex justify-end gap-5">
            <Button color="primary" variant="bordered" onClick={onCloseModal}>
            Annuler
            </Button>
            <Button
                color="danger"
                onClick={onConfirm}
                disabled={disabled}
            >
            Supprimer 
            </Button>
        </div>
        </div>
    );
}

export default ConfirmDelete;

import React from 'react'
import CustomButton from './Button'
import { Input } from 'postcss'

export default function ConfirmUpdate({patientToEdit ={}, onConfirm, disabled, onCloseModal }) {
    const {id: editId, ...editValues} = patientToEdit;
    const { register, handleSubmit, reset, formState } = useForm({
        defaultValues: editValues, // Set default values
    });
    const {errors} = formState;
    function onSubmit(data){
        editPatient({ ...data, id: editId },{
            onSuccess:(data)=>{
                reset(patientToEdit);
                ()=>onCloseModal?.()
            }
        })
    }
    
    function onError(errors){
            console.log(errors);
            const errorMessage = errors.message || 'An error occurred';
            toast.error(errorMessage);
    }
    return (
        <form className='flex flex-col' onSubmit={handleSubmit(onSubmit, onError)}>
            
            <div className=' flex flex-col justify-center mx-auto item-center gap-5 py-5'>
                <Input
                    {...register("name", {
                        required:"cette case est obligatoire",
                    })}
                    id='name'
                    label="Prenom"
                    labelPlacement="outside-left"
                    className='flex justify-between'
                    variant='bordered'
                    defaultValue={editValues.name} // Set defaultValue
                />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                <Input
                    {...register("family_name", {
                        required:"cette case est obligatoire",
                    })}
                    id='family_name'
                    label="Nom"
                    labelPlacement="outside-left"
                    className='flex  justify-between'
                    variant='bordered'
                    defaultValue={editValues.family_name} // Set defaultValue
                />
                {errors.family_name && <span className="text-red-500">Nom est requis</span>}
                <Input
                    {...register("email", {
                        required:"cette case est obligatoire",
                    })}
                    autoComplete=''
                    id='email'
                    label="Email"
                    labelPlacement="outside-left"
                    className='flex justify-between '
                    variant='bordered'
                    defaultValue={editValues.email} // Set defaultValue
                />
                {errors.email && <span className="text-red-500">Email est requis</span>}
                <Input
                    {...register("password", {
                        required:"cette case est obligatoire",
                    })}
                    autoComplete=''
                    id='password'
                    label="Mot De Passe"
                    labelPlacement="outside-left"
                    className='flex justify-between '
                    variant='bordered'
                    type='password'
                    defaultValue={editValues.password} // Set defaultValue
                />
                {errors.password && <span className="text-red-500">Mot De Passe est requis</span>}
                <Input
                    {...register("phone", {
                        required:"cette case est obligatoire",
                        min:{
                            value:8,
                            message:"la taille du numéro doit etre min 8"
                        }
                    })}
                    id='phone'
                    label="Telephone"
                    labelPlacement="outside-left"
                    className='flex justify-between min-w-28 '
                    variant='bordered'
                    defaultValue={editValues.phone} // Set defaultValue
                />
                {errors.phone && <span className="text-red-500">Téléphone est requis</span>}
                <Input
                    {...register("age", {
                        required:"cette case est obligatoire",
                        })}
                        id='age'
                        label="Age"
                        labelPlacement="outside-left"
                        className='flex justify-between min-w-28 '
                        variant='bordered'
                        defaultValue={editValues.age} // Set defaultValue
                />
                {errors.phone && <span className="text-red-500">Téléphone est requis</span>}

            </div>
            <div className='flex flex-row justify-end px-10 gap-5 pb-6'>
                <CustomButton variant="bordered" color="primary" className="w-24" type="reset" onClick={onCloseModal}>Annuler</CustomButton>
                <CustomButton variant="solid" color="primary" className="w-24" type="submit" onClick={onConfirm}
                disabled={disabled} >Ajouter</CustomButton>
            </div>
        </form>
    )

}

import { Input } from '@nextui-org/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import CustomButton from '../../components/Button';
import toast from 'react-hot-toast';
import useEditPatient from './useEditPatient';
import useCreatePatient from './useCreatePatient';

export default function CreatePatientForm({ patientToEdit = {}, onCloseModal }) {
    console.log(patientToEdit)
  const { id: editId, ...editValues } = patientToEdit || {}; // Ensure patientToEdit is an object
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { isEditing, editPatient } = useEditPatient();
  const { isAdding, createPatient } = useCreatePatient();

  function onSubmit(data) {
    if (isEditSession) {
      editPatient({ ...data, id: editId }, {
        onSuccess: () => {
          reset(patientToEdit);
          onCloseModal?.();
        },
      });
    } else {
      createPatient(data, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
    }
  }

  function onError(errors) {
    console.log(errors);
    const errorMessage = errors.message || 'An error occurred';
    toast.error(errorMessage);
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="flex flex-col justify-center mx-auto items-center gap-5 py-5">
        <Input
          {...register("name", {
            required: "cette case est obligatoire",
          })}
          id="name"
          label="Prenom"
          labelPlacement="outside-left"
          className="flex justify-between"
          variant="bordered"
          disabled={isAdding || isEditing}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        <Input
          {...register("family_name", {
            required: "cette case est obligatoire",
          })}
          id="family_name"
          label="Nom"
          labelPlacement="outside-left"
          className="flex justify-between"
          variant="bordered"
          disabled={isAdding || isEditing}
        />
        {errors.family_name && <span className="text-red-500">Nom est requis</span>}
        <Input
          {...register("email", {
            required: "cette case est obligatoire",
          })}
          autoComplete=""
          id="email"
          label="Email"
          labelPlacement="outside-left"
          className="flex justify-between"
          variant="bordered"
          disabled={isAdding || isEditing}
        />
        {errors.email && <span className="text-red-500">Email est requis</span>}
        <Input
          {...register("password", {
            required: "cette case est obligatoire",
          })}
          autoComplete=""
          id="password"
          label="Mot De Passe"
          labelPlacement="outside-left"
          className="flex justify-between"
          variant="bordered"
          type="password"
          disabled={isAdding || isEditing}
        />
        {errors.password && <span className="text-red-500">Mot De Passe est requis</span>}
        <Input
          {...register("phone", {
            required: "cette case est obligatoire",
            min: {
              value: 8,
              message: "la taille du numéro doit être min 8",
            },
          })}
          id="phone"
          label="Telephone"
          labelPlacement="outside-left"
          className="flex justify-between min-w-28"
          variant="bordered"
          disabled={isAdding || isEditing}
        />
        {errors.phone && <span className="text-red-500">Téléphone est requis</span>}
        <Input
          {...register("age", {
            required: "cette case est obligatoire",
            min: {
              value: 18,
              message: "l'âge doit être supérieur à 18",
            },
          })}
          id="age"
          label="Age"
          labelPlacement="outside-left"
          className="flex justify-between min-w-28"
          variant="bordered"
          disabled={isAdding || isEditing}
        />
        {errors.age && <span className="text-red-500">Age est requis</span>}
      </div>
      <div className="flex flex-row justify-end px-10 gap-5 pb-6">
        <CustomButton variant="bordered" color="primary" className="w-24" type="reset" onClick={() => onCloseModal?.()}>Annuler</CustomButton>
        <CustomButton variant="solid" color="primary" className="w-24" type="submit" disabled={isAdding}>Ajouter</CustomButton>
      </div>
    </form>
  );
}

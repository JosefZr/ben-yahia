"use client"
import { Input } from '@nextui-org/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import CustomButton from '../../components/Button';
import toast from 'react-hot-toast';
import useEditeProfile from '../hooks/useEditeProfile';

export default function EditProfile({ userToEdit }) {
    console.log(userToEdit);
    const { register, handleSubmit, reset, formState, setValue } = useForm({
        defaultValues: userToEdit,
    });
    const { errors } = formState;

    const { isEditing, editProfile } = useEditeProfile();

    const onSubmit = (data) => {
        editProfile({data}, {
        onSuccess: () => {
            reset(userToEdit);
        },
        });
    };

    const onError = (errors) => {
        console.log(errors);
        const errorMessage = errors.message || 'An error occurred';
        toast.error(errorMessage);
    };

    return (
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="flex flex-col justify-center mx-auto items-center gap-5 py-5">
            <Input
            {...register("name", { required: "Cette case est obligatoire" })}
            id="name"
            label="Prenom"
            labelPlacement="outside-left"
            className="flex justify-between"
            variant="bordered"
            disabled={isEditing}
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            <Input
            {...register("family_name", { required: "Cette case est obligatoire" })}
            id="family_name"
            label="Nom"
            labelPlacement="outside-left"
            className="flex justify-between"
            variant="bordered"
            disabled={isEditing}
            />
            {errors.family_name && <span className="text-red-500">Nom est requis</span>}
            <Input
            {...register("email", { required: "Cette case est obligatoire" })}
            autoComplete=" email"
            id="email"
            label="Email"
            labelPlacement="outside-left"
            className="flex justify-between"
            variant="bordered"
            disabled={isEditing}
            />
            {errors.email && <span className="text-red-500">Email est requis</span>}
            <Input
            {...register("password", { required: "Cette case est obligatoire" })}
            autoComplete="password"
            id="password"
            label="Mot De Passe"
            labelPlacement="outside-left"
            className="flex justify-between"
            variant="bordered"
            type="password"
            disabled={isEditing}
            />
            {errors.password && <span className="text-red-500">Mot De Passe est requis</span>}
            <Input
            {...register("phone", {
                required: "Cette case est obligatoire",
                minLength: { value: 8, message: "La taille du numéro doit être min 8" },
            })}
            id="phone"
            label="Telephone"
            labelPlacement="outside-left"
            className="flex justify-between min-w-28"
            variant="bordered"
            disabled={isEditing}
            />
            {errors.phone && <span className="text-red-500">Téléphone est requis</span>}
            <Input
            {...register("age", {
                required: "Cette case est obligatoire",
                min: { value: 18, message: "L'âge doit être supérieur à 18" },
            })}
            id="age"
            label="Age"
            labelPlacement="outside-left"
            className="flex justify-between min-w-28"
            variant="bordered"
            disabled={isEditing}
            />
            {errors.age && <span className="text-red-500">Age est requis</span>}
        </div>
        <div className="flex flex-row justify-end px-10 gap-5 pb-6">
            <CustomButton variant="solid" color="primary" className="w-24" type="submit" disabled={isEditing}>Modifier</CustomButton>
        </div>
        </form>
    );
}

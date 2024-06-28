import { Button, Divider, Input } from '@nextui-org/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsPersonFill } from "react-icons/bs";
import { IoIosMail } from "react-icons/io";
import Stars from './Stars';
import { useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import { addRating } from './apiRating'; // Ensure the correct import path

export default function CreateRating({ onCloseModal }) {
    const queryClient = useQueryClient();

    const { mutate: createRating, isLoading: isRating } = useMutation({
        mutationFn: addRating,
        onSuccess: () => {
            toast.success('Une nouvelle évaluation a été créée');
            queryClient.invalidateQueries('rating');
            reset();
            onCloseModal?.();
        },
        onError: (err) => {
            const errorMessage = err.message || 'Une erreur est survenue';
            toast.error(errorMessage);
        },
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [rating, setRating] = useState(0);

    const onSubmit = (data) => {
        data.rating = rating;
        console.log("Data submitted:", data);
        createRating(data);
    };

    const onError = (errors) => {
        console.log(errors);
        const errorMessage = errors.message || 'An error occurred';
        toast.error(errorMessage);
    };

    return (
        <div className='flex flex-col gap-3'>
            <header>
                <h1 className='text-xl font-bold'>Créer un Témoignage</h1>
                <h2>Partager votre expérience sur notre cabinet</h2>
            </header>
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit, onError)}>
                <div className="flex flex-col justify-center gap-5 py-5">
                    <Input
                        {...register("name", { required: "Cette case est obligatoire" })}
                        id="name"
                        key="name"
                        label="Prénom"
                        labelPlacement="inside"
                        placeholder="Entrer votre Prénom"
                        className="flex justify-between"
                        variant="flat"
                        startContent={<BsPersonFill className="text-xl text-default-400 pointer-events-none flex-shrink-0" />}
                    />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                    <Input
                        {...register("email", { required: "Cette case est obligatoire" })}
                        id="email"
                        key="email"
                        label="Email"
                        labelPlacement="inside"
                        className="flex justify-between"
                        variant="flat"
                        placeholder="Entrer votre Email"
                        startContent={<IoIosMail className="text-xl text-default-400 pointer-events-none flex-shrink-0" />}
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                    <Divider />

                    <div>
                        <h1 className='text-lg font-semibold'>Évaluation</h1>
                        <Stars setRating={setRating} />
                    </div>

                    <Input
                        {...register("description", { required: "Cette case est obligatoire" })}
                        id="description"
                        key="comment"
                        label="Description"
                        variant="flat"
                        labelPlacement="inside"
                        placeholder="Entrer votre Description"
                        className="max-w-xl"
                        minRows={10}
                        fullWidth
                    />
                    {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                </div>
                <Button type="submit" className="rounded-xl" color='primary' disabled={isRating}>Submit</Button>
            </form>
        </div>
    );
}

"use server"

import {PrismaClientKnownRequestError  } from '@prisma/client';
import prisma from '../lib/prisma';
import { formatDate } from 'date-fns';

// Initialize the Prisma client instance

// Define the signup function to handle user registration
export async function signup({ formData }) {
    const age = parseInt(formData.age, 10);
    try {
         // Check if the email address is already in use
        const existingUser = await prisma.user.findUnique({
            where: {
                email: formData.email,
            },
        });

        // If an existing user with the same email address is found, throw an error
        if (existingUser) {
            return { error: "Email address is already in use.", success: false };
        }

        // Create a user in the database with the provided form data
        const user = await prisma.user.create({
            data: {
                name: formData.name,
                family_name: formData.lastname,
                email: formData.email,
                password: formData.password,
                age : age,
                phone: formData.phone
            }
        });

        // Redirect to the login page if signup is successful
        if (user) {
            return { success: true };
        }
    } catch (error) {
        // Check for specific errors and throw custom error messages
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                throw new Error("Email address is already in use.");
            } else {
                throw new Error("An unexpected error occurred during signup.");
            }
        } else {
            throw error;
        }
    } finally {
        // Close the connection to the database
        await prisma.$disconnect()
    }
}
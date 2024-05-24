
export async function findId() {
    
    try {
        const user = await prisma.user.findUnique({
            where: { id: id }
        });
        console.log("User:", user);
        return user;
    } catch (error) {
        console.error("Error finding user:", error);
        throw error;
    }
}

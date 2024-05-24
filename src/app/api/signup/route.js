import prisma from "@/app/lib/prisma";

export async function POST(request) {
// read data  of req body   
    const body = await request.json()
    const {name , lastname, email, password} = body;

// validate data
if (email === "" ||  password ===""){
    return Response.json({
        error: "invalide email and password "
    },
    {status :400}
)}
// create user in database 
    await prisma.user.create({
        data:{
            name,
            lastname,
            email,
            password
        }
    })
    return Response.json({})
}
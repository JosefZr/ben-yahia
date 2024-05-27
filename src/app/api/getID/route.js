"use server"

export async function POST(request) {

    const userId = request.headers['x-user-id'];
    const userRole = request.headers['x-user-role'];

    const userData ={
        userId: userId,
        userRole: userRole ,
    }

    console.log(userData)
  // If the user is found and the password is correct, return success response
  return new Response(JSON.stringify(userData), {
    status: 200,
  });
}
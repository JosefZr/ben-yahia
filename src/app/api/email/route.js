"use server";

const nodemailer = require('nodemailer');
export async function handleEmailSubmit({ name, email, comment }) {
    const username = process.env.NEXT_PUBLIC_EMAIL_USERNAME;
    const password = process.env.NEXT_PUBLIC_EMAIL_PASSWORD;

    if (!email || !name || !comment) {
        return { error: "Missing email, name, or comment", success: false };
    }

    console.log("Sending email with:", { name, email, comment });

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: username,
            pass: password
        }
    });

    try {
        const mail = await transporter.sendMail({
            from: email,
            to: username,
            subject: `Website activity from ${email}`,
            html: `
                <html>
                    <head>
                        <style>
                            body {
                                background-color: #ffffff;
                                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
                            }
                            .container {
                                margin: 0 auto;
                                padding: 20px 0 48px;
                                width: 580px;
                                max-width: 100%;
                            }
                            .heading {
                                font-size: 32px;
                                line-height: 1.3;
                                font-weight: 700;
                                color: #484848;
                            }
                            .paragraph {
                                font-size: 18px;
                                line-height: 1.4;
                                color: #484848;
                            }
                            .review {
                                font-size: 18px;
                                line-height: 1.4;
                                color: #484848;
                                padding: 24px;
                                background-color: #f2f3f3;
                                border-radius: 4px;
                            }
                            .button {
                                background-color: #214030;
                                border-radius: 3px;
                                color: white;
                                font-size: 18px;
                                padding-top: 19px;
                                padding-bottom: 19px;
                                text-decoration: none;
                                text-align: center;
                                display: block;
                                width: 100%;
                                color: #ffffff; /* Change this to your desired color */
                            }
                            .hr {
                                border-color: #cccccc;
                                margin: 20px 0;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div style="padding-bottom: 20px;">
                                <div>
                                    <p class="heading">Here's what ${name} wrote you</p>
                                    <p class="review">"${comment}"</p>
                                    <p class="paragraph" style="padding-bottom: 16px;">
                                        you can access your dashboard and see what ${name} is concerned about using your website
                                    </p>
                                    <a class="button" style="background-color: #214030; border-radius: 3px; color: #ffffff; font-size: 18px; padding-top: 19px; padding-bottom: 19px; text-decoration: none; text-align: center; display: block; width: 100%;">access your dashboard</a>
                                </div>
                            </div>
                            <hr class="hr" />
                        </div>
                    </body>
                </html>
            `,
        });

        if (!mail) {
            return { error: "Email has not been sent", success: false };
        }

        return { success: true };
    } catch (err) {
        console.error("Error sending email:", err);
        return { error: `An error occurred: ${err.message}`, success: false };
    }
}

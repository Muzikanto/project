import * as nodemailer from 'nodemailer';
import HttpError from "../error";

const transporter = nodemailer.createTransport({
    "service": "gmail",
    "auth": {
        "type": "OAuth2",
        "user": process.env.GOOGLE_USER,
        "clientId": process.env.GOOGLE_CLIENT_ID,
        "clientSecret": process.env.GOOGLE_CLIENT_SECKRET,
        "refreshToken": process.env.GOOGLE_REFRESH_TOKEN,
        "accessToken": process.env.GOOGLE_ACESS_TOKEN,
    }
});

const SendMail = {
    SendPassword,
};

function SendPassword(data: {nick: string, email: string, id: string, token: string, password: string}) {
    return createPromise([data.email], renderMessage(data));
}

function createPromise(emails: string[], template: string) {
    return new Promise(async (resolve: () => void, reject: (err: HttpError) => void) => {
        const mailOptions = {
            from: `Muzikanto <${process.env.GOOGLE_USER}>`,
            to: emails,
            subject: "Server Message",
            html: template
        };
        transporter.sendMail(mailOptions, function (err: Error | null, info: any) {
            if (err) {
                reject(new HttpError(err.message));
            } else {
                console.log('Email sent: ' + info.response);
                resolve();
            }
        });
    });
}

function renderMessage(data: {nick: string, email: string, id: string, token: string, password: string}) {
    return `<!DOCTYPE html>
<html>
    <head>
        <title>Hello :)</title>
    </head>
<body>
    <div>
        <h3>Dear ${data.nick},</h3>
        <p>Your email: ${data.email}</p>
        <p>Your password: ${data.password}</p>
        <br>
        <a href="http://localhost:${process.env.PORT}/auth/reset_password?id=${data.id}&token=${data.token}">Reset Password</a>
    </div>
</body>
</html>`
}

export default SendMail;

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

export function sendMail(users: string[] | string, templateName: ITemplates, data: any) {
    return new Promise(async (resolve: () => void, reject: (err: HttpError) => void) => {
        const mailOptions = {
            from: `Muzikanto <${process.env.GOOGLE_USER}>`,
            to: users.toString(),
            subject: "Kipu Message",
            html: templates[templateName](data)
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

type ITemplates = "auth" | "message" | 'reset_pass';

const templates: { [key: string]: (data: { [key: string]: any }) => string } = {
    auth: ({email, token, name, id}: any) => {
        console.log(`/user/action?id=${id}&email=${email}&token=${token}&action=activate_email`);
        return renderMessage(`${process.env.HOSTNAME}/action?id=${id}&email=${email}&token=${token}&action=activate_email`, 'Подтвердить email', `Пользователь ${name}`);
    },
    reset_pass: ({email, token, name}: any) => {
        console.log(`/user/action?email=${email}&token=${token}&action=reset_pass_new`);
        return renderMessage(`${process.env.HOSTNAME}/action?email=${email}&token=${token}&action=reset_pass_new`, 'Сменить пароль', `Пользователь ${name}`);

    },
    message: (_: any) => `<b>Hello world?</b>`
};

function renderMessage(url: string, message: string, head?: string) {
    return `<table width="600" border="0" align="center" cellpadding="0" cellspacing="0">
                    <tbody>
                        <tr>
                            <td>
                                <table width="600" height="30" border="0" cellspacing="0" cellpadding="0"
                                style="padding-top:30px;padding-bottom: 15px; line-height: 0;">
                                <tbody>
                                    <tr>
                                        <td valign="top" cellspacing="0" cellpadding="0" style="padding:0px; line-height: 0;">
                                    <h1 style="text-align: center; font-size: 35px;">${head}</h1>
                                    </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <table width="600" height="309" border="0" cellspacing="0" cellpadding="0"
                                style="padding:0px; line-height: 0;">
                                    <tbody>
                                        <tr>
                                            <td valign="top" cellspacing="0" cellpadding="0" style="padding:0px; line-height: 0;">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqK5ngS2aDlcGBXe7cbuVNtrQBsyt7n6aJhakt08ECWj6aC93r"
                                    alt="main image" width="600" height="309" border="0">
                                        </td>
                                        </tr>
                                    </tbody>
                                    </table>
                                    <table width="600" height="30" border="0" cellspacing="0" cellpadding="0"
                                    style="line-height: 0; padding-top: 30px;">
                                        <tbody>
                                            <tr>
                                                <td valign="top" cellspacing="0" cellpadding="0" style="padding:0px; line-height: 0;">
                                        <h1 style="text-align: center"><a href="${url}"
                                        style="font-size: 30px;">${message}</a>
                                        </h1>
                                        </td>
                                        </tr>
                                        </tbody>
                                    </table>
                              </td>
                         </tr>
                    </tbody>
             </table>`
}

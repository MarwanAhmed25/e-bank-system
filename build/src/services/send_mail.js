"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer_1 = __importDefault(require("nodemailer"));
var config_1 = __importDefault(require("../config/config"));
var transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: config_1.default.user_email,
        pass: config_1.default.password_email,
    },
});
function sending_mail(to, subject, text) {
    var mailOptions = {
        from: config_1.default.user_email,
        to: to,
        subject: subject,
        text: text,
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response);
            return 'check your email.';
        }
    });
}
exports.default = sending_mail;

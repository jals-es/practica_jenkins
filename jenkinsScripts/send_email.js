const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_POST,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    }
});
transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.correo,
    subject: process.env.motivo,
    html: `
    <div>
        <p>Se ha realizado un push en la rama master que ha provocado la ejecución del jenkinsfile con los siguientes resultados:</p>
        <p>- linter: ${process.env.LINT}</p>
        <p>- test: ${process.env.TEST}</p>
        <p>- updateReadme: ${process.env.UPDATEREADME}</p>
        <p>- pushChanges: ${process.env.PUSHCHANGES}</p>
        <p>- vercel: ${process.env.VERCEL}</p>
        <h3>Ejecutado por ${process.env.ejecutor}</h3>
    </div>
    `
});
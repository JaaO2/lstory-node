const verification = (data) => {
    return {
        from: '"Administracja Life Story" <rejestracja@lstory.eu>',
        to: data.email,
        subject: "Life Story - weryfikacja adresu email",
        html: `
            <div style='background: #006992; color: #fff; padding: 20px; font-weight: bold; font-size: 20px; text-align: center;'>Life Story - weryfikacja adresu email</div>
            <div style='background: #cecece; color: #000; padding: 20px; text-align: justify; font-size: 18px;'>
            Witaj, <b>${data.username}</b>!<br>
            Dziękujemy za dołączenie do społeczności Life Story.<br> 
            Zanim rozpoczniesz grę wymagana jest weryfikacja adresu email. Kliknij <a href='${data.link}'>tutaj</a>, aby zweryfikować adres email.<br>
            Życzymy miłej gry!<br>
            Pozdrawiamy, Ekipa Life Story<br>
            </div>
            <div style='background: #666; color: #fff; padding: 20px; text-align: justify; font-size: 12px;'>
            Jeżeli to nie Ty rejestrowałeś się w projekcie Life Story zignoruj tą wiadomość, twój adres email zostanie usunięty w ciągu 14 dni.<br>
            Wiadomość została wygenerowana automatycznie, prosimy na nią nie odpowiadać<br>
            Life Story &copy; 2024
            </div>
        `
    }
}

export default verification;
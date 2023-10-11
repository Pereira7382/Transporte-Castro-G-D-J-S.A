package una.ac.cr.sistema_transporte.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;


@Component
public class ServiceEmail {

    private final JavaMailSender mail;

    @Autowired
    public ServiceEmail(JavaMailSender mail) {
        this.mail = mail;
    }

    public void enviarCorreo(String correoTo, String titulo, String cuerpo) {
        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(correoTo);
        email.setSubject(titulo);
        email.setText(cuerpo);

        mail.send(email);
    }
}

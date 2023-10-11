package una.ac.cr.sistema_transporte.service;

import java.util.Properties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Component;

@Component
public class ServiceEmail {

    private final JavaMailSender mail;

    @Autowired
    public ServiceEmail(JavaMailSender mail) {
        this.mail = mail;
    }

    public void enviarCorreo(String correoTo, String correoFrom, String titulo, String cuerpo) {
        Properties props = new Properties();
        props.setProperty("mail.smtp.ssl.protocols", "TLSv1.2"); // Configura TLS v1.2
        props.setProperty("mail.smtp.ssl.enable", "true");

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(correoTo);
        email.setSubject(titulo);
        email.setText(cuerpo);

        JavaMailSenderImpl sender = new JavaMailSenderImpl();
        sender.setJavaMailProperties(props);

   
        sender.send(email);
    }
    
}

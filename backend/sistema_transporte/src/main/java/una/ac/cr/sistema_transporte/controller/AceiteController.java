package una.ac.cr.sistema_transporte.controller;

import java.util.List;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import una.ac.cr.sistema_transporte.Logica.LogicaAceite;
import una.ac.cr.sistema_transporte.domain.Aceite;

@Controller
@RequestMapping("/aceite")
@CrossOrigin(origins = "*")
public class AceiteController {
    LogicaAceite logica = new LogicaAceite();
    
    @GetMapping
    @ResponseBody
    public List<Aceite> listar() {
        System.out.println("\n aceites registrados: " + logica.listar().toString());
        return logica.listar();
    }

}

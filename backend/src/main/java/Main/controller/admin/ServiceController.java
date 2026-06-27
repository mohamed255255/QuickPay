package Main.controller.admin;
import Main.Service.AdminService;
import Main.model.complaints;
import Main.model.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;



@RestController
@RequestMapping(path = "/service")
@CrossOrigin(origins = "http://localhost:5500")

public class ServiceController {
   
    public final AdminService adminService;

    public ServiceController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/addservice")
    public void addNewService(@RequestBody services service){
        adminService.addNewService(service);
    }


    @GetMapping("/ShowAllServices")
    public List<services> ShowAllServices(){
        return adminService.ShowAllServices();
    }

}



package Main.controller;
import Main.Service.AdminService;
import Main.model.RefundRequest;
import Main.model.services;
import Main.model.transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;



@RestController
@RequestMapping(path = "/QuickPay")
@CrossOrigin(origins = "http://localhost:63342")

public class AdminController {
    @Autowired
    public final AdminService adminService;
    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/addservice")
    public void addNewService(@RequestBody services service){
        adminService.addNewService(service);
    }

    @GetMapping("/getAllRefundReq")
    public List<RefundRequest> GetAllRefundRequests(){return adminService.GetAllRefundRequests() ;}


    @GetMapping("/GetTransactions")
    public List<transaction> GetAllTransactions(){ return adminService.GetAllTransactions() ;}

    @GetMapping("/ShowAllServices")
    public List<services> ShowAllServices(){
        return adminService.ShowAllServices();
    }

}



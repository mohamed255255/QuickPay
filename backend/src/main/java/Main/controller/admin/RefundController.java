package Main.controller.admin;

import Main.Service.AdminService;
import Main.model.complaints;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/refund")
public class RefundController {

  public final AdminService adminService;

  public RefundController(AdminService adminService) {
    this.adminService = adminService;
  }

  @GetMapping
  public List<complaints> GetAllRefundRequests() {
    return adminService.GetAllRefundRequests();
  }
}

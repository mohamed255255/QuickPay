package Main.controller.user;

import Main.Service.UserService;
import Main.model.payRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

public class PaymentController {

  private final UserService userService;

  public PaymentController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping("/pay")
  public ResponseEntity<String> payforService(@RequestBody payRequest payRequest) {
    String servicename = payRequest.getServicename();
    String serviceProvider = payRequest.getCompany();
    double amount = payRequest.getAmount();
    return userService.payforService(servicename, serviceProvider, amount);
  }
}

package Main.controller.user;

import Main.Service.UserService;
import Main.model.*;
import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/user")
@CrossOrigin(origins = "http://localhost:5500")
public class UserController {

  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping("/getProfilePicture")
  String getProfilePicture() {
    return userService.getProfilePicture();
  }

  //// Remove
  @GetMapping("/getUserData")
  public User getUserData() {
    return userService.getUserData();
  }

  @PostMapping
  public ResponseEntity<String> updateUserData(@RequestBody User user) {
    return userService.updateUserData(user);
  }

  @PostMapping("/updatePassword")
  public ResponseEntity<String> updateUserData(@RequestBody Map<String, String> jsonPassword) {
    return userService.updatePassword(jsonPassword);
  }

  /// Remove
  @GetMapping("/welcome")
  public String welcomeFirstName() {
    return userService.welcomeFirstName(userService.getSession());
  }

  @GetMapping("/search")
  List<services> SearchServiceByName(@RequestParam("servicename") String servicename) {
    return userService.search(servicename);
  }

  @GetMapping("/getAllServiceNames")
  List<String> getAllServiceNames() {
    return userService.getAllServiceNames();
  }

  @GetMapping("/myHistory")
  List<transaction> findTransactionByDateRange(
      @RequestParam("servicename") String servicename,
      @RequestParam("startingDate") String startingDate,
      @RequestParam("endingDate") String endingDate) {

    return userService.findTransactionByDateRange(servicename, startingDate, endingDate);
  }

  @PostMapping("/sendComplaint")
  public void sendComplaint(@RequestBody complaints complaints) {
    userService.sendComplaint(complaints);
  }

  @GetMapping("/GetTransactions")
  public List<transaction> GetAllTransactions() {
    return userService.GetAllTransactions();
  }
}

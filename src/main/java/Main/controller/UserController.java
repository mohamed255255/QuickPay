package Main.controller;

import Main.Service.UserService;
import Main.model.*;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping(path = "/QuickPay")
@CrossOrigin(origins = "http://localhost:63342")

public class UserController {
    private final UserService userService ;
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService ;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup (@RequestBody User user){
        return  userService.signup( user );
    }

    @PostMapping("/signin")
    ResponseEntity<String> signIn(@RequestBody User user , HttpSession session) {
        return userService.login(user , session);
    }

    @GetMapping ("/welcome")
    public String welcomeFirstName(){
        return userService.welcomeFirstName(userService.getSession());
    }



    @GetMapping("/search")
    List<services> SearchServiceByName(@RequestParam("servicename") String servicename){
        return userService.search(servicename);
    }

    @GetMapping("/checkDiscount")
    List<Discount> ShowAllDiscounts(){
        return userService.ShowAllDiscounts();
    }



    @PostMapping("/AddCreditCard")
    public void addCreditCard(@RequestBody creditcard creditcard){
        userService.addCreditCard(creditcard);
    }

    @PostMapping("/pay")
    public void payforService(@RequestBody  services service , @RequestBody double amount){
        userService.payforService(service , amount);
    }

    @PostMapping("/RefundRequest")
    public void AskForRefund(RefundRequest RefundRequest){
        userService.AskForRefund(RefundRequest);
    }



}
package Main.controller.user;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import Main.Service.UserService;
import Main.model.creditcard;

public class CreditCardController {

 private final UserService userService;

      public CreditCardController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping ("/pickCreditcard")
    public void pickCreditcard(@RequestParam("cardNumber") String cardNumber){
        userService.pickCreditcard(cardNumber);
    }

    @PostMapping("/AddCreditCard")
    public ResponseEntity<String> addCreditCard(@RequestBody creditcard creditcard) {
        return userService.addCreditCard(creditcard);
    }

    @DeleteMapping("/deleteCreditCard")
    public ResponseEntity<String> deleteCreditCard(@RequestParam("creditcardID") int creditcardID  ,
                                                   @RequestParam("index") int index){
        return userService.deleteCreditCard(creditcardID , index);
    }
    @GetMapping("/showcreditcard")
    public List<creditcard> showCreditCard() {
        return userService.showCreditCard();
    }

}

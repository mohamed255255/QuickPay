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

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User user) {
        return userService.signup(user);
    }

    @PostMapping("/signin")
    ResponseEntity<String> signIn(@RequestBody User user, HttpSession session) {
        return userService.login(user, session);
    }

    @GetMapping("/welcome")
    public String welcomeFirstName() {
        return userService.welcomeFirstName(userService.getSession());
    }


    @GetMapping("/search")
    List<services> SearchServiceByName(@RequestParam("servicename") String servicename) {
        return userService.search(servicename);
    }

    @PostMapping("/AddCreditCard")
    public void addCreditCard(@RequestBody creditcard creditcard) {
        userService.addCreditCard(creditcard);
    }

    @GetMapping("/showcreditcard")
    public List<creditcard> showCreditCard() {
        return userService.showCreditCard();
    }

    @GetMapping ("/pickCreditcard")
    public void pickCreditcard(@RequestParam("cardNumber") String cardNumber){
        userService.pickCreditcard(cardNumber);
    }
    @PostMapping("/pay")
    public ResponseEntity<String> payforService(@RequestBody payRequest payRequest) {
        String servicename = payRequest.getServicename();
        String servicetype = payRequest.getServicetype();
        double amount = payRequest.getAmount();

        return userService.payforService(servicename, servicetype, amount);
    }

    @PostMapping("/RefundRequest")
    public void AskForRefund(@RequestBody  RefundRequest RefundRequest) {
        userService.AskForRefund(RefundRequest);
    }

    @GetMapping("/GetTransactions")
    public List<transaction> GetAllTransactions(){ return userService.GetAllTransactions() ;}

    @PostMapping("/addtofav")
    public ResponseEntity<String> addToFav(@RequestBody favourites favService){
        return userService.addToFav(favService);
    }

    @GetMapping("getallfav")
    public List<favourites> getAllFavServices(){
        return userService.getAllFavServices();
    }
}

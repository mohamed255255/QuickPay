package Main.controller;

import Main.Service.UserService;
import Main.model.*;
import Main.model.BankDB.creditcard;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;


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
    public ResponseEntity<String> signIn(@RequestBody User user, HttpSession session) {
        return userService.login(user, session);
    }

    @GetMapping("/getProfilePicture")
    String getProfilePicture(){
        return userService.getProfilePicture();
    }

    @GetMapping("/getUserData")
    public User getUserData() {
        return userService.getUserData();
    }

    @PostMapping("/updateUserData")
    public ResponseEntity<String> updateUserData(@RequestBody User user) {
        return userService.updateUserData(user);
    }

    @PostMapping("/updatePassword")
    public ResponseEntity<String> updateUserData(@RequestBody Map<String, String> jsonPassword)  {
        return   userService.updatePassword(jsonPassword);
    }
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
                            @RequestParam("endingDate")  String endingDate) {

        return userService.findTransactionByDateRange(servicename , startingDate , endingDate);
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

    @GetMapping ("/pickCreditcard")
    public void pickCreditcard(@RequestParam("cardNumber") String cardNumber){
        userService.pickCreditcard(cardNumber);
    }
    @PostMapping("/pay")
    public ResponseEntity<String> payforService(@RequestBody payRequest payRequest) {
        String servicename = payRequest.getServicename();
        String serviceProvider = payRequest.getCompany();
        double amount = payRequest.getAmount();
        return userService.payforService(servicename, serviceProvider, amount);
    }

    @PostMapping("/sendComplaint")
    public void sendComplaint(@RequestBody complaints complaints) {
        userService.sendComplaint(complaints);
    }

    @GetMapping("/GetTransactions")
    public List<transaction> GetAllTransactions(){ return userService.GetAllTransactions() ;}

    @PostMapping("/addtofav")
    public ResponseEntity<String> addToFav(@RequestBody favourites favService){
        return userService.addToFav(favService);
    }

    @GetMapping("/getallfav")
    public List<favourites> getAllFavServices(){
        return userService.getAllFavServices();
    }

    @GetMapping("/checkFavService")
    public ResponseEntity<String> checkFavService(@RequestParam("servicename") String servicename ,
                                                  @RequestParam("company") String company ){
        return userService.checkFavService(servicename , company);
    }
    @DeleteMapping("/deletefav")
    public ResponseEntity<String> deleteFavService(@RequestBody favourites favService){
        return userService.deleteFavService(favService);
    }

}

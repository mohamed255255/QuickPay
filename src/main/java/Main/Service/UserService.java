package Main.Service;

import Main.model.*;
import Main.repository.*;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class UserService {

    private  HttpSession session ;

    public final UserRepository UserRepository;
    public final ServicesRepository servicesRepository;
    public final transactionRepository transactionRepository;
    public final RefundRequestRepository refundRequestRepository;
    public final  creditCardRepository creditCardRepository ;
    public final  FavouriteRepository favouriteRepository;
    @Autowired
    public UserService(UserRepository UserRepository ,
                       ServicesRepository servicesRepository,
                       transactionRepository transactionRepository,
                       RefundRequestRepository refundRequestRepository, Main.repository.creditCardRepository creditCardRepository, FavouriteRepository favouriteRepository) {

        this.UserRepository = UserRepository;
        this.servicesRepository = servicesRepository;
        this.transactionRepository = transactionRepository;
        this.refundRequestRepository = refundRequestRepository;
        this.creditCardRepository = creditCardRepository;
        this.favouriteRepository = favouriteRepository;
    }

    public HttpSession getSession() {
        return session;
    }

    public ResponseEntity<String> signup(User user) {
        Optional<User> userOptional = UserRepository.findUserByEmail(user.getEmail());
        if (userOptional.isPresent()) {
            return ResponseEntity.badRequest().body("the email is used before");
        }
        UserRepository.save(user);
        return ResponseEntity.ok("Sign-up successful");
    }

    public ResponseEntity<String> login(User user, HttpSession session) {
        this.session = session ;
        Optional<User> userOptional = UserRepository.findUserByEmail(user.getEmail());
        if (userOptional.isPresent()) {
            User foundUser = userOptional.get();
            if (foundUser.getPassword().equals(user.getPassword())) {
                session.setAttribute("user", foundUser);
                return ResponseEntity.ok("Sign-in successful");
            }
            else
                return ResponseEntity.badRequest().body("Incorrect password");
        }
        else
            return ResponseEntity.badRequest().body("User not found");
    }

    public String welcomeFirstName(HttpSession session) {
        if (session != null) {
            User user = (User) session.getAttribute("user");
            if (user != null && user.getFirstname() != null) {
                return user.getFirstname();
            } else {
                return "User not found";
            }
        } else {
            return "Session not found";
        }
    }

    public List<services> search(String ServiceName){
        return servicesRepository.findAllMatchingServices(ServiceName);
    }



    public void addCreditCard(creditcard creditcard)  {

        User user = (User) session.getAttribute("user");
        user.addCreditCard(creditcard);  /// link the Credit card with the user
        creditCardRepository.save(creditcard) ;

        transaction addCreditCardTransaction = new transaction("____", "____","a credit card is added" );
        user.setTransaction(addCreditCardTransaction); /// link the transaction with the user
        addCreditCardTransaction.setImgPath("/client-side/icons/addcreditcard.PNG");
        transactionRepository.save(addCreditCardTransaction);
    }


    public ResponseEntity<String> payforService(String servicename , String servicetype , double amount){
        System.out.println(amount + " " + servicename + " " + servicetype);
         User user = (User) session.getAttribute("user");
         creditcard chosenCard = (creditcard)session.getAttribute("creditcard");
         if(amount > chosenCard.getCurrentBalance())
                 return ResponseEntity.badRequest().body("No enough money to continue the payment process");

        double BalanceAfterPayment = chosenCard.getCurrentBalance() - amount;
        chosenCard.setCurrentBalance(BalanceAfterPayment);
        creditCardRepository.save(chosenCard);

        transaction payment_transaction = new transaction(servicetype , servicename , "payment transaction");
        user.setTransaction(payment_transaction); /// link the transaction with the user
        payment_transaction.setImgPath("/client-side/icons/payment.PNG");
        transactionRepository.save(payment_transaction);
        return ResponseEntity.ok("paid successfully");
    }

    public void AskForRefund(RefundRequest RefundRequest){
        refundRequestRepository.save(RefundRequest);
        transaction RefundTransaction = new transaction("____","____","Refund transaction");
        RefundTransaction.setImgPath("/client-side/icons/refund.PNG");
        transactionRepository.save(RefundTransaction);
        /// in transaction class u use more attribute than u need try to optimize it .. compare between trans constructos
        //to get my point
    }

public List<creditcard> showCreditCard() {
        User user = (User) session.getAttribute("user");
        if (user.getCreditCards().isEmpty()) {
            return new ArrayList<>();
        }
        return user.getCreditCards();
    }

public void pickCreditcard(String cardNumber){
        creditcard chosenCard = creditCardRepository.findByCardNumber(cardNumber);
        session.setAttribute("creditcard" , chosenCard);

    }


public List<transaction> GetAllTransactions(){
        User user = (User) session.getAttribute("user") ;
        List<transaction> trans = transactionRepository.findbyuserID(user.getUserID());
        if(trans == null){
            return new ArrayList<>();
        }
        return trans;
    }



    public ResponseEntity<String>addToFav(favourites favService){
        favouriteRepository.save(favService);
        return ResponseEntity.ok("Service is added sucessfully");
    }

    public List<favourites> getAllFavServices(){
        User user = (User) session.getAttribute("user") ;
        return  favouriteRepository.getAll(user.getUserID());
    }






}



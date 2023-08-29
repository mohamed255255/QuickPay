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
    @Autowired
    public UserService(UserRepository UserRepository ,
                       ServicesRepository servicesRepository,
                       transactionRepository transactionRepository,
                       RefundRequestRepository refundRequestRepository, Main.repository.creditCardRepository creditCardRepository) {

        this.UserRepository = UserRepository;
        this.servicesRepository = servicesRepository;
        this.transactionRepository = transactionRepository;
        this.refundRequestRepository = refundRequestRepository;
        this.creditCardRepository = creditCardRepository;
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

            } else {
                return ResponseEntity.badRequest().body("Incorrect password");
            }
        } else {
            return ResponseEntity.badRequest().body("User not found");
        }


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

        transaction addCreditCardTransaction = new transaction("a credit card is added" );
        user.setTransaction(addCreditCardTransaction); /// link the transaction with the user
        transactionRepository.save(addCreditCardTransaction);
    }


    public ResponseEntity<String> payforService(String servicename , String servicetype , double amount){
         User user = (User) session.getAttribute("user");
         creditcard chosenCard = (creditcard)session.getAttribute("creditcard");
         if(amount > chosenCard.getCurrentBalance())
            return ResponseEntity.badRequest().body("No enough money to continue the payment process");

        double BalanceAfterPayment = chosenCard.getCurrentBalance() - amount;
        chosenCard.setCurrentBalance(BalanceAfterPayment);
        creditCardRepository.save(chosenCard);
         transaction payment_transaction = new transaction(
                 servicetype ,
                 servicename ,
                 "payment transaction" );
        user.setTransaction(payment_transaction); /// link the transaction with the user
        transactionRepository.save(payment_transaction);
        return ResponseEntity.ok("paid successfully");
    }


    public void AskForRefund(RefundRequest RefundRequest){
        refundRequestRepository.save(RefundRequest);
        transaction RefundTransaction = new transaction("Refund transaction");
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

}



package Main.Service;

import Main.model.*;
import Main.repository.*;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class UserService {

    private  HttpSession session ;

    public final UserRepository UserRepository;
    public final ServicesRepository servicesRepository;
    public final DiscountRepository discountRepository ;
    public final transactionRepository transactionRepository;
    public final RefundRequestRepository refundRequestRepository;
    public final  creditCardRepository creditCardRepository ;
    @Autowired
    public UserService(UserRepository UserRepository ,
                       ServicesRepository servicesRepository,
                       DiscountRepository discountRepository,
                       transactionRepository transactionRepository,
                       RefundRequestRepository refundRequestRepository, Main.repository.creditCardRepository creditCardRepository) {

        this.UserRepository = UserRepository;
        this.servicesRepository = servicesRepository;
        this.discountRepository = discountRepository;
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

    public HttpSession getSession() {
        return session;
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

    public List<Discount> ShowAllDiscounts(){
        return discountRepository.findAllDiscounts();
    }




    public void addCreditCard(creditcard creditcard)  {
        User user = (User) session.getAttribute("user");
        user.addCreditCard(creditcard);
        creditCardRepository.save(creditcard) ;

        transaction addCreditCardTransaction = new transaction("add to credit card" );
        transactionRepository.save(addCreditCardTransaction);
    }


    public void payforService(services service , double amount){
         User user = (User)session.getAttribute("user");
         Discount discount = discountRepository.findByServiceType(service.getServicetype());
         if(discount != null){
             double PriceAfterDiscount =  discount.getDiscountPercentage() * amount ;
             creditcard userCreditCard = user.getCreditCard();

             double BalanceAfterPayment = userCreditCard.getCurrentBalance() - PriceAfterDiscount ;
             userCreditCard.setCurrentBalance(BalanceAfterPayment);
         }else{
             creditcard userCreditCard = user.getCreditCard();
             double BalanceAfterPayment = userCreditCard.getCurrentBalance();
             userCreditCard.setCurrentBalance(BalanceAfterPayment);
         }
         transaction payment_transaction = new transaction(
                 service.getServicetype() ,
                 service.getServicename() ,
                 "payment transaction" );
         transactionRepository.save(payment_transaction);
    }



    public void AskForRefund(RefundRequest RefundRequest){
        refundRequestRepository.save(RefundRequest);
        transaction RefundTransaction = new transaction("Refund transaction");
        transactionRepository.save(RefundTransaction);
        /// in transaction class u use more attribute than u need try to optimize it .. compare between trans constructos
        //to get my point
    }

}

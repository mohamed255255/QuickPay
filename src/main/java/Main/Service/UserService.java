package Main.Service;

import Main.model.BankDB.creditcard;
import Main.model.*;
import Main.repository.BankRepository.creditCardRepository;
import Main.repository.*;
import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@Service
public class UserService {

    private  HttpSession session ;

    public final UserRepository UserRepository;
    public final ServicesRepository servicesRepository;
    public final transactionRepository transactionRepository;
    public final complaintRepository complaintRepository;
    public final Main.repository.BankRepository.creditCardRepository creditCardRepository ;
    public final  FavouriteRepository favouriteRepository;
    @Autowired
    public UserService(UserRepository UserRepository ,
                       ServicesRepository servicesRepository,
                       transactionRepository transactionRepository,
                       complaintRepository complaintRepository,
                       creditCardRepository creditCardRepository,
                       FavouriteRepository favouriteRepository)
    {
        this.UserRepository = UserRepository;
        this.servicesRepository = servicesRepository;
        this.transactionRepository = transactionRepository;
        this.complaintRepository = complaintRepository;
        this.creditCardRepository = creditCardRepository;
        this.favouriteRepository = favouriteRepository;
    }

    public HttpSession getSession() {
        return session;
    }

    public void formatTransactionDateAndTime(transaction transaction){
        LocalDateTime now = LocalDateTime.now();

        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String formattedDate = now.format(dateFormatter);

        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm:ss");
        String formattedTime = now.format(timeFormatter);

        transaction.setTime(formattedTime);
        transaction.setDate(formattedDate);
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
    public String  getProfilePicture(){
        User user = (User) session.getAttribute("user");
        if(user.getProfilepicture() == null){
            return "null";
        }
        return user.getProfilepicture();

    }

    public User getUserData(){
        User currentUser = (User) session.getAttribute("user") ;
        return currentUser;
    }

    public ResponseEntity<String> updateUserData(User user){
        User currentUser = (User) session.getAttribute("user") ;
        currentUser.setFirstname(user.getFirstname());
        currentUser.setLastname(user.getLastname());
        currentUser.setPhonenumber(user.getPhonenumber());
        currentUser.setEmail(user.getEmail());
        currentUser.setProfilepicture(user.getProfilepicture());
        UserRepository.save(currentUser);
        return ResponseEntity.ok("Data is updated successfully") ;
    }

    public ResponseEntity<String> updatePassword( Map<String, String> jsonPassword){
        String currentPassword = jsonPassword.get("currentpassword");
        String newPassword = jsonPassword.get("newpassword");
        User currentUser = (User) session.getAttribute("user");

        if (currentUser.getPassword().equals(currentPassword)) {
            currentUser.setPassword(newPassword);
            UserRepository.save(currentUser);
            return ResponseEntity.ok("Done");
        }
        return ResponseEntity.badRequest().body("Current password is not correct");
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


    public List<transaction>findTransactionByDateRange(String servicename ,String startingDate , String endingDate) {
        List<transaction> transactions = transactionRepository.findTransactionByDateRange(servicename);
        List<transaction> ans = new ArrayList<>();
        for (var t : transactions) {
            LocalDate start = LocalDate.parse(startingDate);
            LocalDate end = LocalDate.parse(endingDate);
            LocalDate TransactionDate = LocalDate.parse(t.getDate());
            if (TransactionDate.isAfter(start) && TransactionDate.isBefore(end)) {
                ans.add(t);
            }
        }
        return ans;
    }

    public ResponseEntity<String> addCreditCard(creditcard creditcard)  {
        User user = (User) session.getAttribute("user");
        creditcard cc = creditCardRepository.findByCardNumber(creditcard.getCardNumber());
        if(cc != null){
            return ResponseEntity.badRequest().body("already existed");
        }
        user.addCreditCard(creditcard);  /// link the Credit card with the user
        creditCardRepository.save(creditcard) ;

        transaction addCreditCardTransaction = new transaction("Credit card is added" );
        user.setTransaction(addCreditCardTransaction); /// link the transaction with the user
        formatTransactionDateAndTime(addCreditCardTransaction);
        transactionRepository.save(addCreditCardTransaction);
        return ResponseEntity.ok("Credit card is successfully added") ;
    }


    @Transactional
    public ResponseEntity<String> deleteCreditCard(int creditcardID , int index){
        User user = (User) session.getAttribute("user");
        user.getCreditCards().remove(index);
        creditCardRepository.deleteByCreditcardID(creditcardID);
        return ResponseEntity.ok("Successfully deleted");
   }

    public ResponseEntity<String> payforService(String servicename , String serviceProvider , double amount){
         User user = (User) session.getAttribute("user");
         creditcard chosenCard = (creditcard)session.getAttribute("creditcard");
         if(amount > chosenCard.getCurrentBalance())
                 return ResponseEntity.badRequest().body("No enough money to continue the payment process");

        double BalanceAfterPayment = chosenCard.getCurrentBalance() - amount;
        chosenCard.setCurrentBalance(BalanceAfterPayment);
        creditCardRepository.save(chosenCard);
        transaction payment_transaction = new transaction(
                servicename , serviceProvider ,"Payment" , amount);
        user.setTransaction(payment_transaction); /// link the transaction with the user
        formatTransactionDateAndTime(payment_transaction);
        transactionRepository.save(payment_transaction);
        return ResponseEntity.ok("paid successfully");
    }

    public void sendComplaint(complaints complaint){
        User user = (User) session.getAttribute("user");
        user.addComplain(complaint);
        transaction complaintTransaction = new transaction(complaint.getCategory().toString());
        user.setTransaction(complaintTransaction);
        formatTransactionDateAndTime(complaintTransaction);
        complaintRepository.save(complaint);
        transactionRepository.save(complaintTransaction);
    }

public List<String>getAllServiceNames(){
        return servicesRepository.FindAllServiceNames();
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
    User user = (User) session.getAttribute("user") ;
    favService.setUser(user);
    String servicename = favService.getServicename();
    String company = favService.getCompany();
     favourites fav  = favouriteRepository.findByServicenameAndCompany(servicename , company) ;
    if(fav == null){
        favouriteRepository.save(favService);
        return ResponseEntity.ok("Service is added successfully");
    }
    return ResponseEntity.badRequest().body("service is added before");
}

public List<favourites> getAllFavServices(){
    User user = (User) session.getAttribute("user") ;
    return  favouriteRepository.getAll(user.getUserID());
}


public ResponseEntity<String> checkFavService(String servicename , String company){
    favourites found = favouriteRepository.findByServicenameAndCompany(servicename, company);
    if(found !=null){
        return ResponseEntity.ok("found");
    }
    return ResponseEntity.badRequest().body("not found");
}


public ResponseEntity<String> deleteFavService(favourites reqToDelete){
    favouriteRepository.deleteByServicenameAndCompany( reqToDelete.getServicename(), reqToDelete.getCompany());
    return ResponseEntity.ok("Successfully deleted");
}



}



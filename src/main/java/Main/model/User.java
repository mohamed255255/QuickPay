package Main.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int UserID;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private String phonenumber;

    public User() {
        creditCards = new ArrayList<>();
        transactions = new ArrayList<>();
    }

    @Override
    public String toString() {
        return "User{" +
                "UserID=" + UserID +
                ", firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", phonenumber='" + phonenumber + '\'' +
                '}';
    }

    public int getUserID() {
        return UserID;
    }

    public void setUserID(int userID) {
        UserID = userID;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhonenumber() {
        return phonenumber;
    }

    public void setPhonenumber(String phonenumber) {
        this.phonenumber = phonenumber;
    }



    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonIgnoreProperties("user")
    private List<creditcard> creditCards;


    public List<creditcard> getCreditCards() {
        return creditCards;
    }

    public void addCreditCard(creditcard card) {
        if (creditCards == null) {
            creditCards = new ArrayList<>();
        }
        //bidirectional relation
         creditCards.add(card);
         card.setUser(this);
    }
    public void removeCreditCard(creditcard card) {
        creditCards.remove(card);
        card.setUser(null);
    }



    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonIgnore
    private  List<transaction> transactions ;

    public List<transaction> getTransaction() {
        return transactions;
    }


    public void setTransaction(transaction transaction) {
       transactions.add(transaction) ;
       transaction.setUser(this);
    }
}
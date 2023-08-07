package Main.model;
import jakarta.persistence.*;

import java.time.LocalDate;



@Entity
@Table
public class creditcard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int creditcardID ;
    private String cardNumber ;
    private LocalDate ExpiryDate ;
    private String CVV ;
    private String creditcardName ;


    public int getId() {
        return creditcardID;
    }

    public void setId(int id) {
        this.creditcardID = id;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public LocalDate getExpiryDate() {
        return ExpiryDate;
    }

    public void setExpiryDate(LocalDate expiryDate) {
        ExpiryDate = expiryDate;
    }

    public String getCVV() {
        return CVV;
    }

    public void setCVV(String CVV) {
        this.CVV = CVV;
    }

    public String getCreditcardName() {
        return creditcardName;
    }

    public void setCreditcardName(String creditcardName) {
        this.creditcardName = creditcardName;
    }

    private double currentBalance;


    public creditcard(String cardNumber, LocalDate expiryDate, String CVV, String creditcardName, double currentBalance) {
        this.cardNumber = cardNumber;
        ExpiryDate = expiryDate;
        this.CVV = CVV;
        this.creditcardName = creditcardName;
        this.currentBalance = currentBalance;
    }

    public int getCreditcardID() {
        return creditcardID;
    }

    public void setCreditcardID(int creditcardID) {
        this.creditcardID = creditcardID;
    }



    public creditcard(){}

    public void setCurrentBalance(double currentBalance) {
        this.currentBalance = currentBalance;
    }

    public double getCurrentBalance() {
        return currentBalance;
    }

    public void addBalance(double balance) {
        currentBalance += balance;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @OneToOne
    @JoinColumn(name = "userID")
    private User user;
}

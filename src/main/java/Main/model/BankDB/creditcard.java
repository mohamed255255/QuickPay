package Main.model.BankDB;

import Main.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;



@Entity
@Table
public class creditcard  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int creditcardID ;
    private String creditcardName ;
    private String cardNumber ;
    private String Expiryyear ;
    private String expirymonth ;
    private String CVV ;
    private double currentBalance;

    public String getCreditcardName() {
        return creditcardName;
    }

    public void setCreditcardName(String creditcardName) {
        this.creditcardName = creditcardName;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getExpiryyear() {
        return Expiryyear;
    }

    public void setExpiryyear(String expiryyear) {
        Expiryyear = expiryyear;
    }

    public int getCreditcardID() {
        return creditcardID;
    }

    public void setCreditcardID(int creditcardID) {
        this.creditcardID = creditcardID;
    }

    public String getExpirymonth() {
        return expirymonth;
    }

    public void setExpirymonth(String expirymonth) {
        this.expirymonth = expirymonth;
    }

    public String getCVV() {
        return CVV;
    }

    public void setCVV(String CVV) {
        this.CVV = CVV;
    }

    public double getCurrentBalance() {
        return currentBalance;
    }

    public void setCurrentBalance(double currentBalance) {
        this.currentBalance = currentBalance;
    }

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIgnore
    @JoinColumn(name = "UserID")
    private User user;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}

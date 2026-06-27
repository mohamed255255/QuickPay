package Main.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table
 public class transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int transactionID ;
    private String ServiceName ;
    private String servicetype ;
    private String TransactionType ;
    private String time ;
    private String date ;
    private double servicePrice;

    public double getServicePrice() {
        return servicePrice;
    }

    public void setServicePrice(double servicePrice) {
        this.servicePrice = servicePrice;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public int getTransactionID() {
        return transactionID;
    }

    public void setTransactionID(int transactionID) {
        this.transactionID = transactionID;
    }


    public String getServicetype() {
        return servicetype;
    }

    public void setServicetype(String servicetype) {
        this.servicetype = servicetype;
    }

    public String getServiceName() {
        return ServiceName;
    }


    public String getTransactionType() {
        return TransactionType;
    }

    public void setTransactionType(String transactionType) {
        TransactionType = transactionType;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }



   public transaction(String TransactionType){
       this.TransactionType = TransactionType;
   }
   public transaction(String serviceName , String servicetype , String TransactionType , double amount){
        this.ServiceName = serviceName ;
        this.servicetype = servicetype ;
        this.TransactionType = TransactionType;
        servicePrice  = amount ;
    }

    public transaction(){}
    public void setId(int id) {
        this.transactionID = id;
    }

    public int getId() {
        return transactionID;
    }

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIgnore
    @JoinColumn(name = "userID")
    private User user;

}

package Main.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table
 public class transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int transactionID ;
    private  String ServiceName ;
    private String servicetype ;
    private String TransactionType ;
    private String imgPath ;

    public String getImgPath() {
        return imgPath;
    }

    public void setImgPath(String imgPath) {
        this.imgPath = imgPath;
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



   public transaction(String servicetype , String ServiceName , String TransactionType){
       this.servicetype = servicetype;
        this.ServiceName = ServiceName ;
       this.TransactionType = TransactionType;
   }
    public transaction(String TransactionType){
     this.TransactionType =  TransactionType;
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

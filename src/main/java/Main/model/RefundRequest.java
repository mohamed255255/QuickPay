package Main.model;
import jakarta.persistence.*;


@Table
@Entity
public class RefundRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int RefundRequestID ;
    private  String reason ;

    public int getRefundRequestID() {
        return RefundRequestID;
    }

    public void setRefundRequestID(int refundRequestID) {
        RefundRequestID = refundRequestID;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public transaction getTrans() {
        return trans;
    }

    public void setTrans(transaction trans) {
        this.trans = trans;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "User_Fk")
    private User user;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Transaction_Fk")
    private transaction trans;

    public void setId(int id) {
        this.RefundRequestID = id;
    }

    public int getId() {
        return RefundRequestID;
    }

}

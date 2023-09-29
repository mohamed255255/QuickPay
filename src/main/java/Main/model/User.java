package Main.model;

import Main.model.BankDB.creditcard;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private String gender ;

    @Column(length = 500000)
    private String profilepicture;



    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }




    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonIgnore
    private List<creditcard> creditCards;


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonIgnore
    private  List<transaction> transactions ;


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonIgnore
    private List<favourites> favouritesList;


    @OneToMany(mappedBy = "user" , cascade =  CascadeType.ALL , fetch = FetchType.EAGER)
    @JsonIgnore
    private List<complaints> complaintsList;


    public User() {
        creditCards = new ArrayList<>();
        transactions = new ArrayList<>();
        favouritesList = new ArrayList<>();
        complaintsList = new ArrayList<>();
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

    public String getProfilepicture() {
        return profilepicture;
    }

    public void setProfilepicture(String profilepicture) {
        this.profilepicture = profilepicture;
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






    public List<transaction> getTransaction() {
        return transactions;
    }


    public void setTransaction(transaction transaction) {
       transactions.add(transaction) ;
       transaction.setUser(this);
    }
    public List<transaction> getTransactions() {
        return transactions;
    }


    public List<favourites> getFavouritesList() {
        return favouritesList;
    }

    public List<complaints> getRefundRequestList() {
        return complaintsList;
    }

    public void addComplain(complaints request) {
        if(complaintsList.isEmpty())
            request.setUser(this);
        complaintsList.add(request);
    }

    public void setFavouritesList(favourites favService) {
        if(favouritesList.isEmpty())
            favService.setUser(this);
        favouritesList.add(favService);

    }
}
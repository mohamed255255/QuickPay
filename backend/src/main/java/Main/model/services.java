package Main.model;
import jakarta.persistence.*;
@Entity
@Table
public class services {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  int SerivceID ;
    private  String servicename;
    private  String servicetype ;
    private  String img_path ;
    private  String company ;


    public String getImg_path() {
        return img_path;
    }

    public void setImg_path(String img_path) {
        this.img_path = img_path;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public int getSerivceID() {
        return SerivceID;
    }

    public void setSerivceID(int serivceID) {
        SerivceID = serivceID;
    }

    public String getServicename() {
        return servicename;
    }

    public void setServicename(String servicename) {
        this.servicename = servicename;
    }

    public String getServicetype() {
        return servicetype;
    }

    public void setServicetype(String servicetype) {
        this.servicetype = servicetype;
    }

    public void LowerCaseServiceName(){
        servicename = servicename.toLowerCase();
    }
}

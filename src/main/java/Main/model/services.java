package Main.model;
import jakarta.persistence.*;
@Entity
@Table
public class services {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  int SerivceID ;
    private  String servicename;
    private String serivcetype ;
    private String img_path ;
    public String getSerivcetype() {
        return serivcetype;
    }


    public void setSerivcetype(String serivcetype) {
        this.serivcetype = serivcetype;
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

    public String getImg_path() {
        return img_path;
    }

    public void setImg_path(String img_path) {
        this.img_path = img_path;
    }

    @Override
    public String toString() {
        return "services{" +
                "SerivceID=" + SerivceID +
                ", ServiceName='" + servicename + '\'' +
                ", img_path='" + img_path + '\'' +
                '}';
    }

    public void LowerCaseServiceName(){
        servicename = servicename.toLowerCase();
    }
}

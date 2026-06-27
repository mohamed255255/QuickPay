package Main.Service;
import Main.model.*;
import Main.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class  AdminService {
    @Autowired

    public final ServicesRepository ServicesRepository;
    public final UserRepository userRepository ;
    public final complaintRepository complaintRepository;
    public final transactionRepository transactionRepository ;

    @Autowired
    public AdminService(ServicesRepository ServicesRepository,
                        UserRepository userRepository,
                        complaintRepository complaintRepository,
                        transactionRepository transactionRepository) {

        this.ServicesRepository = ServicesRepository;
        this.userRepository = userRepository;
        this.complaintRepository = complaintRepository;
        this.transactionRepository = transactionRepository;
    }


    public void addNewService(services newService) {
        newService.LowerCaseServiceName();
        ServicesRepository.save(newService);
    }

    public List<complaints> GetAllRefundRequests(){
         return complaintRepository.GetAllRefundRequests();
    }



    public List<services> ShowAllServices(){
        return  ServicesRepository.findAll();
    }


}

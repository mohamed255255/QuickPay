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
    public final RefundRequestRepository refundRequestRepository ;
    public final transactionRepository transactionRepository ;

    @Autowired
    public AdminService(ServicesRepository ServicesRepository,
                        UserRepository userRepository,
                        RefundRequestRepository refundRequestRepository,
                        transactionRepository transactionRepository) {

        this.ServicesRepository = ServicesRepository;
        this.userRepository = userRepository;
        this.refundRequestRepository = refundRequestRepository;
        this.transactionRepository = transactionRepository;
    }


    public void addNewService(services newService) {
        newService.LowerCaseServiceName();
        ServicesRepository.save(newService);
    }

    public List<RefundRequest> GetAllRefundRequests(){
         return refundRequestRepository.GetAllRefundRequests();
    }



    public List<services> ShowAllServices(){
        return  ServicesRepository.findAll();
    }


}

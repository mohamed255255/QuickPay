package Main.repository;
import Main.model.RefundRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface RefundRequestRepository extends JpaRepository<RefundRequest, Integer> {
@Query("SELECT r from  RefundRequest r")
    List<RefundRequest> GetAllRefundRequests() ;
}

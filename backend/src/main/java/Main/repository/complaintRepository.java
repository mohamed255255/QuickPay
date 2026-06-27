package Main.repository;

import Main.model.complaints;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface complaintRepository extends JpaRepository<complaints, Integer> {
  @Query("SELECT r from  complaints r")
  List<complaints> GetAllRefundRequests();
}

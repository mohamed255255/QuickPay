package Main.repository;

import Main.model.*;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ServicesRepository extends JpaRepository<services, Integer> {

  @Query("SELECT s FROM services s WHERE s.servicename LIKE %:servicename%")
  List<services> findAllMatchingServices(@Param("servicename") String servicename);

  @Query("select s.servicename from services s")
  List<String> FindAllServiceNames();
}

package Main.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import Main.model.*;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface ServicesRepository extends JpaRepository<services, Integer> {

    @Query("SELECT s FROM services s WHERE s.servicename LIKE %:servicename%")
    List<services> findAllMatchingServices(@Param("servicename") String servicename);


    @Query("select s.servicename from services s")
    List<String> FindAllServiceNames();
}

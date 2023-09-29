package Main.repository;
import Main.model.favourites;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;




public interface FavouriteRepository extends JpaRepository<favourites , Long> {
   @Query("select f from favourites f where f.user.UserID = :userID ")
   List<favourites> getAll(int userID);

   @Query("select f from favourites f where f.servicename = :servicename and f.company = :company ")
   favourites findByServicenameAndCompany(String servicename , String company);



   @Query(value = "DELETE FROM favourites WHERE servicename = :servicename AND company = :company", nativeQuery = true)
   void deleteByServicenameAndCompany(@Param("servicename") String servicename, @Param("company") String company);


}


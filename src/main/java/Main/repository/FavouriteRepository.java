package Main.repository;

import Main.model.favourites;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FavouriteRepository extends JpaRepository<favourites , Long> {
   @Query("select f from favourites f where f.user.UserID = :userID ")
   List<favourites> getAll(int userID);

   @Query("select f from favourites f where f.servicename = :servicename and f.servicetype = :servicetype ")
   favourites findByServicenameAndServicetype(String servicename , String servicetype);
}

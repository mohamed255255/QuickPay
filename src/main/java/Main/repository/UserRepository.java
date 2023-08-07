package Main.repository;
import Main.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;



@Repository
public interface UserRepository extends JpaRepository<User, Integer>{

     @Query("SELECT u FROM User u where u.email =?1")
     Optional<User> findUserByEmail(String email) ;
}


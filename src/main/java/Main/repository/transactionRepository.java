package Main.repository;

import Main.model.transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface transactionRepository extends JpaRepository<transaction, Integer> {
    @Query("select t from transaction t ")
    List<transaction> GetAllTransactions();

@Query("select t from transaction  t where t.user.UserID = :userID")
    List<transaction> findbyuserID(int userID);
    }

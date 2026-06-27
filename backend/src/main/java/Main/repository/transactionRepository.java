package Main.repository;

import Main.model.transaction;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface transactionRepository extends JpaRepository<transaction, Integer> {
  @Query("select t from transaction t ")
  List<transaction> GetAllTransactions();

  @Query("select t from transaction  t where t.user.UserID = :userID")
  List<transaction> findbyuserID(int userID);

  @Query("select t from transaction  t where t.ServiceName = :servicename")
  List<transaction> findTransactionByDateRange(String servicename);
}

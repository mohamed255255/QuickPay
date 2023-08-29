package Main.repository;

import Main.model.creditcard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface creditCardRepository extends JpaRepository<creditcard, Long> {
    @Query("SELECT c FROM creditcard c WHERE c.cardNumber = :cardNumber")
    creditcard findByCardNumber(@Param("cardNumber") String cardNumber);


}

package Main.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import Main.model.creditcard;

public interface creditCardRepository extends JpaRepository<creditcard, Long> {
    @Query("SELECT c FROM creditcard c WHERE c.cardNumber = :cardNumber")
    creditcard findByCardNumber(@Param("cardNumber") String cardNumber);

    @Modifying
    @Query("DELETE FROM creditcard c WHERE c.creditcardID = :creditCardID")
    void deleteByCreditcardID(@Param("creditCardID") long creditCardID);



}

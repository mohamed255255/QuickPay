package Main.repository;

import Main.model.creditcard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface creditCardRepository extends JpaRepository<creditcard, Long> {
}

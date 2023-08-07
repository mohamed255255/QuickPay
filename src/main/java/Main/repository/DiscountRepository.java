package Main.repository;

import Main.model.Discount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DiscountRepository extends JpaRepository<Discount, Long> {
    @Query("SELECT d from Discount d ")
     List<Discount> findAllDiscounts();

    @Query("SELECT d.ServiceType FROM Discount d WHERE d.ServiceType = :serviceType")
    Discount findByServiceType(String serviceType);
}

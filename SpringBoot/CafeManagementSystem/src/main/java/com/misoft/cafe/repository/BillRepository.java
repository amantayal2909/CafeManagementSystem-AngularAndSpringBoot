package com.misoft.cafe.repository;

import com.misoft.cafe.entity.Bill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BillRepository extends JpaRepository<Bill, Integer> {
}

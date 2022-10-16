package com.mrhopeyone.repository;

import com.mrhopeyone.domain.ToDont;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the ToDont entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ToDontRepository extends JpaRepository<ToDont, Long> {}

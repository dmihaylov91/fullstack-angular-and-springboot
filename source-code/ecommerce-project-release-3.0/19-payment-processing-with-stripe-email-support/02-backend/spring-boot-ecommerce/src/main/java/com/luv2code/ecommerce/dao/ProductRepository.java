package com.luv2code.ecommerce.dao;

import com.luv2code.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.RequestParam;

@RepositoryRestResource
public interface ProductRepository extends JpaRepository<Product, Long> {

    Page<Product> findByCategoryId(@RequestParam("id") Long id, Pageable pageable);

    Page<Product> findByNameContaining(@RequestParam("name") String name, Pageable pageable);

    @Query("SELECT p FROM Product p JOIN p.topics t WHERE t.name = :topicName")
    Page<Product> findByTopicName(@RequestParam("topicName") String topicName, Pageable pageable);

    @Query("SELECT p FROM Product p JOIN p.topics t WHERE t.id = :topicId")
    Page<Product> findByTopicId(@RequestParam("topicId") Long topicId, Pageable pageable);

}

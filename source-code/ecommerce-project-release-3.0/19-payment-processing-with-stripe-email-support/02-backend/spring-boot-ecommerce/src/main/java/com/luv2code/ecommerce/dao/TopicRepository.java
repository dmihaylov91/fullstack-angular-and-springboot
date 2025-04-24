package com.luv2code.ecommerce.dao;

import com.luv2code.ecommerce.entity.Topic;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.RequestParam;

@RepositoryRestResource
public interface TopicRepository extends JpaRepository<Topic, Long> {

    Page<Topic> findTopicByNameContaining(@RequestParam("name") String name, Pageable pageable);

}

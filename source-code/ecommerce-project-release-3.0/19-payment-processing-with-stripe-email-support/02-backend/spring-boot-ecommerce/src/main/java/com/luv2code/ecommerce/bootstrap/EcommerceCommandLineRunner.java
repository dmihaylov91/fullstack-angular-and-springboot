package com.luv2code.ecommerce.bootstrap;

import com.luv2code.ecommerce.dao.ProductRepository;
import com.luv2code.ecommerce.dao.TopicRepository;
import com.luv2code.ecommerce.entity.Product;
import com.luv2code.ecommerce.entity.Topic;
import com.luv2code.ecommerce.entity.TopicEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Component
public class EcommerceCommandLineRunner implements CommandLineRunner {

    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    @Transactional
    public void run(final String... args) throws Exception {

        //createJsTopic();
    }


    protected void createJsTopic() {


        final Topic topic = new Topic();
        topic.setName(TopicEnum.JAVASCRIPT);
        topic.setDescription("This is a topic where you can learn all about JavaScript");

        final Page<Product> jsProducts = productRepository.findByNameContaining("JavaScript", Pageable.unpaged());

        if (jsProducts.hasContent()) {
            final Set<Product> products = jsProducts.toSet();


            for (final Product product : products) {
                if (!product.getTopics().contains(topic)) {
                    product.getTopics().add(topic);  // Maintain the owning side
                    //productRepository.save(product);
                }

                if (!topic.getProducts().contains(product)) {
                    topic.getProducts().add(product); // Maintain the inverse side
                }
            }

            topicRepository.save(topic);
        }

    }
}

package com.luv2code.ecommerce.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "topic")
@Data

//there was an issue with lombok, so exclude from equals and hashcode
@EqualsAndHashCode(exclude = "products")

//@Table(name = "example_entity",
//        uniqueConstraints = {
//                @UniqueConstraint(columnNames = {"column1", "column2"})
//        })

//use uniqueConstraints to define if the combination of more than one columsn should be unique

public class Topic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    //map to Enumeration name: i.e. JAVASCRIPT. Otherwise ordinal value will be used: i.e.0,1,2... (not recommended)
    @Enumerated(EnumType.STRING)
    private TopicEnum name;

    @Column(name = "description")
    private String description;
    //@Column(name="STUDENT_NAME", length=50, nullable=false, unique=false)
    //other column properties

    //for dynamic field that won't be persisted in the database
    @Transient
    private String info;

    //@Temporal(TemporalType.DATE)
    //use this if we have a Date field

    @ManyToMany(mappedBy = "topics", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Set<Product> products = new HashSet<>();


    public String getInfo() {
        return getName().name() + ": " + getDescription();
    }
}

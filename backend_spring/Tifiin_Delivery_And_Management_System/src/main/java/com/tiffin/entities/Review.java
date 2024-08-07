package com.tiffin.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "reviews")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Review extends BaseEntity {

    private String comment;
    @Column(length = 5)
    private Integer rating;

    @ManyToOne
    private Order order;

    @ManyToOne
    private User customer;
    
    @ManyToOne
    private User vendor;
}

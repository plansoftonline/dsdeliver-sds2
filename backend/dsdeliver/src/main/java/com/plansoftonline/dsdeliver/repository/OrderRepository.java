package com.plansoftonline.dsdeliver.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.plansoftonline.dsdeliver.entities.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

}

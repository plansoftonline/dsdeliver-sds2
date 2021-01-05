package com.plansoftonline.dsdeliver.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.plansoftonline.dsdeliver.dto.OrderDTO;
import com.plansoftonline.dsdeliver.entities.Order;
import com.plansoftonline.dsdeliver.repository.OrderRepository;

@Service
public class OrderService {
	
	@Autowired
	private OrderRepository repository; 

	@Transactional(readOnly = true)
	public List<OrderDTO> findAll() {
		List<Order> list = repository.findOrdersWithProducts();
		return list.stream().map(x -> new OrderDTO(x)).collect(Collectors.toList());
	}
}

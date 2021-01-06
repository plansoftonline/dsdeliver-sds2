package com.plansoftonline.dsdeliver.service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.plansoftonline.dsdeliver.dto.OrderDTO;
import com.plansoftonline.dsdeliver.dto.ProductDTO;
import com.plansoftonline.dsdeliver.entities.Order;
import com.plansoftonline.dsdeliver.entities.OrderStatus;
import com.plansoftonline.dsdeliver.entities.Product;
import com.plansoftonline.dsdeliver.repository.OrderRepository;
import com.plansoftonline.dsdeliver.repository.ProductRepository;

@Service
public class OrderService {
	
	@Autowired
	private OrderRepository repository; 

	@Autowired
	private ProductRepository produtoRepository; 

	@Transactional(readOnly = true)
	public List<OrderDTO> findAll() {
		List<Order> list = repository.findOrdersWithProducts();
		return list.stream().map(x -> new OrderDTO(x)).collect(Collectors.toList());
	}
	
	@Transactional
	public OrderDTO insert(OrderDTO dto) {
		Order order = new Order(null, dto.getAddress(), dto.getLatitude(), dto.getLongitude(),
				Instant.now(), OrderStatus.PENDING);
		for (ProductDTO p : dto.getProducts()) {
			Product product = produtoRepository.getOne(p.getId());
			order.getProducts().add(product);
		}
		order = repository.save(order);
		return new OrderDTO(order);
	}
	
}

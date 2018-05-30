package com.webforms;

import com.webforms.entities.ToDo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ToDoTable extends JpaRepository<ToDo, Long> {
    public List<ToDo> findAllByUserId(Long userId);
    public ToDo findByItemIdAndUserId(Long itemId, Long userId);
    public void deleteByItemIdAndUserId(Long itemId, Long userId);
}


package com.main.server.todo.repository;

import com.main.server.todo.domain.Todo;
import com.main.server.todogroup.domain.TodoGroup;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    //List<Todo> findAllByTodoScheduleDateBetween(LocalDate start, LocalDate end);

    List<Todo> findByTodoGroupAndTodoScheduleDateBetween(TodoGroup todoGroup, LocalDate startDate, LocalDate endDate);
}

package com.webforms.controllers;

import com.webforms.ToDoTable;
import com.webforms.entities.ToDo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path = "/api")
public class ApiController {
    @Autowired
    ToDoTable itemsTable;

    @PostMapping(path = "/upsert", consumes = "application/json")
    public ResponseEntity add(@RequestBody ToDo item){
        System.out.println(item.toString());
        if(!item.isValid()){
            return ResponseEntity
                    .status(HttpStatus.NOT_ACCEPTABLE)
                    .body("");
        }
        try {
            long id = itemsTable.findByItemIdAndUserId(item.getItemId(), item.getUserId()).getId();
            item.setId(id);
        } catch(NullPointerException e) {
        }
        itemsTable.save(item);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body("");
    }

    @Transactional
    @PostMapping(path = "/remove")
    public ResponseEntity delete(@RequestBody ToDo item){
        System.out.println(item.toString());
        itemsTable.deleteByItemIdAndUserId(item.getItemId(), item.getUserId());
        return ResponseEntity
                .status(HttpStatus.OK)
                .body("");
    }

    @PostMapping(path = "/all")
    public @ResponseBody Iterable<ToDo> getAll(@RequestBody String userId){
        userId = userId.replaceAll("\"", "");
        return itemsTable.findAllByUserId(Long.parseLong(userId));
    }
}

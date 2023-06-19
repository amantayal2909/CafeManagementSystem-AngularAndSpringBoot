package com.misoft.cafe.controller;

import com.misoft.cafe.entity.Bill;
import com.misoft.cafe.entity.TransactionalDetails;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping(path = "/bill")
public interface BillController {

    @PostMapping(path = "/generateReport")
    ResponseEntity<String> generateReport(@RequestBody Map<String, Object> requestMap);

    @GetMapping(path = "/getBills")
    ResponseEntity<List<Bill>> getBills();

    @PostMapping(path = "/getPdf")
    ResponseEntity<byte[]> getPdf(@RequestBody Map<String, Object> requestMap);

    @PostMapping(path = "/delete/{id}")
    ResponseEntity<String> deleteBill(@PathVariable Integer id);

//    @GetMapping({"/createTransaction/{amount}"})
//    public TransactionDetails createTransaction(@PathVariable(name = "amount") Double amount) {
//        return BillService.createTransaction(amount);
//    }
    @GetMapping({"/createTransaction/{amount}"})
    TransactionalDetails createTransaction(@PathVariable(name = "amount") Double amount) ;
        //return BillService.createTransaction(amount);

}

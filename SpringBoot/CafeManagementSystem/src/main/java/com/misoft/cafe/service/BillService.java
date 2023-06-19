package com.misoft.cafe.service;

import com.misoft.cafe.entity.Bill;
import com.misoft.cafe.entity.TransactionalDetails;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface BillService {
    ResponseEntity<String> generateReport(Map<String, Object> requestMap);

    ResponseEntity<List<Bill>> getBills();

    ResponseEntity<byte[]> getPdf(Map<String, Object> requestMap);

    ResponseEntity<String> deleteBill(Integer id);

    TransactionalDetails createTransaction(Double amount) ;

//    public TransactionDetails createTransaction(Double amount) {
//        try {
//
//            JSONObject jsonObject = new JSONObject();
//            jsonObject.put("amount", (amount * 100) );
//            jsonObject.put("currency", CURRENCY);
//
//            RazorpayClient razorpayClient = new RazorpayClient(KEY, KEY_SECRET);
//
//            Order order = razorpayClient.orders.create(jsonObject);
//
//            TransactionDetails transactionDetails =  prepareTransactionDetails(order);
//            return transactionDetails;
//        } catch (Exception e) {
//            System.out.println(e.getMessage());
//        }
//        return null;
//    }
//
//    private TransactionDetails prepareTransactionDetails(Order order) {
//        String orderId = order.get("id");
//        String currency = order.get("currency");
//        Integer amount = order.get("amount");
//
//        TransactionDetails transactionDetails = new TransactionDetails(orderId, currency, amount, KEY);
//        return transactionDetails;
//    }
}

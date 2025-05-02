package com.example.ecomsync.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

// Thêm annotation để chỉ định schema
@Entity
@Table(name = "payments", schema = "payment_service")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {
    // Thay đổi strategy cho PostgreSQL
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id")
    private Integer id;

    @OneToOne(mappedBy = "payment")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private BigDecimal amount;

    @Column(name = "payment_method", nullable = false)
    private String paymentMethod;

    @Column(name = "payment_status")
    private String paymentStatus;

    @Column(name = "transaction_id")
    private String transactionId;

    @Column(name = "payment_date")
    private LocalDateTime paymentDate;

    @Column(name = "last_four_digits")
    private String lastFourDigits;

    @Column(name = "expiry_date")
    private String expiryDate;

    @ManyToOne
    @JoinColumn(name = "billing_address_id")
    private Address billingAddress;

    @OneToMany(mappedBy = "payment", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PaymentStatusHistory> statusHistory = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        paymentDate = LocalDateTime.now();
        if (paymentStatus == null) {
            paymentStatus = "PENDING";
        }
    }
}

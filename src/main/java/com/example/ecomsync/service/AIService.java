package com.example.ecomsync.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AIService {
    @Value("${openai.api.key}")
    private String apiKey;

    @Value("${openai.model}")
    private String model;

    private final RestTemplate restTemplate = new RestTemplate();

    public String generateResponse(String userMessage) {
        // In a real implementation, this would call the OpenAI API
        // For now, we'll use a simple rule-based approach

        String lowercaseMessage = userMessage.toLowerCase();

        if (lowercaseMessage.contains("xin chào") || lowercaseMessage.contains("chào")) {
            return "Xin chào! Tôi có thể giúp gì cho bạn với việc mua sắm hôm nay?";
        } else if (lowercaseMessage.contains("sản phẩm") && lowercaseMessage.contains("gợi ý")) {
            return "Dựa trên lịch sử duyệt của bạn, tôi gợi ý bạn xem qua tai nghe không dây mới hoặc đồng hồ thông minh. Bạn có muốn xem một số tùy chọn không?";
        } else if (lowercaseMessage.contains("đơn hàng") && lowercaseMessage.contains("trạng thái")) {
            return "Tôi có thể giúp bạn kiểm tra trạng thái đơn hàng. Bạn có thể cung cấp số đơn hàng của mình không?";
        } else if (lowercaseMessage.contains("trả hàng") || lowercaseMessage.contains("hoàn tiền")) {
            return "Chính sách trả hàng của chúng tôi cho phép trả hàng trong vòng 30 ngày kể từ ngày mua. Bạn có muốn tôi hướng dẫn bạn quy trình trả hàng không?";
        } else if (lowercaseMessage.contains("vận chuyển") || lowercaseMessage.contains("giao hàng")) {
            return "Chúng tôi cung cấp vận chuyển tiêu chuẩn miễn phí cho tất cả các đơn hàng trên 50 đô la. Vận chuyển nhanh có sẵn với một khoản phí bổ sung. Bạn có muốn biết thêm chi tiết không?";
        } else if (lowercaseMessage.contains("thanh toán") || lowercaseMessage.contains("trả tiền")) {
            return "Chúng tôi chấp nhận tất cả các loại thẻ tín dụng chính, PayPal và chuyển khoản ngân hàng. Tất cả thông tin thanh toán được xử lý an toàn. Có điều gì cụ thể bạn muốn biết về các tùy chọn thanh toán của chúng tôi không?";
        } else {
            return "Tôi ở đây để giúp bạn với bất kỳ câu hỏi nào về sản phẩm, đơn hàng, vận chuyển hoặc trả hàng. Bạn có thể cung cấp thêm chi tiết về những gì bạn đang tìm kiếm không?";
        }
    }
}

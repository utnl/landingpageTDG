import ServiceFaqSection, {
  type ServiceFaqItem,
} from "@/components/service-faq-section";

export const portfolioFaqItems: ServiceFaqItem[] = [
  {
    question: "TD Games có outsource theo dự án hay retainer không?",
    answer:
      "Có cả hai: milestone theo giai đoạn (concept → production → polish) hoặc gói giờ / team cố định cho dự án dài. Chúng tôi linh hoạt theo scope và lịch ship của bạn.",
  },
  {
    question: "Pipeline giao nhận file thường dùng là gì?",
    answer:
      "PSD / PNG / Spine / JSON theo engine; có thể chỉnh theo Confluence, Notion hoặc Slack của studio bạn. Chúng tôi ưu tiên versioning rõ ràng và naming convention thống nhất.",
  },
  {
    question: "Thời gian phản hồi báo giá và kick-off trung bình bao lâu?",
    answer:
      "Brief đầy đủ: báo giá sơ bộ trong 24–48h làm việc. Sau khi chốt scope, team có thể kick-off trong tuần tùy tải production hiện tại.",
  },
  {
    question: "Có ký NDA và giữ bản quyền tài sạn không?",
    answer:
      "Có. NDA hai chiều là chuẩn trước khi xem art confidential. Quyền sử dụng cuối cùng theo hợp đồng (work-for-hire hoặc license) — luôn ghi rõ trong proposal.",
  },
  {
    question: "Có làm cả 2D art, animation và VFX trong một dự án không?",
    answer:
      "Có. Bạn có thể gom 2D Art, 2D Animation và 2D VFX trong một roadmap để đồng bộ style, palette và technical spec — giảm friction khi tích hợp vào game.",
  },
  {
    question: "Muốn xem thêm case hoặc test một nhân vật mẫu thì sao?",
    answer:
      "Gửi brief ngắn qua form Contact bên dưới hoặc email hello@tdgames.com. Với một số dự án lớn chúng tôi có thể thảo luận art test có phí / miễn phí tùy scope.",
  },
];

export default function PortfolioFaq() {
  return (
    <ServiceFaqSection
      id="portfolio-faq"
      sectionStep="// 03"
      intro="Câu hỏi thường gặp khi làm việc với TD Games — pipeline, hợp đồng và cách bắt đầu nhanh."
      items={portfolioFaqItems}
    />
  );
}

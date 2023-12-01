import { CalendarDays, Microscope, Sparkles, Users } from 'lucide-react'
import { LandingSectionItemProps } from '~/components/LandingSectionItem'
import { ProductItemProps } from '~/components/ProductItem'
import { ReviewCommentProps } from '~/components/ReviewComment'

export const reasons: LandingSectionItemProps[] = [
  {
    title: 'Đặt hẹn dễ dàng',
    body: 'Tại Trung tâm thẩm mỹ Nature Beauty, bạn có thể đặt lịch hẹn dễ dàng. Chỉ với các bước đơn giản, chúng tôi sẽ đảm bảo quá trình xét nghiệm liền mạch và hiệu quả.',
    icon: <CalendarDays size={150} />
  },
  {
    title: 'Đội ngũ nhân viên chuyên môn cao',
    body: 'Chọn Nature Beauty, mỗi xét nghiệm của bạn đều được tiến hành bởi đội ngũ chuyên viên chuyên nghiệp và tay nghề cao. Kết quả xét nghiệm của bạn sẽ được đảm bảo chuyên môn kỹ thuật với độ chính xác và tin cậy tối đa.',
    icon: <Users size={150} />
  },
  {
    title: 'Đa dạng dịch vụ',
    body: 'Chúng tôi cung cấp đa dạng dịch vụ với mức chi phí hợp lý, linh hoạt theo nhu cầu khách hàng, đảm bảo chất lượng, hiệu quả của quá trình sử dụng dịch vụ',
    icon: <Sparkles size={150} />
  },
  {
    title: 'Hệ thống trang thiết bị hiện đại',
    body: 'Với những thiết bị hiện đại nhất trong lĩnh vực spa, chúng tôi có thể cam kết với quý khách về quá trình sử dụng dịch vụ được thực hiện một cách hiện đại nhất, giảm thiểu các rủi ro cũng như tổn thương trong quá trính sử dụng',
    icon: <Microscope size={150} />
  }
]

export const services: ProductItemProps[] = [
  {
    productName: 'Chăm sóc da',
    productDescription:
      'Chăm sóc da là nhu cầu cơ bản của tất cả chị em phụ nữ hiện đại. Để đáp ứng nhu cầu này, hiện nay có rất nhiều công nghệ và sản phẩm nuôi dưỡng, bảo vệ làn da.',
    productImg: 'https://static.comem.vn/uploads/April2023/cac-buoc-duong-da-ban-dem_61.jpg'
  },
  {
    productName: 'Điều trị da',
    productDescription:
      'Điều trị da bằng IPL sử dụng năng lượng ánh sáng để nhắm mục tiêu một màu nhất định trên da của bạn. Khi da được làm nóng, cơ thể bạn sẽ loại bỏ các tế bào',
    productImg: 'https://www.fvhospital.com/wp-content/uploads/2019/06/Acne-Treatment-500x500.jpg'
  },
  {
    productName: 'Phun xăm thẩm mỹ',
    productDescription:
      'Phun xăm thẩm mỹ là một phương pháp làm đẹp được sử dụng để tạo nên nét đẹp tự nhiên cho khuôn mặt. Với các công nghệ tiên tiến hiện nay, dịch vụ này  đã trở thành một trong những giải pháp tối ưu cho những ai muốn có một vẻ ngoài hoàn hảo và tự tin hơn.',
    productImg: 'https://cdn.diemnhangroup.com/seoulspa/2022/11/dich-vu-phun-xam-tham-my-4-2.jpg'
  },
  {
    productName: 'Tắm trắng',
    productDescription:
      'Tắm Trắng Phi Thuyền Vip, tắm trắng công nghệ Châu Âu, Bật 03 Tone Sau lần đầu tiên. Công Nghệ Châu Âu, Máy Móc Hiện Đại, Quy Trình Chuẩn Quốc Tế, Không cần nghỉ dưỡng. + Bác sĩ giàu kinh nghiệm.',
    productImg: 'https://divaclinic.vn/wp-content/uploads/2021/01/tam-trang.jpg'
  },
  {
    productName: 'Triệt lông',
    productDescription:
      'Triệt lông bằng Dye-PL/IPL, laser hoặc điện phân được gọi là phương pháp triệt lông vĩnh viễn vì tác động phá hủy đến nang lông trên cơ thể và có hiệu quả dài',
    productImg:
      'https://suckhoedoisong.qltns.mediacdn.vn/Images/nguyenkhanh/2018/09/21/Phi_eo_kinh_bo_v_mt_hi_thc_hin_th_thut_trit_long_bng_laser.jpg'
  },
  {
    productName: 'Khác',
    productDescription: '',
    productImg: ''
  }
]

export const comments: ReviewCommentProps[] = [
  {
    commentImg: 'https://vienthammydiva.vn/wp-content/uploads/2023/04/mau-1-scaled.webp',
    commentorName: 'Thùy Linh',
    commentRate: 5,
    comment:
      'Tự tin đến Nature Beauty trẻ hóa da và nhận được kết quả bất ngờ. Mình bây giờ như trẻ ra đến gần chục tuổi vậy đấy. Cảm ơn và sẽ chọn Nature Beauty khi cần làm đẹp.'
  },
  {
    commentorName: 'Xuân Mai',
    commentImg: 'https://vienthammydiva.vn/wp-content/uploads/2023/04/mau-2-scaled.webp',
    commentRate: 5,
    comment:
      'Nhìn da Xuân Mai bây giờ nè, sạch nám, trắng sáng, mịn màng hơn hẳn. Gửi lời cảm ơn đến Nature Beauty đã tái sinh làn da Mai thêm một lần nữa.'
  },
  {
    commentorName: 'Thu Thảo',
    commentImg: 'https://vienthammydiva.vn/wp-content/uploads/2023/04/mau-3-scaled.webp',
    commentRate: 5,
    comment:
      'Thu Thảo đã chọn Thẩm mỹ viện Nature Beauty trải nghiệm xóa nốt ruồi và hài lòng với dịch vụ. Chuyên nghiệp, tận tâm, uy tín là cảm nhận của Thảo về Nature Beauty.'
  },
  {
    commentorName: 'Trà Giang',
    commentImg: 'https://vienthammydiva.vn/wp-content/uploads/2023/04/mau-4-scaled.webp',
    commentRate: 5,
    comment:
      'Tắm trắng tại Nature Beauty mình đánh giá 10/10 điểm. Công nghệ hiện đại, chuyên gia tay nghề cao, quy trình thực hiện chuyên nghiệp, hài lòng đến vô cùng.'
  }
]

export const goods: {
  title: string
  img: string
}[] = [
  {
    title: 'Quầy lễ tân',
    img: 'https://vienthammydiva.vn/wp-content/uploads/2023/04/DSC8654.webp'
  },
  {
    title: 'Không gian tư vấn',
    img: 'https://vienthammydiva.vn/wp-content/uploads/2023/04/DSC00489.webp'
  },
  {
    title: 'Phòng chăm sóc da',
    img: 'https://vienthammydiva.vn/wp-content/uploads/2023/04/DSC00491.webp'
  },
  {
    title: 'Phòng phun xăm',
    img: 'https://vienthammydiva.vn/wp-content/uploads/2023/04/DSC00521.webp'
  }
]

import { Avatar, Typography } from 'antd'
import Rating from './Rating'

export type ReviewCommentProps = {
  commentImg: string
  commentorName: string
  commentRate: number
  comment: string
}

const { Text } = Typography

export default function ReviewComment(props: ReviewCommentProps) {
  return (
    <div>
      <div className='flex items-center gap-4 mb-3'>
        <Avatar size={64} src={props.commentImg} />
        <div>
          <Text className='font-semibold text-2xl'>{props.commentorName}</Text>
          <Rating stars={props.commentRate} />
        </div>
      </div>
      <Text>{props.comment}</Text>
    </div>
  )
}

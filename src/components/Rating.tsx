import { Star } from 'lucide-react'

export type RatingProps = {
  stars: number
  size?: number
}

export default function Rating(props: RatingProps) {
  return (
    <div className='flex items-center'>
      {[...Array(props.stars)].map(() => (
        <Star color='orange' size={props.size || 24} />
      ))}
    </div>
  )
}

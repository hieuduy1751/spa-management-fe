import { Star } from 'lucide-react'

export type RatingProps = {
  stars: number
  setStars?: any
  size?: number
  editable?: boolean
}

export default function Rating({ stars, size, editable, setStars }: RatingProps) {
  const handleStarsChange = (index: number, from: string) => {
    if (editable) {
      if (from === 'good') {
        setStars(index + 1)
      } else {
        setStars(stars + index + 1)
      }
    }
  }

  return (
    <div className='flex items-center'>
      {[...Array(stars)].map((_, index) => (
        <Star onClick={() => handleStarsChange(index, 'good')} color='orange' size={size || 24} />
      ))}
      {stars !== 5 &&
        [...Array(5 - stars)].map((_, index) => (
          <Star onClick={() => handleStarsChange(index, 'bad')} color='gray' size={size || 24} />
        ))}
    </div>
  )
}

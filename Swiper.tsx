import {
  useState,
  useCallback,
  type HTMLAttributes,
  type ReactNode,
} from "react"

import { HMSymbolIcon } from "@/components/HMSymbolIcon"
import { cn } from "@/lib/utils"

import "./swiper-banner-2in1.css"
import "./swiper-number-phone.css"
import "./swiper-progress-banner-phone.css"

const swiperVariants = ["banner-2in1", "number-phone", "progress-banner-phone"] as const
const iconSizes = ["28", "32", "40"] as const
const progressCounts = [3, 4, 5, 6] as const

type SwiperVariant = (typeof swiperVariants)[number]
type IconSize = (typeof iconSizes)[number]
type ProgressCount = (typeof progressCounts)[number]

interface SwiperBannerProps {
  变体: "banner-2in1"
  尺寸?: IconSize
  banners?: ReactNode[]
  活跃索引?: number
  onIndexChange?: (index: number) => void
}

interface SwiperNumberProps {
  变体: "number-phone"
  当前页?: number
  总页数?: number
}

interface SwiperProgressProps {
  变体: "progress-banner-phone"
  激活索引?: number
  进度数?: ProgressCount
}

type SwiperProps = (SwiperBannerProps | SwiperNumberProps | SwiperProgressProps) &
  HTMLAttributes<HTMLDivElement>

function SwiperBanner2in1View({
  尺寸 = "32",
  banners = [],
  活跃索引,
  onIndexChange,
  className,
  ...props
}: Omit<SwiperBannerProps, "变体"> & HTMLAttributes<HTMLDivElement>) {
  const [internalIndex, setInternalIndex] = useState(0)
  const isControlled = 活跃索引 !== undefined
  const totalBanners = banners.length
  const iconBtnSize = Number.parseInt(尺寸, 10)

  const activeIndex = isControlled
    ? totalBanners === 0
      ? 0
      : Math.max(0, Math.min(活跃索引, totalBanners - 1))
    : internalIndex

  const goTo = useCallback(
    (index: number) => {
      if (totalBanners === 0) return
      const clamped = Math.max(0, Math.min(index, totalBanners - 1))
      if (!isControlled) setInternalIndex(clamped)
      onIndexChange?.(clamped)
    },
    [totalBanners, onIndexChange, isControlled],
  )

  const goPrev = useCallback(() => goTo(activeIndex - 1), [goTo, activeIndex])
  const goNext = useCallback(() => goTo(activeIndex + 1), [goTo, activeIndex])

  if (totalBanners === 0) {
    return (
      <div
        className={cn("swiper-banner-2in1", className)}
        data-size={尺寸}
        data-variant="banner-2in1"
        {...props}
      >
        <div className="swiper-banner-2in1__track">
          <div className="swiper-banner-2in1__banner swiper-banner-2in1__banner--empty" />
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn("swiper-banner-2in1", className)}
      data-size={尺寸}
      data-variant="banner-2in1"
      {...props}
    >
      <div className="swiper-banner-2in1__track">
        {banners.map((banner, i) => {
          const offset = i - activeIndex

          return (
            <div
              key={`banner-${i}`}
              className={cn(
                "swiper-banner-2in1__slide",
                i === activeIndex && "swiper-banner-2in1__slide--active",
              )}
              style={{ transform: `translateX(${offset * 100}%)` }}
              aria-hidden={i !== activeIndex}
            >
              <div className="swiper-banner-2in1__banner">
                <div className="swiper-banner-2in1__banner-content">{banner}</div>

                <button
                  type="button"
                  className="swiper-banner-2in1__arrow swiper-banner-2in1__arrow--left"
                  style={{ width: iconBtnSize, height: iconBtnSize }}
                  onClick={(e) => {
                    e.stopPropagation()
                    goPrev()
                  }}
                  aria-label="Previous"
                >
                  <HMSymbolIcon
                    className="swiper-banner-2in1__chevron"
                    name="chevron_left"
                    size={24}
                  />
                </button>

                <button
                  type="button"
                  className="swiper-banner-2in1__arrow swiper-banner-2in1__arrow--right"
                  style={{ width: iconBtnSize, height: iconBtnSize }}
                  onClick={(e) => {
                    e.stopPropagation()
                    goNext()
                  }}
                  aria-label="Next"
                >
                  <HMSymbolIcon
                    className="swiper-banner-2in1__chevron"
                    name="chevron_right"
                    size={24}
                  />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function SwiperNumberPhoneView({
  当前页 = 12,
  总页数 = 22,
  className,
  ...props
}: Omit<SwiperNumberProps, "变体"> & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("hm-swiper-number-phone", className)}
      data-current={当前页}
      data-total={总页数}
      data-variant="number-phone"
      {...props}
    >
      <span className="hm-swiper-number-phone__text">
        {当前页}/{总页数}
      </span>
    </div>
  )
}

function SwiperProgressBannerPhoneView({
  激活索引 = 0,
  进度数 = 5,
  className,
  ...props
}: Omit<SwiperProgressProps, "变体"> & HTMLAttributes<HTMLDivElement>) {
  const segments = Array.from({ length: 进度数 }, (_, i) => i)

  return (
    <div
      className={cn("hm-swiper-progress-banner-phone", className)}
      data-variant="progress-banner-phone"
      {...props}
    >
      {segments.map((i) => (
        <span
          key={i}
          className={cn(
            "hm-swiper-progress-banner-phone__segment",
            i === 激活索引 && "hm-swiper-progress-banner-phone__segment--active",
          )}
        />
      ))}
    </div>
  )
}

function Swiper(props: SwiperProps) {
  const { 变体, className, ...rest } = props

  switch (变体) {
    case "banner-2in1":
      return <SwiperBanner2in1View className={className} {...rest} />
    case "number-phone":
      return <SwiperNumberPhoneView className={className} {...rest} />
    case "progress-banner-phone":
      return <SwiperProgressBannerPhoneView className={className} {...rest} />
    default: {
      const _exhaustive: never = 变体
      return _exhaustive
    }
  }
}

export { Swiper, swiperVariants, iconSizes, progressCounts }
export type {
  SwiperProps,
  SwiperVariant,
  SwiperBannerProps,
  SwiperNumberProps,
  SwiperProgressProps,
  IconSize,
  ProgressCount,
}

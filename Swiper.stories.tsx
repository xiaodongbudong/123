import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { StatusBar } from "@/components/Publis/StatusBar"
import { Aibottombar } from "@/components/Publis/Aibottombar"

import { Swiper, iconSizes, progressCounts, swiperVariants } from "./Swiper"

const demoBanners = [
  <div key="0" className="swiper-banner-2in1__banner-content" />,
  <div key="1" className="swiper-banner-2in1__banner-content" />,
  <div key="2" className="swiper-banner-2in1__banner-content" />,
  <div key="3" className="swiper-banner-2in1__banner-content" />,
  <div key="4" className="swiper-banner-2in1__banner-content" />,
]

const meta = {
  title: "Components/Navigation/Swiper",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "统一 Swiper 组件，通过 `变体` 切换：`banner-2in1`（横幅轮播）、`number-phone`（页码）、`progress-banner-phone`（进度条）。以 `swiper.json` 为变体树前置依赖。",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-screen items-start justify-center bg-[var(--harmony-storybook-preview-bg,var(--harmony-background-secondary))] p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta

export default meta
type Story = StoryObj

export const BannerPlayground: Story = {
  render: () => (
    <Swiper 变体="banner-2in1" 尺寸="32" banners={demoBanners} 活跃索引={2} />
  ),
}

export const BannerControlled: Story = {
  render: function BannerControlledStory() {
    const [index, setIndex] = useState(0)

    return (
      <div className="flex flex-col items-center gap-4">
        <Swiper
          变体="banner-2in1"
          banners={demoBanners}
          活跃索引={index}
          onIndexChange={setIndex}
        />
        <p className="text-sm text-slate-600">当前页：{index + 1}</p>
      </div>
    )
  },
}

export const BannerSizeGallery: Story = {
  render: () => (
    <div className="flex flex-col gap-12">
      {iconSizes.map((size) => (
        <section key={size} className="flex flex-col gap-2">
          <h3 className="text-sm font-medium text-slate-600">尺寸 = {size}</h3>
          <Swiper 变体="banner-2in1" 尺寸={size} banners={demoBanners} 活跃索引={2} />
        </section>
      ))}
    </div>
  ),
}

export const NumberPlayground: Story = {
  render: () => <Swiper 变体="number-phone" 当前页={12} 总页数={22} />,
}

export const NumberPageVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(
        [
          [1, 5],
          [3, 10],
          [12, 22],
          [99, 100],
        ] as const
      ).map(([current, total]) => (
        <section key={`${current}-${total}`} className="flex items-center gap-4">
          <div className="w-28 text-sm font-medium text-slate-600">
            {current}/{total}
          </div>
          <Swiper 变体="number-phone" 当前页={current} 总页数={total} />
        </section>
      ))}
    </div>
  ),
}

export const ProgressPlayground: Story = {
  render: () => (
    <div className="w-[360px] bg-white py-16">
      <Swiper 变体="progress-banner-phone" 激活索引={0} 进度数={5} />
    </div>
  ),
}

export const ProgressPixsoComparison: Story = {
  render: () => (
    <div className="flex w-[360px] flex-col bg-white">
      <StatusBar {...{ "Color Mode": "Light" }} />
      <div className="relative flex h-[200px] flex-col justify-end bg-gradient-to-b from-[var(--harmony-background-emphasize)] to-[rgba(10,89,247,0.6)]">
        <Swiper 变体="progress-banner-phone" 激活索引={0} 进度数={5} />
      </div>
      <Aibottombar {...{ "Color Mode": "Light" }} />
    </div>
  ),
}

export const ProgressIndexMatrix: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      {[0, 1, 2, 3, 4].map((index) => (
        <section key={index} className="flex flex-col items-center gap-2">
          <div className="text-sm font-medium text-slate-600">激活索引 = {index}</div>
          <div className="w-[360px] bg-white py-16">
            <Swiper 变体="progress-banner-phone" 激活索引={index} 进度数={5} />
          </div>
        </section>
      ))}
    </div>
  ),
}

export const VariantOverview: Story = {
  render: () => (
    <div className="flex flex-col gap-10">
      {swiperVariants.map((variant) => (
        <p key={variant} className="text-sm text-slate-500">
          变体: {variant}
        </p>
      ))}
      <Swiper 变体="banner-2in1" banners={demoBanners} 活跃索引={1} />
      <Swiper 变体="number-phone" 当前页={3} 总页数={10} />
      <Swiper 变体="progress-banner-phone" 激活索引={2} 进度数={5} />
    </div>
  ),
}

export const ProgressCountVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      {progressCounts.map((count) => (
        <section key={count} className="flex flex-col items-center gap-2">
          <div className="text-sm font-medium text-slate-600">进度数 = {count}</div>
          <div className="w-[360px] bg-white py-16">
            <Swiper 变体="progress-banner-phone" 激活索引={0} 进度数={count} />
          </div>
        </section>
      ))}
    </div>
  ),
}

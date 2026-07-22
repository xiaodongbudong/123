import type { Meta, StoryObj } from "@storybook/react-vite"

import { Badge, badgeVariants } from "./Badge"

const meta = {
  title: "Components/Views/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    类型: "Text",
    count: 3,
  },
  argTypes: {
    类型: {
      control: "select",
      options: badgeVariants,
    },
    count: {
      control: "number",
    },
    maxCount: {
      control: "number",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Pixso 来源：`https://pixso.cn/app/design/H81fph4IPxYjDA3GCQmGGQ?item-id=5410:23817`。组件 Props 直接使用 Pixso 原始变体字段：`类型`（Dot / Text / Longest text）。色值使用全局 token `--harmony-warning`（rgba(232, 64, 38, 1)）与 `--harmony-font-on-primary`（rgba(255, 255, 255, 1)），字体 HarmonyHeiTi Regular 10px。",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-[var(--harmony-storybook-preview-bg,var(--harmony-background-secondary))] p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const VariantGallery: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-4">
        <h3 className="text-sm font-medium text-slate-600">All Variants</h3>
        <div className="flex items-center gap-6">
          {badgeVariants.map((variant) => (
            <div key={variant} className="flex flex-col items-center gap-2">
              <span className="text-[11px] leading-4 text-slate-500">{variant}</span>
              <Badge 类型={variant} count={variant === "Longest text" ? 99 : 3} />
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h3 className="text-sm font-medium text-slate-600">Text Variant — Count</h3>
        <div className="flex items-center gap-6">
          {[0, 1, 9, 99, 100, 500].map((n) => (
            <div key={n} className="flex flex-col items-center gap-2">
              <span className="text-[11px] leading-4 text-slate-500">count={n}</span>
              <Badge 类型="Text" count={n} />
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h3 className="text-sm font-medium text-slate-600">Longest Text — Overflow</h3>
        <div className="flex items-center gap-6">
          {[
            { count: 5, max: 99 },
            { count: 99, max: 99 },
            { count: 100, max: 99 },
            { count: 500, max: 99 },
          ].map(({ count, max }, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <span className="text-[11px] leading-4 text-slate-500">
                {count}/{max}
              </span>
              <Badge 类型="Longest text" count={count} maxCount={max} />
            </div>
          ))}
        </div>
      </section>
    </div>
  ),
}

export const Default: Story = {
  args: {
    类型: "Text",
    count: 3,
  },
}

export const WithValue: Story = {
  args: {
    类型: "Longest text",
    count: 99,
  },
}

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-6 opacity-40">
      <Badge 类型="Dot" />
      <Badge 类型="Text" count={3} />
      <Badge 类型="Longest text" count={99} />
    </div>
  ),
}
